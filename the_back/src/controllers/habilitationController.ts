import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import db from '../database/connection';
import { Menu, MenuCreate } from '../models/Menu';
import { Permission, PermissionCreate } from '../models/Permission';
import { Fonction, FonctionCreate } from '../models/Fonction';
import {
  FonctionMenuPermission,
  FonctionMenuPermissionCreate,
} from '../models/Fonction_menu_permission';

const createMenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nom, description } = req.body;

    // Validation de base
    if (!nom) {
      return next(new AppError('Le nom du menu est requis', 400));
    }

    try {
      const nouveauMenu: MenuCreate = {
        nom,
        description,
        created_by: req.user!.id,
      };

      const [newMenu] = await db('menu').insert(nouveauMenu, [
        'id',
        'nom',
        'description',
      ]);

      res.status(201).json({
        status: 'succès',
        data: {
          menu: newMenu as Menu,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création du menu:', error);
      return next(new AppError('Erreur lors de la création du menu', 500));
    }
  },
);

const createPermission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nom, description, code, menu_id } = req.body;

    // Validation de base
    if (!nom || !code || !menu_id) {
      return next(
        new AppError('Le nom, le code et le menu_id sont requis', 400),
      );
    }

    try {
      const nouvellePermission: PermissionCreate = {
        nom,
        description,
        code,
        menu_id,
        created_by: req.user!.id,
      };

      const [newPermission] = await db('permission').insert(
        nouvellePermission,
        ['id', 'nom', 'description', 'code', 'menu_id'],
      );

      res.status(201).json({
        status: 'succès',
        data: {
          permission: newPermission as Permission,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création de la permission:', error);
      return next(
        new AppError('Erreur lors de la création de la permission', 500),
      );
    }
  },
);

const createFonction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nom, description } = req.body;

    // Validation de base
    if (!nom) {
      return next(new AppError('Le nom de la fonction est requis', 400));
    }

    try {
      const nouvelleFonction: FonctionCreate = {
        nom,
        description,
        created_by: req.user!.id,
      };

      const [newFonction] = await db('fonction').insert(nouvelleFonction, [
        'id',
        'nom',
        'description',
      ]);

      res.status(201).json({
        status: 'succès',
        data: {
          fonction: newFonction as Fonction,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création de la fonction:', error);
      return next(
        new AppError('Erreur lors de la création de la fonction', 500),
      );
    }
  },
);

const createFonctionMenuPermission = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fonction_id, menu_id, permission_id } = req.body;

    // Validation de base
    if (!fonction_id || !menu_id || !permission_id) {
      return next(
        new AppError(
          'Les IDs de fonction, menu et permission sont requis',
          400,
        ),
      );
    }

    try {
      const nouvelleFonctionMenuPermission: FonctionMenuPermissionCreate = {
        fonction_id,
        menu_id,
        permission_id,
        created_by: req.user!.id,
      };

      const [newFonctionMenuPermission] = await db(
        'fonction_menu_permission',
      ).insert(nouvelleFonctionMenuPermission, [
        'id',
        'fonction_id',
        'menu_id',
        'permission_id',
      ]);

      res.status(201).json({
        status: 'succès',
        data: {
          fonctionMenuPermission:
            newFonctionMenuPermission as FonctionMenuPermission,
        },
      });
    } catch (error) {
      console.error(
        'Erreur lors de la création de la liaison fonction-menu-permission:',
        error,
      );
      return next(
        new AppError(
          'Erreur lors de la création de la liaison fonction-menu-permission',
          500,
        ),
      );
    }
  },
);

export default {
  createMenu,
  createPermission,
  createFonction,
  createFonctionMenuPermission,
};
