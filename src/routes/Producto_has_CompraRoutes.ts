import HttpStatusCodes from '@src/common/HttpStatusCodes';

import Producto_has_CompraService from '@src/services/Producto_has_CompraService';
import { IProducto_has_Compra } from '@src/models/Producto_has_Compra';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

/**
 * Get all producto_has_compras.
 */
async function getAll(_: IReq, res: IRes) {
    const producto_has_compras = await Producto_has_CompraService.getAll();
    return res.status(HttpStatusCodes.OK).json({ producto_has_compras });
}

async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const alumnos = await Producto_has_CompraService.getOne(id);
  return res.status(HttpStatusCodes.OK).json({ alumnos });
}

/**
 * Add one producto_has_compra.
 */
async function add(req: IReq<{producto_has_compra: IProducto_has_Compra}>, res: IRes) {
  const { producto_has_compra } = req.body;
  await Producto_has_CompraService.addOne(producto_has_compra);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one producto_has_compra.
 */
async function update(req: IReq<{producto_has_compra: IProducto_has_Compra}>, res: IRes) {
  const { producto_has_compra } = req.body;
  await Producto_has_CompraService.updateOne(producto_has_compra);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one producto_has_compra.
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
