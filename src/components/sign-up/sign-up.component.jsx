
import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
        <div>
        <h1>Sign Up with e-mail and password</h1>
        <form onSubmit={handleSubmit}>
            <label>Dispaly name</label>
            <input type = 'text' required onChange={handleChange} name = 'displayName' value={displayName}/>

            <label>Email</label>
            <input type = 'email' required onChange={handleChange} name = 'email' value={email}/>

            <label>Password</label>
            <input type = 'password' required onChange={handleChange} name = 'password' value={password}/>

            <label>Confirm Password</label>
            <input type = 'password' required onChange={handleChange} name = 'confirmPassword' value={confirmPassword}/>

            <button type= 'submit'>Sign Up</button>
        </form>
        </div>
    );
};
export default SignUp;