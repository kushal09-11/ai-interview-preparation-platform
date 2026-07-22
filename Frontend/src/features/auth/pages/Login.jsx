import React, { useState } from 'react';
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

    const navigate = useNavigate()
    const {loading, handleLogin} = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [authError, setAuthError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAuthError("")
        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (err) {
            setAuthError(err?.message || "Invalid email or password")
        }
    }

    if(loading){
        return (<main><h1>Loading.....</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e)=> { setEmail(e.target.value); setAuthError("") }}
                            type="email" id="email" name='email' placeholder='Enter email address' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-field">
                            <input
                                onChange={(e)=> { setPassword(e.target.value); setAuthError("") }}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name='password'
                                placeholder='Enter password' />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((current) => !current)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                            >
                                {showPassword ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M3 3l18 18" />
                                        <path d="M10.58 10.58A2 2 0 1 0 13.42 13.42" />
                                        <path d="M9.88 5.09A10.94 10.94 0 0 1 12 5c5 0 9.27 3.11 11 7-1.17 2.62-3.12 4.8-5.58 6.09" />
                                        <path d="M6.61 6.61C4.53 7.92 2.89 9.87 2 12c1.73 3.89 6 7 10 7a10.95 10.95 0 0 0 4.74-1.06" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {authError ? <p className="form-error" role="alert">{authError}</p> : null}
                    </div>
                    <button className="button primary-button" >Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
            </div>
        </main>
    )
}

export default Login;