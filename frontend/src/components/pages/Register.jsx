import React from 'react';
import "./loginpage.css";
import { Link } from 'react-router-dom'

export default function Register() {


    return (
        <div className="x2-bg-x2-img">
            <div className='flex h-24 justify-between items-center mx-10'>
                <img className='w-48' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
                <Link to="/login">
                    <button className="bg-red-600 w-24 h-9 text-white text-lg rounded-md" >Sign in</button>
                </Link>
            </div>
            <div className='flex flex-col items-center my-36 w-full'>
                <div className='text-white flex flex-col items-center space-y-5'>
                    <h1 className='text-6xl font-bold'>Unlimited Movies, TV Shows, and More.</h1>
                    <h2 className='text-4xl font-semibold'>Watch anywhere, Cancel anytime</h2>
                    <p className='text-2xl'>Ready to watch ? Enter your email to create and restart your membership.</p>
                </div>

                <div className='flex my-5 justify-between items-center text-xl'>
                    <Link to="/signup">
                        <button className='bg-red-600 text-white h-12 w-36 px-3'>Get started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
