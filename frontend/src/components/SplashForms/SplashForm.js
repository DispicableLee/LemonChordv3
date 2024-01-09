import SignupForm from "../SessionForms/SignupForm";
import LoginForm from "../SessionForms/LoginForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./SplashForm.css"


export default function SpashForm(props){
    const [onSignup, setOnSignUp] = useState(false)
    const isLight = useSelector(store=> store?.session?.isLight)
    console.log(isLight)
    return (
        <div id="splashform-main">
            <h1 className="title-header">LemonChord</h1>
            { onSignup ? <LoginForm/> : <SignupForm/>}
            <h3>or</h3>
            <div id="signup-activate"
                className = {isLight === true ? '' : 'dark-mode'}
                onClick={()=>setOnSignUp(!onSignup)}
            >
                {onSignup ?<h2> Sign Up</h2> : <h2>Sign In</h2>}
            </div>
        </div>
    )
}