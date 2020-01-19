import React from 'react';


const Select = (props)=>{
    const {options, name, onChangeHandler, placeholderText}= props;
    return(
        <select 
        name={name} 
        value={placeholderText}
        onChange={(e)=>onChangeHandler(e.target.value, name)}>
            {options.map((option)=>{
                return(
                    <option key={`${option}`} value={option} disabled={option === "Select"? true: false}>{option}</option>
                )
            })}
        </select>
    )
}

export default Select;