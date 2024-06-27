import { sequelize } from "../database";
import { DataTypes } from 'sequelize';
import { Usuario } from './User';



export interface ICompra {
  idCompra: number;
  fecha: Date;
  Usuario_idUsuario: number;
}

export const Compra = sequelize.define('Compra', {
    idCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    } 
}, {
  timestamps: false,
  tableName: 'Compra'
});