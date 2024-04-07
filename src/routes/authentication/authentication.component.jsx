import { FirebaseError } from "firebase/app";

import SignUp from '../../components/sign-up/sign-up.component';
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.style.scss'

const Authentication = () => {


    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUp />
        </div>
    );
};

export default Authentication;