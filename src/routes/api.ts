import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from '@src/common/Paths';
import CompraRoutes from '@src/routes/CompraRoutes';
import ProductoRoutes from '@src/routes/ProductoRoutes';
import UserRoutes from './UserRoutes';
import Producto_has_ComprasRoutes  from './Producto_has_CompraRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const productoRouter = Router();
const compraRouter = Router();
const producto_has_compraRouter = Router();

// Get all users
userRouter.get(
  Paths.Users.Get,
  UserRoutes.getAll,
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
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Get all users
compraRouter.get(
  Paths.Compras.Get,
  CompraRoutes.getAll,
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
  validate(['id', 'number', 'params']),
  CompraRoutes.delete,
);

productoRouter.get(
  Paths.Productos.Get,
  ProductoRoutes.getAll,
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
  validate(['id', 'number', 'params']),
  ProductoRoutes.delete,
);

producto_has_compraRouter.get(
  Paths.Producto_has_Compra.Get,
  Producto_has_ComprasRoutes.getAll,
);

producto_has_compraRouter.post(
  Paths.Producto_has_Compra.Add,
  Producto_has_ComprasRoutes.add,
);

producto_has_compraRouter.put(
  Paths.Producto_has_Compra.Update,
  Producto_has_ComprasRoutes.update,
);

producto_has_compraRouter.delete(
  Paths.Producto_has_Compra.Delete,
  validate(['id', 'number', 'params']),
  Producto_has_ComprasRoutes.delete,
);



// Add Routers
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Compras.Base, compraRouter);
apiRouter.use(Paths.Productos.Base, productoRouter);


// **** Export default **** //

export default apiRouter;