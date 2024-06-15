import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  //HASH the password
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);
  //create a new use and save to db
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatar: avatar || '/noavatar.jpg',
      },
    });
    console.log(newUser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        savedPosts: true,
      },
    });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials!' });

    //check if the password is correct
    //to get the bcrypt(password and to db password{user.password})
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json({ message: 'Invalid Credentials!' });

    //generate cookie token and send to the user
    // res.setHeader('Set-Cookie', 'test=' + 'myValue').json('success');
    //one week expires login
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    //one week expires login
    res
      .cookie('token', token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
    console.log(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to login!' });
  }
};

//logout request
export const logout = (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout Successful' });
};
