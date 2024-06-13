import HttpStatusCodes from '@src/common/HttpStatusCodes';

import Producto_has_CompraService from '@src/services/Producto_has_CompraService';
import { IProducto_has_Compra } from '@src/models/Producto_has_Compra';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
    const users = await Producto_has_CompraService.getAll();
    return res.status(HttpStatusCodes.OK).json({ users });
}

async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const alumnos = await Producto_has_CompraService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ alumnos });
}

/**
 * Add one user.
 */
async function add(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body;
  await Producto_has_CompraService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body;
  await Producto_has_CompraService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await Producto_has_CompraService.delete(id);
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
