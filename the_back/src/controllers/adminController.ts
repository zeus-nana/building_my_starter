import { catchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import {
  User,
  UserCreationAttributes,
  UserLocalisation,
  UserProfile,
  UserUpdatableFields,
  UserValidationResult,
} from '../models/User';
import db from '../database/connection';
import AppError from '../utils/appError';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/tokens';
import validator from 'validator';
import sendEmail from '../utils/email';

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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users: User[] = await db('users').select('*').orderBy('id', 'asc');

  return res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser: UserCreationAttributes = req.body;

  if (newUser.phone !== null && newUser.phone !== undefined) {
    newUser.phone = newUser.phone.trim().replace(/\D/g, '');
  }

  // Validation
  const validationResult = await validateUser(newUser);
  if (!validationResult.isValid) {
    return res.status(400).json({
      status: 'échec',
      message: validationResult.message,
    });
  }

  // Vérification de l'unicité du login, username et email
  const existingUser = await db('users')
    .where('login', newUser.login)
    .orWhere('username', newUser.username)
    .orWhere('email', newUser.email)
    .first();

  if (existingUser) {
    let errorMessage = '';
    if (existingUser.login === newUser.login) {
      errorMessage = 'Ce login est déjà utilisé.';
    } else if (existingUser.username === newUser.username) {
      errorMessage = "Ce nom d'utilisateur est déjà pris.";
    } else if (existingUser.email === newUser.email) {
      errorMessage = 'Cet email est déjà utilisé.';
    }
    return res.status(400).json({
      status: 'échec',
      message: errorMessage,
    });
  }

  // Générer un mot de passe aléatoire
  const generatedPassword = crypto.randomBytes(10).toString('hex');
  newUser.email = newUser.email.toLowerCase();
  // Hachage du mot de passe
  newUser.password = await bcrypt.hash(generatedPassword, 12);

  const createdUser = await db('users').insert(newUser, '*');
  signToken(createdUser[0].id, createdUser[0].email);

  let emailSent = true;
  // Envoyer un email à l'utilisateur
  try {
    await sendEmail({
      email: createdUser[0].email,
      subject: 'Votre compte a été créé',
      message: `Bienvenue ! 
Votre compte a été créé avec succès. Voici votre mot de passe temporaire : ${generatedPassword}
      
Nous vous recommandons de changer ce mot de passe dès votre première connexion.`,
    });
  } catch (err) {
    console.error("Erreur lors de l'envoi de l'email", err);
    emailSent = false;
  }

  return res.status(201).json({
    status: 'succès',
    message: `L'utilisateur a été créé ${
      emailSent
        ? 'et son mot de passe temporaire a été envoyé par mail.'
        : `mais son mot de passe temporaire n'a pas pu être envoyé par mail. 
         Vérifiez les paramètres SMTP du serveur. Assurez-vous que l'adresse email ${createdUser[0].email} est valide. 
         Vous devrez régénérer un nouveau mot de passe pour cet utilisateur`
    }.`,
    data: {
      userId: createdUser[0].id,
    },
  });
});

const validateUser = async (
  body: UserCreationAttributes,
): Promise<UserValidationResult> => {
  if (!body.login || !validator.isLength(body.login, { min: 3, max: 255 })) {
    return {
      isValid: false,
      message: 'Le login est requis et doit contenir entre 3 et 255 caractères',
    };
  }
  if (
    !body.username ||
    !validator.isLength(body.username, { min: 3, max: 255 })
  ) {
    return {
      isValid: false,
      message:
        "Le nom d'utilisateur est requis et doit contenir entre 3 et 255 caractères",
    };
  }
  if (
    !body.email ||
    !validator.isEmail(body.email) ||
    !validator.isLength(body.email, { max: 255 })
  ) {
    return {
      isValid: false,
      message:
        'Un email valide est requis et ne doit pas dépasser 255 caractères',
    };
  }
  if (body.department && !validator.isLength(body.department, { max: 255 })) {
    return {
      isValid: false,
      message: 'Le département ne doit pas dépasser 255 caractères',
    };
  }
  if (body.profil) {
    const validProfiles: UserProfile[] = [
      'gestionnaire',
      'reporting',
      'it_support',
    ];
    if (!validProfiles.includes(body.profil as UserProfile)) {
      return {
        isValid: false,
        message:
          'Le profil doit être "gestionnaire", "reporting" ou "it_support"',
      };
    }
  }
  if (
    body.phone &&
    (!validator.isMobilePhone(body.phone) ||
      !validator.isLength(body.phone, { max: 255 }))
  ) {
    return {
      isValid: false,
      message: 'Le numéro de téléphone est invalide ou dépasse 255 caractères',
    };
  }
  if (body.localisation) {
    const validLocalisations: UserLocalisation[] = [
      'siège',
      'adamaoua',
      'centre',
      'est',
      'extreme_nord',
      'littoral',
      'nord',
      'nord_ouest',
      'ouest',
      'sud',
      'sud_ouest',
    ];
    if (!validLocalisations.includes(body.localisation as UserLocalisation)) {
      return {
        isValid: false,
        message: "La localisation spécifiée n'est pas valide",
      };
    }
  }
  return { isValid: true, message: '' };
};

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    // TODO: Add authentication to ensure only support staff can access this endpoint

    // 1) Get user from email
    const user = await db('users').where({ email }).first();
    if (!user) {
      return next(new AppError('User not found with this email.', 404));
    }

    // 2) Generate new random password
    const newPassword = crypto.randomBytes(10).toString('hex');

    // 3) Hash and update the password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db('users').where({ id: user.id }).update({
      password: hashedPassword,
      must_reset_password: true,
    });

    // 4) Send new password to user's email
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your new password',
        message: `Your new password is: ${newPassword}`,
      });

      res.status(200).json({
        status: 'success',
        message:
          "Password has been reset. New password has been sent to user's email.",
      });
    } catch (err) {
      console.error(err);
      return next(new AppError('Error when trying to send email.', 500));
    }

    // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/${user.id}/resetPassword`;
    //
    // res.status(200).json({
    //   status: 'success',
    //   message:
    //     "Password has been reset. New password has been sent to user's email.",
    // });
  },
);

// Update user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);
    const updateData: UserUpdatableFields = req.body;

    // Check if user exists
    const user = await db('users').where({ id: userId }).first();
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Validate update data
    if (
      updateData.username &&
      !validator.isLength(updateData.username, { min: 3, max: 30 })
    ) {
      return next(
        new AppError('Username should be between 3 and 30 characters', 400),
      );
    }

    if (updateData.phone && !validator.isMobilePhone(updateData.phone)) {
      return next(new AppError('Invalid phone number', 400));
    }

    // Update user
    const updatedUser = await db('users')
      .where({ id: userId })
      .update(updateData, '*');

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser[0],
      },
    });
  },
);

export default {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  resetPassword,
};
