import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from '@src/common/Paths';
import CompraRoutes from '@src/routes/CompraRoutes';
import ProductoRoutes from '@src/routes/ProductoRoutes';
import UserRoutes from './UserRoutes';
import Producto_has_ComprasRoutes  from './Producto_has_CompraRoutes';
import AuthRoutes from './AuthRoutes';
import {authenticateToken}from '@src/middleware/validateToken';
import MpRoutes from './MpRoutes';
import { verifyToken } from '@src/middleware/validateToken';
import { isAdmin } from '@src/middleware/verifyUser';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const productoRouter = Router();
const compraRouter = Router();
const producto_has_compraRouter = Router();
const authRouter = Router();
const mpRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  authenticateToken,
  UserRoutes.getAll,
);

userRouter.get(
  Paths.Users.GetOne,
  authenticateToken,
  UserRoutes.getOne,
);

// Add one user
userRouter.post(
  Paths.Users.Add,
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  authenticateToken,
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  authenticateToken,
  UserRoutes.delete,
);

// Get all users
compraRouter.get(
  Paths.Compras.Get,
  authenticateToken,
  CompraRoutes.getAll,
);

compraRouter.get(
  Paths.Compras.GetOne,
  authenticateToken,
  CompraRoutes.getOne,
);

// Add one user
compraRouter.post(
  Paths.Compras.Add,
  authenticateToken,
  CompraRoutes.add,
);

// Update one user
compraRouter.put(
  Paths.Compras.Update,
  authenticateToken,
  CompraRoutes.update,
);

// Delete one user
compraRouter.delete(
  Paths.Compras.Delete,
  authenticateToken,
  CompraRoutes.delete,
);



productoRouter.get(
  Paths.Productos.Get,
  authenticateToken,
  ProductoRoutes.getAll,
);

productoRouter.get(
  Paths.Productos.GetOne,
  authenticateToken,
  ProductoRoutes.getOne,
);

productoRouter.post(
  Paths.Productos.Add,
  authenticateToken,
  ProductoRoutes.add,
);

productoRouter.put(
  Paths.Productos.idBySpecs,
  authenticateToken,
  ProductoRoutes.idBySpecs,
);

productoRouter.put(
  Paths.Productos.updateStock,
  authenticateToken,
  isAdmin,
  ProductoRoutes.updateStock,
);

productoRouter.delete(
  Paths.Productos.Delete,
  authenticateToken,
  ProductoRoutes.delete,
);

producto_has_compraRouter.get(
  Paths.Producto_has_Compra.Get,
  authenticateToken,
  Producto_has_ComprasRoutes.getAll,
);

producto_has_compraRouter.get(
  Paths.Producto_has_Compra.GetOne,
  authenticateToken,
  Producto_has_ComprasRoutes.getOne,
);

producto_has_compraRouter.post(
  Paths.Producto_has_Compra.Add,
  authenticateToken,
  Producto_has_ComprasRoutes.add,
);


producto_has_compraRouter.delete(
  Paths.Producto_has_Compra.Delete,
  authenticateToken,
  Producto_has_ComprasRoutes.delete,
);

authRouter.post(
  Paths.Auth.Login,
  AuthRoutes.login,
);

authRouter.post(
  Paths.Auth.Verify,
  verifyToken,
);

//MERCADO PAGO
mpRouter.put(
  Paths.Mp.Post,
  authenticateToken,
  MpRoutes.registrarCompra,
);

mpRouter.post(
  Paths.Mp.Post,
  MpRoutes.webhooks,
);


// Add Routers
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Compras.Base, compraRouter);
apiRouter.use(Paths.Productos.Base, productoRouter);
apiRouter.use(Paths.Producto_has_Compra.Base, producto_has_compraRouter);
apiRouter.use(Paths.Auth.Base, authRouter);
apiRouter.use(Paths.Mp.Base, mpRouter)


// **** Export default **** //

export default apiRouter;