import React, {useCallback, useState} from 'react';
import CalendarWidget from './common/Calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateCheckoutForm = (props: any) => {

	let [email, setEmail] = useState<string>('')
	let [professional, setProfessional] = useState<string | null>(null)
	let [product, setProduct] = useState<number | null>(null)
	let [dateValue, onChange] = useState<Value>(null);
	let [time, setTime] = useState<string>('');

	let [renderProfesionalSelector, setRenderProfesionalSelector] = useState<boolean>(false)
	let [renderProductSelector, setRenderProductSelector] = useState<boolean>(false)
	let [renderCalendar, setRenderCalendar] = useState<boolean>(false)

	const handleCreateCheckoutSession = async () => {
		let data = {email, professional, product, dateValue, time}
		let url = process.env.NEXT_PUBLIC_BASE_URL as string + '/api/create-checkout-session'
		let response = await fetch(url, {method: 'POST', body: JSON.stringify(data)})
		let parsed = await response.json()
		navigator.clipboard.writeText(parsed.data.url)
		props.setRenderToaster(true)
		props.setToasterMessage('Creado y copiado')
		props.reftech(true)
		resetInitialState()
	}

	const resetInitialState = () => {
		setEmail('')
		setProfessional(null)
		setProduct(null)
		onChange(null)
		setTime('')
		setRenderProfesionalSelector(false)
		setRenderProductSelector(false)
		setRenderCalendar(false)
	}

	const handleProfesionalSelect = useCallback((profesional: string) => {
		setProfessional(profesional)
		setRenderProfesionalSelector(false)
	}, [])

	const handleProductSelect = useCallback((product: number) => {
		setProduct(product)
		setRenderProductSelector(false)
	}, [])

	const handleCalendarSelect = useCallback((date: Value) => {
		onChange(date)
		setRenderCalendar(false)
	}, [])

	return (
		<div className='h-12 flex flex-row border border-slate-400 border-b-1 border-x-0 mt-4'>
			<div className='w-3/12 flex items-center justify-center '>

				<input 
					type="text" 
					name="email-paciente"
					value={email}
					placeholder={`paciente@email.com`}
					className="w-full text-center placeholder:text-slate-400 text-sm font-light placeholder:font-light focus:outline-none" 
					onChange={(e) => setEmail(e.target.value)}
					>
				</input>
			</div>
			<div className='relative w-2/12 flex flex-row items-center justify-center'>
				<div onClick={() => setRenderProfesionalSelector(true)}>
					{
						professional ? 
						<div className='flex flex-row items-centercursor-pointer'>
							<span className='w-4 h-4 rounded-full bg-slate-300 mr-2'/>
							<p className='text-sm font-light'>{professional}</p>
						</div>
						: <p className='text-slate-400 text-sm font-light'>Seleciona profesional</p>
					}
				</div>
				<div className={`absolute top-0 bg-white p-2 border border-slate-200
					${renderProfesionalSelector ? '' : 'hidden'}`}>
					<div
						onClick={() => handleProfesionalSelect('Yolanda Garcia')} 
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<span className='w-4 h-4 rounded-full bg-slate-300 mr-2'/>
						<p className='text-sm font-light'>Yolanda Garcia</p>
					</div>
					<div
						onClick={() => handleProfesionalSelect('Marc Vergés')}  
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<span className='w-4 h-4 rounded-full bg-slate-300 mr-2'/>
						<p className='text-sm font-light'>Marc Vergés</p>
					</div>
					<div
						onClick={() => handleProfesionalSelect('Carlos Gonzalez')}  
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<span className='w-4 h-4 rounded-full bg-slate-300 mr-2'/>
						<p className='text-sm font-light'>Carlos Gonzalez</p>
					</div>
					<div
						onClick={() => handleProfesionalSelect('Cristina Bellido')}  
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<span className='w-4 h-4 rounded-full bg-slate-300 mr-2'/>
						<p className='text-sm font-light'>Cristina Bellido</p>
					</div>
				</div>
			</div>
			<div className='relative w-1/12 flex flex-row items-center justify-center '>
				<div onClick={() => setRenderProductSelector(true)}>
					{
						product ? 
						<div className='flex flex-row items-centercursor-pointer'>
							<p className='text-sm font-light'>{product == 1 ? 'Primera' : 'Seguimiento'}</p>
						</div>
						: <p className='text-slate-400 text-sm font-light'>Tipo visita</p>

					}
				</div>
				<div className={`absolute top-0 bg-white p-2 border border-slate-200
					${renderProductSelector ? '' : 'hidden'}`}>
					<div
						onClick={() => handleProductSelect(1)} 
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<p className='text-sm font-light'>Primera Visita (120€)</p>
					</div>
					<div
						onClick={() => handleProductSelect(2)}  
						className='flex flex-row items-center p-2 hover:bg-slate-100 cursor-pointer'>
						<p className='text-sm font-light'>Visita de seguimiento (80€)</p>
					</div>
				</div>
			</div>
			<div className='w-1/12 flex flex-row items-center justify-center '>
				
				<div onClick={() => setRenderCalendar(true)}>
					{
						dateValue ? 
						<div className='flex flex-row items-centercursor-pointer'>
							<p className='text-sm font-light'>{dateValue.toLocaleString().slice(0,10)}</p>
						</div>
						: <p className='text-slate-400 text-sm font-light'>Añade día</p>

					}
				</div>
				<div className={`absolute top-0 bg-white p-2 border border-slate-200
					${renderCalendar ? '' : 'hidden'}`}>
					<CalendarWidget 
						value={dateValue}
						onChange={handleCalendarSelect}
					/>
				</div>
			</div>
			<div className='w-1/12 flex flex-col items-center justify-center '>
				<input 
					type="text" 
					name="time"
					value={time as string}
					placeholder={`Añade hora`}
					className="text-center w-11/12 flex items-center justify-center placeholder:pl-2 placeholder:text-slate-400 text-sm font-light placeholder:font-light focus:outline-none" 
					onChange={(e) => setTime(e.target.value)}
					>
				</input>
			</div>
			<div className='w-1/12 flex items-center justify-center '>
				<p className='font-light text-sm'></p>
			</div>
			<div className='w-1/12  flex flex-row items-center justify-center '>
				<p className='font-light text-sm '></p>
			</div>
			<div className='w-1/12  flex flex-row items-center justify-center '>
				<p className='font-light text-sm '></p>
			</div>
			<div className='w-1/12  flex flex-row items-center justify-center p-2'>
				<button
					onClick={handleCreateCheckoutSession} 
					className='w-full h-full rounded-lg shadow-emerald-400 shadow-sm bg-green-200 hover:bg-green-300 cursor-pointer flex items-center justify-center'>
					<p className=' text-slate-800 text-sm font-light'>Crear</p>
				</button>
			</div>
		</div>
	)
}

export default CreateCheckoutForm
