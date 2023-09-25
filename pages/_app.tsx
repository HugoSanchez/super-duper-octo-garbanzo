import { useEffect, useState } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	const [renderToaster, setRenderToaster] = useState<boolean>(false)
    const [toasterMessage, setToasterMessage] = useState<string>('')

	useEffect(() => {
        setTimeout(
        () => closeToaster(),
            5000
    )}, [renderToaster])

	const closeToaster = () => {
        setRenderToaster(false)
        setToasterMessage('')
    }

 	return <Component 
				{...pageProps} 
				renderToaster={renderToaster}
				toasterMessage={toasterMessage}
				setToasterMessage={setToasterMessage}
				setRenderToaster={setRenderToaster}
			/>
}

export default MyApp
