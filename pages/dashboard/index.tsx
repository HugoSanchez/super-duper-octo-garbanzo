import React, {useEffect, useState} from 'react'
import type { NextPage } from 'next'
import CreateCheckoutForm from '../../components/CreateCheckoutForm'
import { Toaster } from '../../components/common/Toaster'
import * as Icons from '../../resources/icons'


const Dashboard: NextPage = () => {

    const [checkouts, setCheckouts] = useState<any[]>([])
    const [refetch, setRefetch] = useState<boolean>(false)
    const [renderToaster, setRenderToaster] = useState<boolean>(false)
    const [toasterMessage, setToasterMessage] = useState<string>('')
    const [renderSelector, setRenderSelector] = useState<boolean>(false)
    const [selectorIndex, setSelectorIndex] = useState<number | string | null>(null)

    useEffect(() => {
        fetchCheckouts()
    }, [refetch])


    useEffect(() => {
        setTimeout(
        () => closeToaster(),
            5000
    )}, [renderToaster])

    const fetchCheckouts = async () => {
        setRefetch(false)
        let url = process.env.NEXT_PUBLIC_BASE_URL + '/api/get-checkouts'
        let response = await fetch(url)
        let data = await response.json()
        setCheckouts(data.data.reverse())
        console.log(data.data)
    }

    const handleOpenSelector = (index: string | number) => {
        console.log(index)
        setRenderSelector(true)
        setSelectorIndex(index)
    }

    const closeToaster = () => {
        setRenderToaster(false)
        setToasterMessage('')
    }

    const handleCopyUrl = (url: string) => {
        setRenderToaster(true)
        setToasterMessage('copiado!')
        navigator.clipboard.writeText(url)
    }


	return (
		<div className="w-screen h-screen p-24">
            
            <Toaster 
                renderToaster={renderToaster}
                toasterMessage={toasterMessage}
                closeToaster={closeToaster}
            />
            
            <div className=''>

            <div className='h-12 w-full flex flex-row bg-slate-100'>
                    <div className='w-3/12 flex items-center justify-center'>
                        <p className='font-normal text-slate-500'>PACIENTE</p>
                    </div>
                    <div className='w-2/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>FACULTATIVO</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>TIPO</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>DIA</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>HORA</p>
                    </div>
                    <div className='w-1/12 flex items-center justify-center'>
                        <p className='font-normal text-slate-500'>LINK</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>ENVIADO</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>STATUS</p>
                    </div>
                    <div className='w-1/12 flex flex-row items-center justify-center'>
                        <p className='font-normal text-slate-500'>ACCION</p>
                    </div>
                </div>
                <CreateCheckoutForm reftech={setRefetch}/>
                <div className='mt-4 border-slate-200 border border-t-slate-100'>
                    {
                        checkouts.map((checkout, index) => {
                            return (
                                <div
                                    key={index} 
                                    className={`h-12 flex flex-row border border-slate-200 border-b-0 border-x-0
                                        ${index % 2 == 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                    <div className='w-3/12 flex items-center justify-center '>
                                        <p className='font-light text-sm'>{checkout?.patient.email}</p>
                                    </div>
                                    <div className='w-2/12 flex flex-row items-center justify-start pl-4'>
                                        <div className='h-4 w-4 mr-3 rounded-full bg-slate-300'/>
                                        <p className='font-light text-sm'>{checkout.professional.name}</p>
                                    </div>
                                    <div className='w-1/12 flex flex-row items-center justify-start '>
                                        <p className='font-light text-sm'>primera (120€)</p>
                                    </div>
                                    <div className='w-1/12 flex flex-row items-center justify-center '>
                                        <p className='font-light text-sm'>{checkout.date.toString().slice(0, 10)}</p>
                                    </div>
                                    <div className='w-1/12 flex flex-row items-center justify-center '>
                                        <p className='font-light text-sm'>{checkout.time}</p>
                                    </div>
                                    <div
                                        onClick={() => handleCopyUrl(checkout.url)} 
                                        className='w-1/12 flex flex-row items-center justify-center cursor-pointer'>
                                           <Icons.clipboard />
                                            <p className='text-slate-500 text-sm font-light ml-1 hover:text-slate-600'> copiar</p>
                                    </div>
                                    <div className='w-1/12 relative flex flex-row items-center justify-center '>
                                        <p  
                                            onClick={() => handleOpenSelector(index)}
                                            className={`font-light text-sm px-2 rounded-md
                                                ${checkout.sent ? 'bg-emerald-200' : 'bg-slate-200 italic'}`}>
                                               {checkout.sent ? 'enviado' : 'pendiente'} 
                                            </p>

                                        <div className={`absolute top-0 z-10 bg-white p-2 border border-slate-200
                                            ${renderSelector && selectorIndex == index ? '' : 'hidden'}`}>
                                            <div
                                                onClick={() => console.log(1)} 
                                                className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
                                                <p  className='font-light text-sm bg-emerald-100 px-2 rounded-md'>enviado</p>
                                            </div>
                                            <div
                                                onClick={() => console.log(2)}  
                                                className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
                                                <p className='font-light text-sm bg-slate-200 px-2 rounded-md'>pendiente</p>                                               </div>
                                        </div>
                                                            
                                    </div>
                                    <div className='w-1/12  flex flex-row items-center justify-center '>
                                        <p  
                                            className={`font-light text-sm px-2 rounded-md
                                            ${checkout.status == 'payed' ? 'bg-emerald-200' : 'bg-slate-200 italic'}`}>
                                            {checkout.status == 'payed' ? 'pagado' : 'pendiente'} 
                                        </p>
                                    </div>
                                    <div className='w-1/12  flex flex-row items-center justify-center p-2'>
                                        <div className='w-full h-full rounded-lg shadow-slate-100 shadow-sm bg-slate-200 hover:bg-slate-300 cursor-pointer flex items-center justify-center'>
                                            <p className=' text-slate-800 text-sm font-light'>Cancelar</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
		</div>
	)
}

export default Dashboard
