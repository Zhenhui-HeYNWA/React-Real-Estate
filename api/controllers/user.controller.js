import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';

//get all the users
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get Users!' });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to get User!' });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  console.log(tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized' });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...rest } = updateUser;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update Users!' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const tokenUserId = req.userId;

  console.log(tokenUserId);

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete users!' });
  }
};
