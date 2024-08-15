import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from '@src/common/Paths';
import CompraRoutes from '@src/routes/CompraRoutes';
import ProductoRoutes from '@src/routes/ProductoRoutes';
import UserRoutes from './UserRoutes';
import Producto_has_ComprasRoutes  from './Producto_has_CompraRoutes';
import AuthRoutes from './AuthRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const productoRouter = Router();
const compraRouter = Router();
const producto_has_compraRouter = Router();
const authRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
);

userRouter.get(
  Paths.Users.GetOne,
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
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  UserRoutes.delete,
);

// Get all users
compraRouter.get(
  Paths.Compras.Get,
  CompraRoutes.getAll,
);

compraRouter.get(
  Paths.Compras.GetOne,
  CompraRoutes.getOne,
);

// Add one user
compraRouter.post(
  Paths.Compras.Add,
  CompraRoutes.add,
);

// Update one user
compraRouter.put(
  Paths.Compras.Update,
  CompraRoutes.update,
);

// Delete one user
compraRouter.delete(
  Paths.Compras.Delete,
  CompraRoutes.delete,
);

productoRouter.get(
  Paths.Productos.Get,
  ProductoRoutes.getAll,
);

productoRouter.get(
  Paths.Productos.GetOne,
  ProductoRoutes.getOne,
);

productoRouter.post(
  Paths.Productos.Add,
  ProductoRoutes.add,
);

productoRouter.put(
  Paths.Productos.Update,
  ProductoRoutes.update,
);

productoRouter.delete(
  Paths.Productos.Delete,
  ProductoRoutes.delete,
);

producto_has_compraRouter.get(
  Paths.Producto_has_Compra.Get,
  Producto_has_ComprasRoutes.getAll,
);

producto_has_compraRouter.get(
  Paths.Producto_has_Compra.GetOne,
  Producto_has_ComprasRoutes.getOne,
);

producto_has_compraRouter.post(
  Paths.Producto_has_Compra.Add,
  Producto_has_ComprasRoutes.add,
);


producto_has_compraRouter.delete(
  Paths.Producto_has_Compra.Delete,
  Producto_has_ComprasRoutes.delete,
);

authRouter.post(
  Paths.Auth.Login,
  AuthRoutes.login,
);


// Add Routers
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Compras.Base, compraRouter);
apiRouter.use(Paths.Productos.Base, productoRouter);
apiRouter.use(Paths.Producto_has_Compra.Base, producto_has_compraRouter);
apiRouter.use(Paths.Auth.Base, authRouter);


// **** Export default **** //

export default apiRouter;