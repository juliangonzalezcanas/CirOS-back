import HttpStatusCodes from '@src/common/HttpStatusCodes';

import ProductoService, { PRODUCTO_NOT_FOUND_ERR } from '@src/services/ProductoService';
import { IProducto, IProductoSpecs } from '@src/models/Producto';
import { IReq, IRes } from './types/express/misc';
import ProductoRepo from '@src/repos/ProductoRepo';
import { IAtt } from '@src/models/Attributes';



// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
    const productos = await ProductoService.getAll();
    return res.status(HttpStatusCodes.OK).json({ productos });
}

async function getOne(req: IReq, res: IRes) {
  const id = +req.params.id;
  const producto = await ProductoService.getOne(id);
  return res.status(HttpStatusCodes.OK).json( producto );
}



/**
 * Add one user.
 */
async function add(req: IReq<IProducto>, res: IRes) {
  const  producto  = req.body;
  await ProductoService.addOne(producto);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq<IProducto>, res: IRes) {
  const producto = req.body;
  await ProductoService.updateOne(producto);
  return res.status(HttpStatusCodes.OK).end();
}

async function updateStock(req: IReq, res: IRes) {

  const {id, quantity} = req.body as unknown as {id: number, quantity: number};
  await ProductoService.updateStock(id, quantity);
  return res.status(HttpStatusCodes.OK).end();
}

async function idBySpecs(req: IReq<IAtt>, res: IRes) {
  console.log(req.body);
  const {nombre, storage, color, ram} = req.body;


  const producto = await ProductoRepo.getProductBySpecs(nombre, storage, color, ram);
  
  const id = producto?.idProducto;
  return res.status(HttpStatusCodes.OK).send({id});
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await ProductoService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  updateStock,
  idBySpecs,
  delete: delete_,
} as const;
