import React, { useRef } from 'react';


const Input = ({searchWeather}) => {
    const inpRef = useRef();
    return (
        <div>
            <div className='max-w-[600px] mx-auto px-1 py-5 flex gap-2 items-center'>
            

                <input type="search" ref={inpRef} className='focus:outline-none border rounded p-2 w-[90%] shadow-xl' placeholder='Enter City Name' />
                <button onClick={
                    () => {
                        searchWeather(inpRef.current.value);
                    }
                } className='border rounded p-2 bg-white shadow-xl'>Search</button>
            </div>
        </div>
    );
}

export default Input;
