import React, {Component} from 'react';

import Fieldset from '../Shared/Fieldset/';
import Input from '../Shared/Input/';
import CustomRadioButton from '../Shared/CustomRadioButton/';
import Select  from '../Shared/Select/';
import Button from '../Shared/Button/';

import './Form.css';

class Form extends Component {
    constructor(props){
        super(props);

        this.state= {
            titleCode:'',
            maritalStatus:'',
            firstName:'',
            mobileNum:'',
            nationality:'Select',
            birthDate:'',
            address:'',
            addressDuration:'',
            invalidForm: false
        }

        this.invalidFieldsArr=[];
    }
    /**
     * update Form state on radio button click
     * @param   {string} option - selected value of radio button 
     * @param   {string} name   - name of radio button
    */
    radioClickHandler(option, name){
        const elemIndex = this.invalidFieldsArr.indexOf(name);
        this.invalidFieldsArr.splice(elemIndex,1);
        this.setState({
            [name]: option
        })
    }

    /**
     * return Form field's name & value  
     * @param   {string} formElem - current Form field 
     * @param   {string} childIndex   - position of the current field in Form childnode array
     * @returns {Object} {name,value} - current field's name & value in object
    */
    getElemData(formElem, childIndex){
        const {nodeName, name, value} =formElem.childNodes[childIndex].children[1] ;
        switch(nodeName){
            case "DIV": 
                return{
                    name: formElem.childNodes[childIndex].children[1].dataset["name"],
                    value:this.state[formElem.childNodes[childIndex].children[1].dataset["name"]]
                }
            case "INPUT":
                return{
                    name,
                    value
                }
            case "SELECT":
                return{
                    name,
                    value
                }
            default:;
        }
    }

    
    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();

