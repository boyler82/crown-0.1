import './form-input.style.scss';

const FormInput = ({ lable, ...otherProps}) => {
    return (
        <div className = 'group'p>
        <input className = "form-input" {...otherProps}/>
        { lable && (
            <label 
            className= {`${
                otherProps.value.lenght ? 'shrink' : '' 
            } form-input-label`}
            >{lable}
            </label>
        )}
        </div>
    );
};

export default FormInput;

