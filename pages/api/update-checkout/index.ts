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

    let body = JSON.parse(req.body)

    const checkouts = await prisma.checkouts.update({
        where: {id: body.id},
        data: {}
    })
    console.log('here')
    console.log(checkouts)
    res.status(200).json({ data: checkouts })
}


