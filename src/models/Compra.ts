import { sequelize } from "../database";
import { DataTypes } from 'sequelize';
import { Usuario } from './User';



export interface ICompra {
  idCompra: number;
  fecha: Date;
  status: string;
  Usuario_idUsuario: number;
  total: number;
}

export const Compra = sequelize.define('Compra', {
    idCompra: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Usuario_idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    } ,
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
  timestamps: false,
  tableName: 'Compra'
});