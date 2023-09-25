const STRIPE_TEST_KEY = process.env.STRIPE_TEST
const stripe = require('stripe')(STRIPE_TEST_KEY);
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = any;

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const sig = req.headers['stripe-signature'];

    let event = req.body;
    
    /** 
    try {
        console.log(req.body)
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.log('error????')
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    */
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        case 'checkout.session.completed':
            console.log('HERE!!: ', event.data.object.id)
            await prisma.checkouts.update({
                where: {sessionId: event.data.object.id},
                data: {status: 'payed'}
            })
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    // cs_test_a12LVpVI6fEXRXwvWQ6uf904FqTTL3wr2QZs7klQttmZxOTldsPomL83BD
    // cs_test_a12LVpVI6fEXRXwvWQ6uf904FqTTL3wr2QZs7klQttmZxOTldsPomL83BD
  
    res.status(200).json({ name: 'John Doe' })
}




/**
 * 
 * {
  object: {
    id: 'cs_test_a1vxZuo1ybMjV1oQW68bGZDDE1cZLRUEs88Rb7hDbI3s5SXnEgL7z1VY3T',
    object: 'checkout.session',
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 12000,
    amount_total: 12000,
    automatic_tax: { enabled: false, status: null },
    billing_address_collection: null,
    cancel_url: 'https://example.com/cancel',
    client_reference_id: null,
    consent: null,
    consent_collection: null,
    created: 1695634681,
    currency: 'eur',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null
    },
    customer: null,
    customer_creation: 'if_required',
    customer_details: {
      address: [Object],
      email: 'emilio@email.com',
      name: 'Hugo Sanchez Sobron',
      phone: null,
      tax_exempt: 'none',
      tax_ids: []
    },
    customer_email: null,
    expires_at: 1695721081,
    invoice: null,
    invoice_creation: { enabled: false, invoice_data: [Object] },
    livemode: false,
    locale: null,
    metadata: {},
    mode: 'payment',
    payment_intent: 'pi_3NuBFmCD3dzPecDI1yzheRg5',
    payment_link: null,
    payment_method_collection: 'if_required',
    payment_method_configuration_details: null,
    payment_method_options: {},
    payment_method_types: [ 'card' ],
    payment_status: 'paid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: null,
    subscription: null,
    success_url: 'https://example.com/success',
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    url: null
  }
}
 */