import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()




type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    /** 
    const checkout = await prisma.checkouts.create({
        data: {
            name: 'Bob',
            email: 'bob@prisma.io',
            posts: {
                create: {
                title: 'Hello World',
                },
            },
        },
    })
      
    console.log(checkout)
    */
    
    const patient = await prisma.patient.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
        },
    })
    
      console.log(patient)

    res.status(200).json({ name: patient.name,  email: patient.email})
}


