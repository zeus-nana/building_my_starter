import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { PermissionCreationAttributes } from '../models/Permission';
import db from '../database/connection';
import AppError from '../utils/appError';

const createPermission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Check if the user exist
    const user = await db('users').where({ id: req.user?.id }).first();
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // 2) Check if user is admin or it_support department
    if (user.department !== 'it_support' && user.department !== 'admin') {
      return next(new AppError('Not authorized', 403));
    }

    // 3) Create permission
    const newPermission: PermissionCreationAttributes = req.body;
    newPermission.name = newPermission.name.trim().toLowerCase();
    newPermission.description = newPermission.description.trim();
    newPermission.created_by = user.id;

    const createdPermission = await db('permissions').insert(
      newPermission,
      '*',
    );
    return res.status(201).json({
      status: 'success',
      data: {
        permission: createdPermission[0],
      },
    });
  },
);

export default { createPermission };
