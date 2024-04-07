
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up.style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUp = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password do not mach');
            return;
        };
// error handling problem !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            console.error('Error in user creation: ', error);
            if (error.code === "auth/email-already-in-use") {
                alert('Cannot create account, email already in use.');
            } else {
                alert('An error occurred during account creation.');
            }
        }
            };

            const handleChange = (event) => {
                const {name, value} = event.target;

                setFormFields({...formFields, [name]: value })
            };

    
    return (
        <div className="sign-up-container">
        <h2> Don't have an account? </h2>
        <span>Sign Up with e-mail and password</span>
        <form onSubmit={handleSubmit}>

          
            <FormInput
            lable = 'Display Name'
            type = 'text' 
            required 
            onChange={handleChange} 
            name = 'displayName' 
            value={displayName}
            />

            <FormInput 
            lable= 'Email'
            type = 'email' 
            required 
            onChange={handleChange} 
            name = 'email' 
            value={email}
            />

            <FormInput
            lable= 'Password'
            type = 'password' 
            required 
            onChange={handleChange} 
            name = 'password' 
            value={password}
            />

            <FormInput
            lable= 'Confirm Password'
            type = 'password' 
            required 
            onChange={handleChange} 
            name = 'confirmPassword' 
            value={confirmPassword}
            />
            <Button type= 'submit'>Sign Up</Button>
        </form>
        </div>
    );
};
export default SignUp;