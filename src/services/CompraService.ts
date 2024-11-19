import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import CompraRepo from '@src/repos/CompraRepo';
import { ICompra } from '@src/models/Compra';


// **** Variables **** //

export const COMPRA_NOT_FOUND_ERR = 'Compra not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<ICompra[]> {
  return CompraRepo.getAll();
}

async function getOne(id :number): Promise<ICompra | null> {
  return CompraRepo.getOne(id);
}
/**
 * Add one user.
 */
function addOne(compra: ICompra): Promise<void> {
  return CompraRepo.add(compra);
}

/**
 * Update one user.
 */
async function updateOne(compra: ICompra, id: number): Promise<void> {
  const persists = await CompraRepo.persists(compra.idCompra);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COMPRA_NOT_FOUND_ERR,
    );
  }
  // Return user
  return CompraRepo.update(compra, id);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await CompraRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COMPRA_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return CompraRepo.delete(id);
}


// **** Export default **** //

export default {
  getOne,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
