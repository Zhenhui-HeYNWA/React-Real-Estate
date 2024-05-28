import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

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
    });
    if (!user)
      return res.status(401).json({ messageL: 'Invalid Credentials!' });

    //check if the password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(401).json({ messageL: 'Invalid Credentials!' });

    //generate cookie token and send to the user
    // res.setHeader('Set-Cookie', 'test=' + 'myValue').json('success');

    //one week expires login
    const age = 1000 * 60 * 60 * 24 * 7;
    res
      .cookie('test2', 'myValue2', {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: 'login success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to login!' });
  }
};

export const logout = (req, res) => {
  //db operations
};
