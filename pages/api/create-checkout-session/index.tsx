import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


const STRIPE_TEST_KEY = process.env.STRIPE_TEST
const stripe = require('stripe')(STRIPE_TEST_KEY);
const prisma = new PrismaClient()

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  	let body = JSON.parse(req.body)

 
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
			{
				price: 'price_1NqxdvCD3dzPecDIaqv5mcEw',
				quantity: 1,
			},
        ],
        payment_intent_data: {
			application_fee_amount: 600,
			transfer_data: {
				destination: 'acct_1Nqtm6KmP2k2bi5U',
			},
        },
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });



	const checkout = await prisma.checkouts.create({
        data: {
            url: session.url,
            sessionId: session.id,
            status: 'pending',
			date: body.dateValue,
			time: body.time,
            professional: {
                connectOrCreate: {
					create: {
						name: body.professional

					},
					where: {
						name: body.professional
					}
                }
            },
            patient: {
                connectOrCreate: {
                	create: {
						email: body.email

					},
					where: {
						email: body.email

					}
                },
            },
        },
    })
    console.log(checkout)
    res.status(200).json({ data: checkout })
}


