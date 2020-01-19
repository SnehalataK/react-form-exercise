import React from 'react';


const Input = (props)=>{
    const{type, onChangeHandler, name, value, min, max} = props;

    return (
        <input 
        type={type}
        name={name}
        value={value}
        min={min} 
        max={max}
        onChange={(e)=>{onChangeHandler(e.target.value, e.target.name)}}
        />
    )
}

export default Input;