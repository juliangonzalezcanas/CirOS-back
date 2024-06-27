import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CompraService from '@src/services/CompraService';
import { ICompra } from '@src/models/Compra';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
    const compra = await CompraService.getAll();
    return res.status(HttpStatusCodes.OK).json({ compra });
}

async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const compra = await CompraService.getOne(id);
  return res.status(HttpStatusCodes.OK).json( compra );
}

/**
 * Add one user.
 */
async function add(req: IReq<ICompra>, res: IRes) {
  const compra = req.body;
  await CompraService.addOne(compra);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<ICompra>, res: IRes) {
  const compra = req.body;
  await CompraService.updateOne(compra);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await CompraService.delete(id);
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
