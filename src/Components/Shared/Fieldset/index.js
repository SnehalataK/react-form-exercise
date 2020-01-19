import React from 'react';


const CustomRadioButton = (props)=>{
    const {className, title} = props;
    return(
        <div className={`fieldset ${className}`}>
            <legend>{title}</legend>
            {props.children}
        </div>
    )
}

export default CustomRadioButton;