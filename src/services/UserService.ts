import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IUser[]> {
  return UserRepo.getAll();
}

async function getOne(id :number): Promise<IUser | null> {
  return UserRepo.getOne(id);
}
/**
 * Add one user.
 */
function addOne(user: IUser): Promise<string | void> {
  try{
    console.log(user);
    return UserRepo.add(user);
  } catch(err){
    return err;
  }
}

/**
 * Update one user.
 */
async function updateOne(user: IUser): Promise<void> {
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return UserRepo.delete(id);
}


// **** Export default **** //

export default {
  getOne,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;
