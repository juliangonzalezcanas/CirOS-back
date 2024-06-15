import { sequelize } from "../database";
import { DataTypes } from 'sequelize';

import { Producto } from './Producto';
import { Compra } from './Compra';

export interface IProducto_has_Compra {
  Producto_idProducto: number;
  Compra_idCompra: number;
  cantidad: number;
}

export const Producto_has_Compra = sequelize.define('Producto_has_Compra', {
    Producto_idProducto: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'idProducto'
        }
    },
    Compra_idCompra: {
        type: DataTypes.INTEGER,
        references: {
            model: Compra,
            key: 'idCompra'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  timestamps: false,
  tableName: 'Producto_has_Compra'
});