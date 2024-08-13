import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import db from '../database/connection';
import {
  User,
  UserCreationAttributes,
  UserValidationResult,
} from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import { signToken } from '../utils/tokens';
import crypto from 'crypto';

// Check if user already exists
const checkUserEmailExists = async (email: string): Promise<boolean> => {
  const user: User | undefined = await db('users').where({ email }).first();
  return user !== undefined;
};

const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    // 1) Get user from database
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return next(new AppError('User not found.', 404));
    }

    // 2) Check if current password is correct
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordCorrect) {
      return next(new AppError('Current password is incorrect.', 401));
    }

    // 3) Validate new password
    if (!validator.isStrongPassword(newPassword)) {
      return next(new AppError('New password is not strong enough.', 400));
    }

    // 4) Update password
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    await db('users')
      .where({ id: userId })
      .update({ password: hashedNewPassword });

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully.',
    });
  },
);

export default {
  changePassword,
};
