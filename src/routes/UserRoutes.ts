import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const user = await UserService.getOne(id);
  return res.status(HttpStatusCodes.OK).json( user );
}

/**
 * Add one user.
 */
async function add(req: IReq<IUser>, res: IRes) {
  const  user  = req.body;
  try {
    await UserService.addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).end();
  }
}

/**
 * Update one user.
 */
async function update(req: IReq<IUser>, res: IRes) {
  const  user  = req.body;

  //asegurarse de que el usuario que se quiere actualizar es el mismo que el que esta logueado

  const token = (req.headers['authorization'] as string).split(' ')[1];
  const id = JSON.parse(atob(token.split('.')[1])).data;
  user.idUsuario = id;
   
  await UserService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await UserService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
