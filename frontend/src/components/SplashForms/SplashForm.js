import SignupForm from "../SessionForms/SignupForm";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import "./SplashForm.css"


export default function SpashForm(props){
    const [onSignup, setOnSignUp] = useState(false)
    return (
        <div id="splashform-main">
            <h1 className="title-header">LemonChord</h1>
            { onSignup ? <LoginForm/> : <SignupForm/>}
            <h3>or</h3>
            <div id="signup-activate"
                onClick={()=>setOnSignUp(!onSignup)}
            >
                {onSignup ?<h2> Sign Up</h2> : <h2>Sign In</h2>}
            </div>
        </div>
    )
}