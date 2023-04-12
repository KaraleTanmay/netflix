import React from 'react'

export default function Error(props) {
    return (
        <div className="x2-bg-x2-img">
            <div className='flex h-24 justify-start items-center mx-10'>
                <img className='w-48' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
            </div>
            <div className='flex flex-col items-center justify-center my-28 w-1/3 m-auto bg-main rounded-lg h-40'>
                <div className='text-white text-center w-3/5 h-2/3'>
                    {props.text}
                </div>
            </div>
        </div>
    )
}
