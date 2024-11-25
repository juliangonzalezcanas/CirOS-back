import { ICompra, Compra } from '@src/models/Compra';

// **** Functions **** //

/**
 * Get one user.
 */

async function getOne(id: number): Promise<ICompra | null> {
  try {

    const compra = await Compra.findOne({
      where: {
        idCompra: id
      }
    });


    return compra ? compra.toJSON() as ICompra : null;

  } catch (error) {
    console.error("Error retrieving compra:", error);
    return null;
  }
}


async function persists(id: number): Promise<boolean> {
  try {
    const compra = await Compra.findByPk(id);
    return !!compra;

  } catch (error) {
    console.error("Error checking compra existence:", error);
    return false; 
  }
}


async function getAll(): Promise<ICompra[]> {
  try {
    
    const compras = await Compra.findAll();
    return compras.map((compra: { toJSON: () => ICompra; }) => compra.toJSON() as ICompra);

  } catch (error) {
    console.error("Error retrieving compras:", error);
    return []; 
  }
}


async function add(compra: ICompra): Promise<void> {
  try {
    await Compra.create({
      idCompra: compra.idCompra,
      fecha: compra.fecha,
      Usuario_idUsuario: compra.Usuario_idUsuario
    });

  } catch (error) {
    console.error("Error adding compra:", error);

  }
}

async function update(compra: ICompra, id: number): Promise<void> {
  try {

    await Compra.update(compra, {
      where: {
        idCompra: id
      }
    });

  } catch (error) {
    console.error("Error updating compra:", error);

  }
}


async function delete_(id: number): Promise<void> {
  try {
    
    await Compra.destroy({
      where: {
        idCompra: id
      }
    });

  } catch (error) {
    console.error("Error deleting compra:", error);
   
  }
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;