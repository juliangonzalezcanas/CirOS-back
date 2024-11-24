import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ProductoRepo from '@src/repos/ProductoRepo';
import { IProducto, Producto } from '@src/models/Producto';


// **** Variables **** //

export const PRODUCTO_NOT_FOUND_ERR = 'Producto not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IProducto[]> {
  return ProductoRepo.getAll();
}

async function getOne(id :number): Promise<IProducto | null> {
  return ProductoRepo.getOne(id);
}
/**
 * Add one user.
 */
function addOne(producto: IProducto): Promise<void> {
  return ProductoRepo.add(producto);
}

/**
 * Update one user.
 */
async function updateOne(producto: IProducto): Promise<void> {
  const persists = await ProductoRepo.persists(producto.idProducto);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PRODUCTO_NOT_FOUND_ERR,
    );
  }
  // Return user
  return ProductoRepo.update(producto);
}

async function updateStock(id: number, quantity: number): Promise<void> {
  return ProductoRepo.updateStock(id, quantity);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await ProductoRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PRODUCTO_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return ProductoRepo.delete(id);
}


// **** Export default **** //

export default {
  getOne,
  getAll,
  addOne,
  updateOne,
  updateStock,  
  delete: _delete,
} as const;
