import "./loginpage.css"
import { Link } from 'react-router-dom'
import { useRef } from "react"
import axios from "axios"

export default function Login(props) {

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleLogIn = async (submit) => {
        submit.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        try {
            const res = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/v1/users/login",
                data: {
                    email,
                    password
                }
            })
            props.login(res.data.user)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="x2-bg-x2-img">
            <div className='flex h-24 justify-start items-center mx-10'>
                <img className='w-48' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
            </div>
            <div className='flex flex-col items-center my-28 w-1/3 m-auto bg-main rounded-lg'>
                <div className='text-red-600 flex flex-col items-center my-10'>
                    <h1 className='text-6xl font-bold'>Log in</h1>
                </div>
                <form className='flex flex-col space-y-5 text-xl items-center' onSubmit={handleLogIn}>
                    <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" type="email" placeholder='email@gmail.com' ref={emailRef} />
                    <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" type="password " placeholder='xxxxxxxx' ref={passwordRef} />
                    <button className='bg-red-600 text-white w-32 h-10 rounded-md'>Log in</button>

                    <div className="flex flex-col text-white items-center my-5">
                        <span>New to Netflix ?</span>
                        <Link to="/signup">
                            <button className="text-red-600 cursor-pointer">Sign up</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
