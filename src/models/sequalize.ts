import { Compra } from "./Compra";
import { Producto } from "./Producto";
import { Producto_has_Compra } from "./Producto_has_Compra";
import { Usuario } from "./User";

export function defineAssociations() {
    Compra.hasMany(Usuario, {foreignKey: 'Usuario_idUsuario'});
    Usuario.belongsTo(Compra, {primaryKey: 'idUsuario'});

    Compra.hasMany(Producto, {through: Producto_has_Compra, foreignKey: 'Producto_idProducto'});
    Producto.hasMany(Compra, {through: Producto_has_Compra, foreignKey: 'Compra_idCompra'});

}