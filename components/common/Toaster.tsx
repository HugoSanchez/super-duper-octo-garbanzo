import React, {useEffect, useContext} from 'react';


export const Toaster = (props: any) => { 
    

    if (props.renderToaster) {
        return (
            <div className='z-50 fixed top-4 right-0 lg:top-5 lg:right-2 w-screen lg:max-w-xs px-4 mb-4'>
                <div id="toast-success" className={`${props.renderToaster ? 'z-50' : 'z-0'} flex flex-row items-center px-3 w-36 h-14 rounded-md bg-white shadow` +
                    (props.renderToaster
                    ? " transition-opacity opacity-100 translate-y-0 transform duration-700"
                    : " transition-all delay-100 opacity-0 translate-y-full") }role="alert">
    
                    {
                        props.toasterSuccess || true ?
                        <div className={"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-md bg-emerald-100"} >
                            <svg aria-hidden="true" className="w-5 h-5" fill="#0f766e" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        :
                        <div className={"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-rose100"} >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9f1239" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>                        
                            <span className="sr-only">Alert icon</span>
                        </div>
                    }
                    
                    <div className="ml-3 text-sm font-italic text-zinc700">
                        {
                            props.toasterSuccess || true 
                            ? <p className='text-sm lg:font-light text-black'>{props.toasterMessage}</p>
                            : <p className='text-sm lg:font-light text-black'>Sorry, something went wrong.</p>
    
                        }
                    </div>
                </div>
            </div>   
        )
    }

    return (
        <div>

        </div>
    );
};






