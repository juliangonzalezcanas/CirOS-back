import MercadoPagoConfig, { Preference } from 'mercadopago';
import { IReq, IRes } from './types/express/misc';
import { Request, Response } from 'express';

// TEST-1141029014111656-111107-8d7dbdb464184de1417154513735bdb4-298791634

const client = new MercadoPagoConfig({accessToken: 'TEST-1141029014111656-111107-8d7dbdb464184de1417154513735bdb4-298791634 '})


async function registrarCompra(req: IReq, res: IRes) {

  const preference = new Preference(client)
  let pr = await preference.create({
    body:{
      items: [
        {
          id: "message",
          unit_price: 100,
          quantity: 1,
          title: 'prueba'
        }
      ]
    },
  });
  
  return res.append(pr.init_point!)
}


export default {
    registrarCompra,
} as const;
  