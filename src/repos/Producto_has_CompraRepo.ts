import { IProducto_has_Compra, Producto_has_Compra } from '@src/models/Producto_has_Compra';
import Op from 'sequelize/types/operators';

// **** Functions **** //

/**
 * Get one user.
 */

async function getOne(id: number): Promise<IProducto_has_Compra | null> {
  console.log(id);
  try {

    const producto_has_compras = await Producto_has_Compra.findAll({
      where: {
        Compra_idCompra: id
      }
    });

    return producto_has_compras.map((producto_has_compra: { toJSON: () => IProducto_has_Compra; }) => producto_has_compra.toJSON() as IProducto_has_Compra);


  } catch (error) {
    console.error("Error retrieving producto_has_compra:", error);
    return null;
  }
}


async function persists(id: number): Promise<boolean> {
  try {
    const producto_has_compra = await Producto_has_Compra.findByPk(id);
    return !!producto_has_compra;

  } catch (error) {
    console.error("Error checking producto_has_compra existence:", error);
    return false; 
  }
}


async function getAll(): Promise<IProducto_has_Compra[]> {
  try {
    
    const producto_has_compras = await Producto_has_Compra.findAll();
    return producto_has_compras.map((producto_has_compra: { toJSON: () => IProducto_has_Compra; }) => producto_has_compra.toJSON() as IProducto_has_Compra);

  } catch (error) {
    console.error("Error retrieving producto_has_compras:", error);
    return []; 
  }
}


async function add(producto_has_compra: IProducto_has_Compra): Promise<void> {
  try {
    await Producto_has_Compra.create({
      Compra_idCompra: producto_has_compra.Compra_idCompra,
      Producto_idProducto: producto_has_compra.Producto_idProducto,
      cantidad: producto_has_compra.cantidad,
      precio: producto_has_compra.precio
    });

  } catch (error) {
    console.error("Error adding producto_has_compra:", error);

  }
}



async function delete_(id: number): Promise<void> {
  try {
    
    await Producto_has_Compra.destroy({
      where: {
        Compra_idCompra: id
      }
    });

  } catch (error) {
    console.error("Error deleting producto_has_compra:", error);
   
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  delete: delete_,
} as const;