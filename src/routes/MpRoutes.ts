import MercadoPagoConfig, { Payment, Preference } from 'mercadopago';
import { IReq, IRes } from './types/express/misc';



const client = new MercadoPagoConfig({accessToken: 'APP_USR-7485294126253700-111121-5541da55ee4820f5f9f205636e109241-2091805520'})

//TESTUSER29179696
//Jb7lv1GHZw

//TESTUSER14613138
//nJoAJKRlyP

async function registrarCompra(req: IReq, res: IRes) {
  const cartItems = req.body;
  const preference = new Preference(client)

  if(Array.isArray(cartItems)) {
    const arrangedItems= cartItems.map((item: any) => ({
        id: "item",
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
        auto_return: 'all'
      },
      
    });

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
    console.log('Compra aprobada');
  }
}

export default {
    registrarCompra,
    webhooks
} as const;
  