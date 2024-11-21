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
    Verify: '/verify',
  },
  Productos: {
    Base: '/producto',
    Get: '/',
    GetOne: '/:id',
    GetProductbyIdSpec:'/getProductBySpecs',
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
  },
  Mp: {
    Base: '/pagos',
    Post: '/',
  }

} as const;
