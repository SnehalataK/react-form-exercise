import React from 'react';

const Button = (props)=>{
    const {type, label} = props;

    return(
        <button type={type}>{label}</button>
    )
}
export default Button;