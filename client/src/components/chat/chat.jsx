import { useContext, useEffect, useRef, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import apiRequest from '../../lib/apiRequest';
import { format } from 'timeago.js';
import { useNotificationStore } from '../../lib/notificationStore';

function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log(onlineUsers);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    if (socket) {
      socket.on('updateUserStatus', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('updateUserStatus');
      };
    }
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleChat = async (id, receiver, postId) => {
    try {
      const res = await apiRequest(`/chats/${id}`);
      const chatData = res.data;

      if (!chatData.seenBy.includes(currentUser.id)) {
        decrease();
      }

      setChat({ ...chatData, receiver });

      if (!chatData.messages.length) {
        try {
          const baseUrl = 'https://react-real-estate.onrender.com/';
          const messageText = `Hi, I am ${
            currentUser.username
          }. I am interested in your post: ${baseUrl}${encodeURIComponent(
            postId
          )}`;

          const messageRes = await apiRequest.post(`/messages/${id}`, {
            text: messageText,
          });

          const newMessage = messageRes.data;
          setChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
          }));

          socket.emit('sendMessage', {
            receiverId: receiver.id,
            data: newMessage,
          });
        } catch (messageError) {
          console.log(messageError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get('text');
    if (!text) return;

    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit('sendMessage', {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isUserOnline = (userId) => {
    return onlineUsers.some((user) => user.userId === userId);
  };
  console.log(isUserOnline('666b9331d2d3c624d75b6532'));
  console.log(isUserOnline('666cd9dba4a451fb1f8f7313'));
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put(`/chats/read/${chat.id}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      socket.on('getMessage', (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      socket.off('getMessage');
    };
  }, [socket, chat]);

  const createLink = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target='_blank' rel='noopener noreferrer'>
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className='chat'>
      <div className='messages'>
        <h1>Message</h1>
        {chats?.map((c) => (
          <div
            className='message'
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? '#fff'
                  : '#fdce50',
            }}
            onClick={() => handleChat(c.id, c.receiver, c.postId)}>
            <div className='avatar'>
              <img src={c.receiver.avatar || '/noavatar.jpg'} alt='' />
              <div
                className='online'
                style={{
                  backgroundColor: isUserOnline(c.receiver.id)
                    ? 'green'
                    : 'gray',
                }}></div>
            </div>
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className='chatBox'>
          <div className='top'>
            <div className='user'>
              <img src={chat.receiver.avatar || '/noavatar.jpg'} alt='' />
              {chat.receiver.username}
            </div>
            <span>{}</span>
            <span className='close' onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className='center'>
            {chat.messages.map((message) => (
              <div
                className='chatMessage'
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? 'flex-end'
                      : 'flex-start',
                  textAlign:
                    message.userId === currentUser.id ? 'right' : 'left',
                }}
                key={message.id}>
                <p
                  style={{
                    backgroundColor:
                      message.userId === currentUser.id ? '#fdce50' : '#e5e5ea',
                  }}>
                  {createLink(message.text)}
                </p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className='bottom'>
            <textarea name='text'></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
