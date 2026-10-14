import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../Pages/CSS/Login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [user, setUser] = useState([])
    const [email, setemail] = useState("")
    const [step, setStep] = useState(1)
    const [otp, setotp] = useState()
    const navigate = useNavigate()

    const fetchData = async () => {
        const res = await axios.get("/Data/Users.json")
        console.log(res.data)
        setUser(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])



    const sendOtp = async () => {
        let existingUser = user.find((u) => u?.email == email)
        console.log(existingUser);

        if (email == existingUser?.email) {
            setStep(2)
        } else {
            toast.warn("user not find")
        }
    }

    const veryfyOtp = () => {
        let existingUser = user.find((u) => u?.email == email)
        console.log(existingUser);

        console.log(existingUser?.otp);
        console.log(existingUser?.role);

        if (existingUser.otp == otp) {
            localStorage.setItem("token", existingUser.token)
            localStorage.setItem("role", existingUser.role)

            toast.success('Login Succesfully');



            navigate('/dashboard')
        } else {
            toast.error('Invalid Input OTP')

        }
    }

    return (
        <>
            <div className="login-page-outer">

                <div className="login-outer">

                    <h1>Login Here</h1>

                    <div className="email-box">

                        <input type="text" placeholder='Enter Email' onChange={(e) => setemail(e.target.value)} /> <br /><br />
                    </div>
                    {
                        step == 2 ?
                            <div className='otp-box'>
                                <input type="text" placeholder='Enter OTP' onChange={(e) => setotp(e.target.value)} /> <br /><br />
                            </div> : ""

                    }

                    {
                        step == 2 ? <button onClick={veryfyOtp}>Veryfy OTP</button> : <button onClick={sendOtp}>Send OTP</button>
                    }

                </div>

            </div>

        </>
    )
}

export default Login