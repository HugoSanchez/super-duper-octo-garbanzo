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

    const checkouts = await prisma.checkouts.findMany({
        include: {
            professional: true,
            patient: true
        }
    })
    console.log('here')
    console.log(checkouts)
    res.status(200).json({ data: checkouts })
}


