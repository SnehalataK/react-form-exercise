import React, {Component} from 'react';

class CustomRadioButton extends Component {
    /**
     * callback for Parent's radioClickHandler
     * @param   {string} option - current selected CustomRadioButton option
     * @param   {string} name- current CustomRadioButton name
    */
    optionClickHandler(option, name){
        this.props.radioClickHandler(option, name)
    } 

    /**
     * return CustomRadioButton options[childnodes] 
     * @param   {Array} options - array of options for CustomRadioButton
     * @param   {string} selectedVal - current selected CustomRadioButton option
     * @param   {string} name- current CustomRadioButton name
    */
    getChildren(options, selectedVal, name){
        return (options.map((option, index)=>{
                return(<div data-name={name} className={`${(selectedVal === option)? "radio-wrap selected": "radio-wrap"}`} key={`${option}-${index}`} onClick={(e)=>{this.optionClickHandler(option, name)}}>
                         <span className="radio-fill" >
                            {/* <span ></span> */}
                        </span>
                        <span className="title-wrap">{option}</span>
                    </div>  
                )
            })
        )
    }

    render(){
        const {options, name, selectedVal}= this.props;

        return( <>
            {this.getChildren(options, selectedVal, name)}
            </>
        )    
    }
} 
export default CustomRadioButton;