import { catchAsync } from '../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import db from '../database/connection';
import { Menu, MenuCreate } from '../models/Menu';
import { Permission, PermissionCreate } from '../models/Permission';
import { Fonction, FonctionCreate } from '../models/Fonction';
import { FonctionMenuPermission, FonctionMenuPermissionCreate } from '../models/Fonction_menu_permission';

const createOrUpdateMenu = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, nom, description } = req.body;

  if (!nom) {
    return res.status(400).json({
      status: 'échec',
      message: 'Le nom du menu est requis',
    });
  }

  try {
    if (id) {
      const existingMenu = await db('menu').where('id', id).first();
      if (!existingMenu) {
        return res.status(404).json({
          status: 'échec',
          message: 'Menu non trouvé',
        });
      }

      const menuWithSameName = await db('menu').where('nom', nom).whereNot('id', id).first();
      if (menuWithSameName) {
        return res.status(400).json({
          status: 'échec',
          message: 'Un menu avec ce nom existe déjà',
        });
      }

      const [updatedMenu] = await db('menu').where('id', id).update(
        {
          nom,
          description,
          updated_by: req.user!.id,
        },
        ['id', 'nom', 'description'],
      );

      return res.status(200).json({
        status: 'succès',
        data: {
          menu: updatedMenu,
        },
      });
    } else {
      const existingMenu = await db('menu').where('nom', nom).first();
      if (existingMenu) {
        return res.status(400).json({
          status: 'échec',
          message: 'Un menu avec ce nom existe déjà',
        });
      }

      const nouveauMenu: MenuCreate = {
        nom,
        description,
        created_by: req.user!.id,
      };

      const [createdMenu] = await db('menu').insert(nouveauMenu, ['id', 'nom', 'description']);

      return res.status(201).json({
        status: 'succès',
        data: {
          menu: createdMenu,
        },
      });
    }
  } catch (error) {
    console.error('Erreur lors de la création ou mise à jour du menu:', error);
    return res.status(500).json({
      status: 'échec',
      message: 'Erreur lors de la création ou mise à jour du menu',
    });
  }
});

const createOrUpdateFonction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, nom, description } = req.body;

  if (!nom) {
    return res.status(400).json({
      status: 'échec',
      message: 'Le nom de la fonction est requis',
    });
  }

  try {
    if (id) {
      const existingFonction = await db('fonction').where('id', id).first();
      if (!existingFonction) {
        return res.status(404).json({
          status: 'échec',
          message: 'Fonction non trouvée',
        });
      }

      const fonctionWithSameName = await db('fonction').where('nom', nom).whereNot('id', id).first();
      if (fonctionWithSameName) {
        return res.status(400).json({
          status: 'échec',
          message: 'Une fonction avec ce nom existe déjà',
        });
      }

      const [updatedFonction] = await db('fonction').where('id', id).update(
        {
          nom,
          description,
          updated_by: req.user!.id,
        },
        ['id', 'nom', 'description'],
      );

      return res.status(200).json({
        status: 'succès',
        data: {
          fonction: updatedFonction,
        },
      });
    } else {
      const existingFonction = await db('fonction').where('nom', nom).first();
      if (existingFonction) {
        console.log('ici');
        return res.status(400).json({
          status: 'échec',
          message: 'Une fonction avec ce nom existe déjà',
        });
      }

      const nouvelleFonction: FonctionCreate = {
        nom,
        description,
        created_by: req.user!.id,
      };

      const [createdFonction] = await db('fonction').insert(nouvelleFonction, ['id', 'nom', 'description']);

      return res.status(201).json({
        status: 'succès',
        data: {
          fonction: createdFonction,
        },
      });
    }
  } catch (error) {
    console.error('Erreur lors de la création ou mise à jour de la fonction:', error);
    return res.status(500).json({
      status: 'échec',
      message: 'Erreur lors de la création ou mise à jour de la fonction',
    });
  }
});

const createOrUpdatePermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id, nom, description, menu_id } = req.body;

  if (!nom || !menu_id) {
    return res.status(400).json({
      status: 'échec',
      message: 'Le nom et le menu sont requis',
    });
  }

  try {
    if (id) {
      const existingPermission = await db('permission').where('id', id).first();
      if (!existingPermission) {
        return res.status(404).json({
          status: 'échec',
          message: 'Permission non trouvée',
        });
      }

      const permissionWithSameName = await db('permission').where('nom', nom).whereNot('id', id).first();
      if (permissionWithSameName) {
        return res.status(400).json({
          status: 'échec',
          message: 'Une permission avec ce nom existe déjà',
        });
      }

      const [updatedPermission] = await db('permission').where('id', id).update(
        {
          nom,
          description,
          menu_id,
          updated_by: req.user!.id,
        },
        ['id', 'nom', 'description', 'menu_id'],
      );

      return res.status(200).json({
        status: 'succès',
        data: {
          permission: updatedPermission,
        },
      });
    } else {
      const existingPermission = await db('permission').where('nom', nom).first();
      if (existingPermission) {
        return res.status(400).json({
          status: 'échec',
          message: 'Une permission avec ce nom existe déjà',
        });
      }

      const nouvellePermission: PermissionCreate = {
        nom,
        description,
        menu_id,
        created_by: req.user!.id,
      };

      const [createdPermission] = await db('permission').insert(nouvellePermission, [
        'id',
        'nom',
        'description',
        'menu_id',
      ]);

      return res.status(201).json({
        status: 'succès',
        data: {
          permission: createdPermission,
        },
      });
    }
  } catch (error) {
    console.error('Erreur lors de la création ou mise à jour de la permission:', error);
    return res.status(500).json({
      status: 'échec',
      message: 'Erreur lors de la création ou mise à jour de la permission',
    });
  }
});

const createFonctionMenuPermission = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { fonction_id, menu_id, permission_id } = req.body;

  // Validation de base
  if (!fonction_id || !menu_id || !permission_id) {
    return next(new AppError('Les IDs de fonction, menu et permission sont requis', 400));
  }

  try {
    const nouvelleFonctionMenuPermission: FonctionMenuPermissionCreate = {
      fonction_id,
      menu_id,
      permission_id,
      created_by: req.user!.id,
    };

    const [newFonctionMenuPermission] = await db('fonction_menu_permission').insert(nouvelleFonctionMenuPermission, [
      'id',
      'fonction_id',
      'menu_id',
      'permission_id',
    ]);

    res.status(201).json({
      status: 'succès',
      data: {
        fonctionMenuPermission: newFonctionMenuPermission as FonctionMenuPermission,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la création de la liaison fonction-menu-permission:', error);
    return next(new AppError('Erreur lors de la création de la liaison fonction-menu-permission', 500));
  }
});
const getAllMenus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const menus = await db('menu')
    .join('users', 'menu.created_by', '=', 'users.id')
    .select('menu.*', 'users.login as created_by');

  res.status(200).json({
    status: 'succès',
    data: {
      menus,
    },
  });
});

const getAllPermissions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const permissions = await db('permission')
    .join('users', 'permission.created_by', '=', 'users.id')
    .join('menu', 'permission.menu_id', '=', 'menu.id')
    .select('permission.*', 'users.login as created_by', 'menu.nom as menu');

  console.log(permissions);

  res.status(200).json({
    status: 'succès',
    data: {
      permissions,
    },
  });
});
const getAllFonctions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const fonctions = await db('fonction')
    .join('users', 'fonction.created_by', '=', 'users.id')
    .select('fonction.*', 'users.login as created_by');

  console.log(fonctions);

  res.status(200).json({
    status: 'succès',
    data: {
      fonctions,
    },
  });
});

const getAllFonctionMenuPermissions = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const fonctionMenuPermissions = await db('fonction_menu_permission')
    .join('users', 'fonction_menu_permission.created_by', '=', 'users.id')
    .select('fonction_menu_permission.*', 'users.login as created_by');

  res.status(200).json({
    status: 'succès',
    data: {
      fonctionMenuPermissions,
    },
  });
});

export default {
  createOrUpdatePermission,
  createFonctionMenuPermission,
  getAllMenus,
  getAllPermissions,
  getAllFonctions,
  getAllFonctionMenuPermissions,
  createOrUpdateMenu,
  createOrUpdateFonction,
};
