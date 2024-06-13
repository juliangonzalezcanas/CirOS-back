import { Router } from 'express';
import jetValidator from 'jet-validator';
import Paths from '@src/common/Paths';
import CompraRoutes from '@src/routes/CompraRoutes';
import ProductoRoutes from '@src/routes/ProductoRoutes';
import UserRoutes from './UserRoutes';
import Producto_has_CompraRoutes  from './Producto_has_CompraRoutes';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const empleadoRouter = Router();
const sectorRouter = Router();

// Get all users
empleadoRouter.get(
  Paths.Empleados.Get,
  EmpleadoRoutes.getAll,
);

// Add one user
empleadoRouter.post(
  Paths.Empleados.Add,
  EmpleadoRoutes.add,
);

// Update one user
empleadoRouter.put(
  Paths.Empleados.Update,
  EmpleadoRoutes.update,
);

// Delete one user
empleadoRouter.delete(
  Paths.Empleados.Delete,
  validate(['id', 'number', 'params']),
  EmpleadoRoutes.delete,
);

// Get all users
sectorRouter.get(
  Paths.Sectores.Get,
  SectorRoutes.getAll,
);

// Add one user
sectorRouter.post(
  Paths.Sectores.Add,
  SectorRoutes.add,
);

// Update one user
sectorRouter.put(
  Paths.Sectores.Update,
  SectorRoutes.update,
);

// Delete one user
sectorRouter.delete(
  Paths.Sectores.Delete,
  validate(['id', 'number', 'params']),
  SectorRoutes.delete,
);

// Add Routers
apiRouter.use(Paths.Empleados.Base, empleadoRouter);
apiRouter.use(Paths.Sectores.Base, sectorRouter);


// **** Export default **** //

export default apiRouter;