        for(let i = 0; i< e.target.childNodes.length - 1;i++){
            let elem = this.getElemData(e.target, i);

            this.validForm = this.validateForm(elem.name,elem.value);
            if(!this.validForm){
                this.invalidFieldsArr = [...this.invalidFieldsArr, elem.name];
                this.setState({
                    invalidForm: true
                })
            }
        }

    }

    /**
     * return Boolean value for Form field value  
     * @param   {string} name - current Form field's name 
     * @param   {string} value - current Form field's value
     * @returns {Boolean} Boolean value- true if form field is valid else false
    */
    validateForm(name, value){
        switch(name){
            case 'firstName':
            case 'nationality':
                if(value && value.match(/^[a-zA-Z]+$/) && value !=="Select" ){
                    return true;
                }else{
                    return false
                }
            case 'mobileNum':
                if(value && value.match(/^(\+[0|[0-9]{1,5})[- ]?([7-9][0-9]{9})$/)){  
                    return true;
                }else{
                    return false
                }
            case 'birthDate':
                if(value && value.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)){
                    return true;
                }else{
                    return false
                }
            case 'titleCode':
            case 'maritalStatus':
                if(value){
                    return true
                }else{
                    return false
                }
            default: return false
        }
    }
    /**
     * update Form state on input/select field value change
     * @param   {string} data - selected value of Form field 
     * @param   {string} name   - name of Form field
    */
    onChangeHandler(data, name){
        const elemIndex = this.invalidFieldsArr.indexOf(name);
        this.invalidFieldsArr.splice(elemIndex,1);
        this.setState({
            [name]: data
        })
    }


    render(){  
        const {titleCode, maritalStatus,firstName,mobileNum,birthDate,address, addressDuration, nationality} = this.state
        
        return(<form onSubmit={(e)=>{this.handleSubmit(e)}} ref={this.myRef}>
                   <Fieldset title="Title Code" data-test-attr="title-code" className={`${this.invalidFieldsArr.includes('titleCode') ? "title-code Error" : "title-code" }`}>
                        <CustomRadioButton 
                        name="titleCode" 
                        selectedVal= {titleCode}
                        options={["MR.","MRS.","MISS"]} 
                        radioClickHandler={(option, name)=>{this.radioClickHandler(option, name)}}
                        />
                        {this.invalidFieldsArr.includes('titleCode') && !titleCode &&  <span className="error-msg">Required</span>}
                   </Fieldset>
                   <Fieldset title="First name" data-test-attr="first-name" className={`${this.invalidFieldsArr.includes('firstName') ? "Error" : "" }`}>
                       <Input 
                       type="text" 
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       name="firstName"
                       value={firstName}
                       />
                       {this.invalidFieldsArr.includes('firstName') && !firstName && <span  className="error-msg">Required</span>}
                       {this.invalidFieldsArr.includes('firstName') && firstName && <span  className="error-msg">Entered value is not valid</span>}
                   </Fieldset>
                   <Fieldset title="Mobile number" data-test-attr="mobile-number" className={`${this.invalidFieldsArr.includes('mobileNum') ? "Error" : "" }`}>
                       <Input 
                       type="tel" 
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       name="mobileNum"
                       value={mobileNum}
                       />
                       {this.invalidFieldsArr.includes('mobileNum') && !mobileNum && <span  className="error-msg">Required</span>}
                       {this.invalidFieldsArr.includes('mobileNum') && mobileNum && <span  className="error-msg">Entered value is not valid</span>}
                   </Fieldset>
                   <Fieldset title="Nationality" data-test-attr="nationality" className={`${this.invalidFieldsArr.includes('nationality') ? "Error" : "" }`}>
                       <Select 
                       placeholderText={nationality} 
                       options={["American","Indian","Select"]}
                       name="nationality"
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       />
                       {this.invalidFieldsArr.includes('nationality') && nationality ==="Select" && <span  className="error-msg">Required</span>}
                   </Fieldset> 
                   <Fieldset title="Birth date" data-test-attr="birth-date" className={`${this.invalidFieldsArr.includes('birthDate') ? "Error" : "" }`}>
                       <Input 
                       type="date" 
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       name="birthDate"
                       min="2000-01-01" 
                       max="2020-12-31"
                       value={birthDate}
                       />
                       {this.invalidFieldsArr.includes('birthDate') && !birthDate && <span  className="error-msg">Required</span>}
                   </Fieldset>
                   <Fieldset title="Address" data-test-attr="address" className={`${this.invalidFieldsArr.includes('address') ? "Error" : "" }`}>
                       <Input
                       type="text" 
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       name="address"
                       value={address}
                       />
                       {this.invalidFieldsArr.includes('address') && !address && <span  className="error-msg">Required</span>}
                       {this.invalidFieldsArr.includes('address') && address && <span  className="error-msg">Entered value is not valid</span>}
                   </Fieldset>
                   <Fieldset title="Address Stay duration" data-test-attr="address-duration" className={`${this.invalidFieldsArr.includes('addressDuration') ? "Error" : "" }`}>
                       <Input 
                       type="number" 
                       onChangeHandler={(data, name)=>{this.onChangeHandler(data, name)}}
                       name="addressDuration"
                       value={addressDuration}
                       />
                       {this.invalidFieldsArr.includes('addressDuration') && !addressDuration && <span  className="error-msg">Required</span>}
                       {this.invalidFieldsArr.includes('addressDuration') && addressDuration && <span  className="error-msg">Entered value is not valid</span>}
                   </Fieldset>
                   <Fieldset title="Marital Status" data-test-attr="marital-status" className={`${this.invalidFieldsArr.includes('maritalStatus') ? "marital-status Error" : "marital-status" }`}>
                        <CustomRadioButton 
                        options={["Single","Married"]}
                        name="maritalStatus" 
                        selectedVal= {maritalStatus}
                        radioClickHandler={(option, name)=>{this.radioClickHandler(option, name)}}
                        />
                        {this.invalidFieldsArr.includes('maritalStatus') && !maritalStatus && <span  className="error-msg">Required</span>}
                   </Fieldset>
                   <Fieldset title="" className="submit-btn">
                       <Button type="submit" label="Next"/>
                   </Fieldset>
                </form>
            )
    }
}

export default Form;
