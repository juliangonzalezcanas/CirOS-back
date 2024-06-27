import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import Producto_has_CompraRepo from '@src/repos/Producto_has_CompraRepo';
import { IProducto_has_Compra } from '@src/models/Producto_has_Compra';
import { Producto_has_Compra } from '@src/models/Producto_has_Compra';


// **** Variables **** //

export const PRODUCTOHASCOMPRA_NOT_FOUND_ERR = 'Producto-Compra not found';


// **** Functions **** //


function getAll(): Promise<IProducto_has_Compra[]> {
  return Producto_has_CompraRepo.getAll();
}

async function getOne(id :number): Promise<IProducto_has_Compra | null> {
  return Producto_has_CompraRepo.getOne(id);
}


function addOne(prodCompra: IProducto_has_Compra): Promise<void> {
  return Producto_has_CompraRepo.add(prodCompra);
}




async function _delete(id: number): Promise<void> {
  const persists = await Producto_has_CompraRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PRODUCTOHASCOMPRA_NOT_FOUND_ERR,
    );
  }
  
  return Producto_has_CompraRepo.delete(id);
}


// **** Export default **** //

export default {
  getOne,
  getAll,
  addOne,
  delete: _delete,
} as const;
