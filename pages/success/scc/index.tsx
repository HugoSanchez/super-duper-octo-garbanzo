import React, {useEffect, useState} from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'

import scc from '../../../logos/logo_soy.jpeg'

const Success: NextPage = (props: any) => {


	return (
		<div className="w-screen h-screen p-24 flex flex-col items-center">
            <div className='fixed top-4 left-10 w-24 h-24'>
                <Image src={scc} alt="Logo" layout="fit" objectFit="cover"  />
            </div>
            <div className='fixed top-1/3 flex flex-col lg:w-1/3 text-center px-10'>
                <p className='text-4xl font-semibold text-slate-800'>
                    Gracias, tu visita está confirmada.
                </p>
                <p className='mt-4 font-extralight text-base'>
                    Si tienes alguna duda, o necesitas modificar tu cita, escríbenos por whatsapp al 658 459 852
                </p>
            </div>
		</div>
	)
}

export default Success
