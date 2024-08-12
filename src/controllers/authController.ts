import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import db from '../database/connection';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import bcrypt from 'bcryptjs';
import { jwtVerify, signToken } from '../utils/tokens';

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }

    // 2) Check if user exist && password is correct
    const user: User | undefined = await db('users').where({ email }).first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) Check if user is active
    if (!user.active) {
      return next(
        new AppError('This user is not active! Please contact support.', 401),
      );
    }

    // 3) If ok, send token to client859
    const loggedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      department: user.department,
      created_at: user.created_at,
    };
    const token = signToken(user.id, user.email);

    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      status: 'success',
      token,
      loggedUser,
    });
  },
);

const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get the token  and check if it exists
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log('token ::', token);

    if (!token) {
      return next(new AppError('Access unauthorised!', 401));
    }

    // 2) Token verification
    const decoded = await jwtVerify(token, process.env.JWT_SECRET!);

    // 3) Check if user still exists and is active
    const currentUser = await db('users').where({ id: decoded.id }).first();
    if (!currentUser) {
      return next(new AppError('User does not exist', 401));
    }
    if (!currentUser.active) {
      return next(
        new AppError('This user is not active! Please contact support !', 401),
      );
    }

    // 4) Check if user record has been updated after token was issued
    if (currentUser.updated_at.getTime() > decoded.iat * 1000) {
      return next(new AppError('User has been updated', 401));
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  },
);

const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // if (!roles.includes(req.user?.role!)) {
    //   return next(
    //     new AppError('You do not have permission to perform this action', 403),
    //   );
    // }
    next();
  };
};

export default { login, protect, restrictTo };
