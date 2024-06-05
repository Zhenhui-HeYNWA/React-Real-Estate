import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  //get the cookies
  const token = req.cookies.token;

  //check the token
  if (!token)
    return res.status(401).json({
      message: 'Not Authenticated!',
    });

  //verifying token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err)
      return res.status(403).json({
        message: 'Token is not Valid',
      });

      //passing the userID to the request,
    req.userId = payload.id;
    //next(shouldBeLoggedIn)
    next();
  });
};
