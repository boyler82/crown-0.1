
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth ,
    signInAuthUserWithEmailAndPassword ,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.style.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert ('incorect password')
                    break
                case 'auth/invalid-credential':
                    alert ('no user')
                    break
                default:
                    console.log(error);
            }     
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value })
    };

    
    return (
        <div className="sign-up-container">
        <h2> Already have an account? </h2>
        <span>Sign in with e-mail and password</span>
        <form onSubmit={handleSubmit}>

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
            
            <div className="buttons-container">
                <Button type= 'submit'>Sign in</Button>
                <Button type = 'button' onClick ={signInWithGoogle}  buttonType= 'google' >Google sign In</Button>
            </div>

        </form>
        </div>
    );
};
export default SignInForm;