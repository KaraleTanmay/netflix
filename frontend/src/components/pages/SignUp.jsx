import "./loginpage.css"
import { Link } from 'react-router-dom'
import { useRef, useState } from "react"
import axios from "axios";
import Error from "./Error";

export default function SignUp(props) {

    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [page, setPage] = useState("signup");
    const [error, setError] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault()
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const passwordConfirm = passwordConfirmRef.current.value;
        try {
            const res = await axios({
                method: "POST",
                url: "http://127.0.0.1:8000/api/v1/users/signup",
                data: {
                    username, email, password, passwordConfirm
                }
            })
            props.signup(res.data.user);
        } catch (error) {
            setPage("error")
            setError(error.response.data.message)
        }
    }

    return (
        <>
            {page === "error" ? <Error text={error} /> :
                <div className="x2-bg-x2-img">
                    <div className='flex h-24 justify-start items-center mx-10'>
                        <img className='w-48' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png" alt="logo" />
                    </div>
                    <div className='flex flex-col items-center my-10 w-1/3 m-auto bg-main rounded-lg'>
                        <div className='text-red-600 flex flex-col items-center my-10'>
                            <h1 className='text-6xl font-bold'>Sign Up</h1>
                        </div>
                        <form className='flex flex-col space-y-5 text-xl items-center'>
                            <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" name="email" type="email" placeholder='enter your email' ref={emailRef} />
                            <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" name="username" placeholder='enter your username' ref={usernameRef} />
                            <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" name="password" type="password " placeholder='enter password' ref={passwordRef} />
                            <input className="h-10 w-[400px] px-3 rounded-sm bg-slate-500 text-white" name="passwordConfirm" type="password " placeholder='confirm password' ref={passwordConfirmRef} />
                            <button className='bg-red-600 text-white w-32 h-10 rounded-md' onClick={handleSignUp}>sign Up</button>
                        </form>
                        <div className="flex flex-col text-white items-center my-5">
                            <span>already a user ?</span>
                            <Link to="/login">
                                <span className="text-red-600 cursor-pointer">Log in</span>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}