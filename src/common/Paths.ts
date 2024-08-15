/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Users: {
    Base: '/usuario',
    Get: '/',
    GetOne: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
  Auth: {
    Base: '/auth',
    Login: '/',
  },
  Productos: {
    Base: '/producto',
    Get: '/',
    GetOne: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
  Compras: {
    Base: '/compra',
    Get: '/',
    GetOne: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
  Producto_has_Compra: {
    Base: '/prodHasComp',
    Get: '/',
    GetOne: '/:id',
    Add: '/',
    Delete: '/:id',
  }
} as const;
