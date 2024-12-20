import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { IReq, IRes } from './types/express/misc';
import ProductoRepo from '@src/repos/ProductoRepo';
import CompraRepo from '@src/repos/CompraRepo';
import { ICompra } from '@src/models/Compra';



const client = new MercadoPagoConfig({accessToken: 'APP_USR-7485294126253700-111121-5541da55ee4820f5f9f205636e109241-2091805520'})

//TESTUSER29179696
//Jb7lv1GHZw

//TESTUSER14613138
//nJoAJKRlyP

async function registrarCompra(req: IReq, res: IRes) {
  const body = req.body as unknown as {items: [], id: number};
  const cartItems = body.items;
  const id = body.id;


  const preference = new Preference(client)

  if(Array.isArray(cartItems)) {
    const arrangedItems= cartItems.map((item: any) => ({
        id: item.id,
        title: "Ciros",
        quantity: item.quantity,
        unit_price: item.price
    }));


    let pr = await preference.create({
      body:{
        items: arrangedItems,
        back_urls: {
          success: 'https://cjdfc5r5-4200.brs.devtunnels.ms/',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending'
        },
        auto_return: 'all',
        metadata: {
          userId: id
        },
      },
      
    });


    
    await CompraRepo.add({idCompra: (pr.collector_id)!, fecha: new Date(pr.date_created as string), Usuario_idUsuario: pr.metadata.userId} as ICompra);

    const url = pr.init_point!
    return res.send({url});
  }

  
}


async function webhooks(req: IReq) {
  const id = (req.body as unknown as { data: { id: string } }).data.id;
  await add(id);

  return new Response(null, {status: 200});
}

async function add(id: string): Promise<void> {
  const payment = await new Payment(client).get({id});


  if(payment.status === 'approved') {
    if(await CompraRepo.getOne((payment.collector_id as number))) {
      console.log('Compra aprobada');
      await CompraRepo.update({idCompra: payment.id as number, fecha: new Date(payment.date_created as string), status: payment.status, Usuario_idUsuario: payment.metadata.userId} as ICompra, (payment.collector_id as number));
      payment.additional_info?.items?.map(async (item: any) => {
        await ProductoRepo.descontarStock(item.id, item.quantity);
      });
    }
  }
}

export default {
    registrarCompra,
    webhooks
} as const;
  