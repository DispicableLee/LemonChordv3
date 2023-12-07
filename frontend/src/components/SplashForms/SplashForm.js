import SignupForm from "../SessionForms/SignupForm";
import LoginForm from "../SessionForms/LoginForm";
import { useState } from "react";
import "./SplashForm.css"


export default function SpashForm(props){
    return (
        <div id="splashform-main">
            <h1 className="title-header">LemonChord</h1>
            <LoginForm/>
            {/* <SignupForm/> */}
            <h3>or</h3>
            <div id="signup-activate">
                <h2>Sign Up</h2>
            </div>
        </div>
    )
}