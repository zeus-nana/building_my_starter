import { NextFunction, Request, Response } from 'express';

import validator from 'validator';
import db from '../database/connection';
import {
  User,
  UserCreationAttributes,
  UserValidationResult,
} from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';

const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | undefined = await db('users')
      .where({ id: Number(req.params.id) })
      .first();

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  },
);

const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users: User[] = await db('users').select('*').orderBy('id', 'desc');

    return res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  },
);

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: UserCreationAttributes = req.body;

    // Validation
    const validationResult = await validateUser(newUser);
    if (!validationResult.isValid) {
      return res.status(400).json({
        status: 'fail',
        message: validationResult.message,
      });
    }

    // // Check if user already exists
    // const userExists = await checkUserEmailExists(newUser.email);
    // if (userExists) {
    //   return res.status(400).json({
    //     status: 'fail',
    //     message: 'This user (email) already exists',
    //   });
    // }

    // Create user
    const createdUser = await db('users').insert(newUser, '*');
    return res.status(201).json({
      status: 'success',
      data: {
        user: createdUser[0],
      },
    });
  },
);

// User Validation
const validateUser = async (
  body: UserCreationAttributes,
): Promise<UserValidationResult> => {
  if (
    !body.username ||
    !validator.isLength(body.username, { min: 3, max: 30 })
  ) {
    return {
      isValid: false,
      message: 'Username is required and should be between 3 and 30 characters',
    };
  }
  if (!body.password || !validator.isStrongPassword(body.password)) {
    return {
      isValid: false,
      message: 'Password is required and should be strong',
    };
  }
  if (!body.email || !validator.isEmail(body.email)) {
    return { isValid: false, message: 'Valid email is required' };
  }
  if (!body.function) {
    return { isValid: false, message: 'Function is required' };
  }
  if (!body.role) {
    return { isValid: false, message: 'Role is required' };
  }
  if (body.phone && !validator.isMobilePhone(body.phone)) {
    return { isValid: false, message: 'Phone number is invalid' };
  }
  return { isValid: true, message: '' };
};

// Check if user already exists
const checkUserEmailExists = async (email: string): Promise<boolean> => {
  const user: User | undefined = await db('users').where({ email }).first();
  return user !== undefined;
};

// Update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: User | undefined = await db('users')
      .where({ id: Number(req.params.id) })
      .first();

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const updatedUser = await db('users')
      .where({ id: Number(req.params.id) })
      .update(req.body, '*');
    return res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser[0],
      },
    });
  },
);

/**
 * List all the User entries stored in the database. In the response header the atribute named
 * X-Total-Count list the total number of users. If there are no users in the database, or if
 * there is a problem with the database access, an error message will be sent as part of the
 * response.
 *
 * @returns The response to be sent to the frontend.

 async function index(request: Request, response: Response) {
 let result;

 try {
 const users = await db('users').select('*');

 const [{ total }] = await db('users').count('* as total');

 response.set('X-Total-Count', String(total));

 if (total == 0) {
 result = response
 .status(404)
 .json({ message: 'There are no users in the database.' });
 } else {
 result = response.status(200).json(users);
 }
 } catch (err) {
 console.error(err);

 result = response
 .status(500)
 .json({ message: 'Error when trying to access Users in the database.' });
 }

 return result;
 }
 * @param req
 * @param res
 */
/**
 * Loads a single User entry stored in the database, using the ID to search for it. If the user was
 * not found or if there is a problem in the database, an error message will be sent as part of the
 * response. Otherwise, the user object will be sent.
 *
 * @param request The request sent to the backend.
 * @param response The response sent to the frontend.
 * @returns The response to be sent to the frontend.

async function show(request: Request, response: Response) {
  let result;

  const { id } = request.params;

  try {
    const user: User = await db('users').where('id', id).select('*').first();

    if (!user) {
      result = response
        .status(404)
        .json({ message: `User with ID ${id} not found in the database.` });
    } else {
      result = response.status(200).json(user);
    }
  } catch (err) {
    console.error(err);

    result = response.status(500).json({
      message: `Error when trying to access User with ID ${id} in the database.`,
    });
  }

  return result;
}
*/
/**
 * Creates an User entry in the database. If the email format is invalid, or if the User can't be
 * created due to problems in the database an error message will be sent as part of the response.
 * If the user is created, then a message containing it's ID is also sent as part of the response.
 *
 * @param request The request sent to the backend.
 * @param response The response sent to the frontend.
 * @returns The response to be sent to the frontend.

async function create(request: Request, response: Response) {
  let result;

  const { name, phone, email, age, weight } = request.body;

  if (!validate(email)) {
    result = response
      .status(400)
      .json({ message: `The email ${email} is not in a valid format.` });
  } else {
    try {
      const id = randomBytes(4).toString('hex');
      const new_user: User = { id, name, phone, email, age, weight };

      await db('users').insert(new_user);

      result = response
        .status(201)
        .json({ message: `User with ID ${id} was created.` });
    } catch (err) {
      console.error(err);

      result = response.status(500).json({
        message: 'Error when trying to insert new User in the database.',
      });
    }
  }

  return result;
}
*/
/**
 * Change the attribute of a specific User entry in the database, using the ID to search and the
 * request body to specify the fields to change and the new values to be updated. If errors happen
 * during the process, messages will be sent as part of the response.
 *
 * @param request The request sent to the backend.
 * @param response The response sent to the frontend.
 * @returns The response to be sent to the frontend.

async function change(request: Request, response: Response) {
  let result;

  const { id } = request.params;
  const { name, phone, email, age, weight } = request.body;

  try {
    const user: User = await db('users').where('id', id).select('*').first();

    if (!user) {
      result = response
        .status(404)
        .json({ message: `User with ID ${id} not found to be changed.` });
    } else {
      try {
        await db('users')
          .where('id', id)
          .update({ name, phone, email, age, weight });

        result = response
          .status(200)
          .json({ message: `User with ID ${id} was updated.` });
      } catch (err) {
        result = response
          .status(500)
          .json({ message: `Could not update User with ID ${id}.` });
      }
    }
  } catch (err) {
    console.error(err);

    result = response.status(500).json({
      message: `Error when trying to access User with ID ${id} in the database.`,
    });
  }

  return result;
}
*/
/**
 * Deletes a User entry in the database, using the ID to search for it. If the user not exists in
 * the database, or if there is a problem with the database access, or if the user was deleted or
 * if the user can not be deleted an error message will be sent as part of the response.
 *
 * @param request The request sent to the backend.
 * @param response The response sent to the frontend.
 * @returns The response to be sent to the frontend.

async function remove(request: Request, response: Response) {
  let result;

  const { id } = request.params;

  try {
    const user: User = await db('users').where('id', id).select('*').first();

    if (!user)
      result = response
        .status(404)
        .json({ message: `User with ID ${id} was not found to be deleted.` });
    else {
      try {
        await db('users').where('id', id).first().delete();

        result = response
          .status(200)
          .json({ message: `User with ID ${id} deleted. ` });
      } catch (err) {
        console.error(err);

        result = response
          .status(500)
          .json({ message: `Could not delete User with ID ${id}.` });
      }
    }
  } catch (err) {
    console.error(err);

    result = response.status(500).json({
      message: `Error when trying to access User with ID ${id} in the database.`,
    });
  }

  return result;
}
*/
export default { getUserById, getAllUser, createUser };
