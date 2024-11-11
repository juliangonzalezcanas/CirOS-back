import MercadoPagoConfig, { Payment } from 'mercadopago';
import { IReq, IRes } from './types/express/misc';
import { Request, Response } from 'express';

// TEST-1141029014111656-111107-8d7dbdb464184de1417154513735bdb4-298791634

const MercadoPago = require('mercadopago');
const client = new MercadoPagoConfig({accessToken: 'TEST-1141029014111656-111107-8d7dbdb464184de1417154513735bdb4-298791634 '})


type MercadoPagoResponse = {
    body: {
      id: string;
    };
  };

async function registrarCompra(req: IReq, res: IRes) {

    const preference = {
        items: [
          {
            title: 'Producto de ejemplo',
            quantity: 1,
            unit_price: 100,
          },
        ],
        back_urls: {
          success: 'http://www.tusitio.com/success',
          failure: 'http://www.tusitio.com/failure',
          pending: 'http://www.tusitio.com/pending',
        },
        auto_return: 'approved', // Redirige automáticamente al usuario si el pago es aprobado
      };
    
    MercadoPago.preferences.create(preference)
      .then((response: MercadoPagoResponse) => {
        res.status(200).json({
          preferenceId: response.body.id, // Aquí obtienes el preferenceId
        });
      })
      .catch((error: Error) => {
        console.error(error);
        res.status(500).send('Error al crear preferencia');
      });
}


export default {
    registrarCompra,
} as const;
  