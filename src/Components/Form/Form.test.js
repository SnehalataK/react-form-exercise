import React from 'react';
import Enzyme,{shallow, mount} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Form from './index';

Enzyme.configure({adapter: new EnzymeAdapter()});

/**
 * Factory function to create a ShallowWrapper for the Form component.
 * @function setUp
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
*/
const setUp = (props={},state=null)=>{
  const shallowWrapper = shallow(<Form {...props}/>);

  if(state){
    shallowWrapper.setState(state)
  }

  return shallowWrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test-attr value.
 * @param {ShallowWrapper} shallowWrapper - Enzyme shallow wrapper to search within.
 * @param {string} attrVal - Value of data-test-attr attribute for search.
 * @returns {ShallowWrapper}
 */

const elementSelector = (shallowWrapper, attrVal)=>{
  const appElement = shallowWrapper.find(`[data-test-attr='${attrVal}']`);
  return appElement;
}

test('form renders all children properly', ()=>{
    const shallowWrapper = setUp();

    expect(shallowWrapper.children().length).toBe(9);
})

test('Title Code is selected', ()=>{
    const shallowWrapper = setUp();
    const titleCodeElement = elementSelector(shallowWrapper,"title-code");

    expect(titleCodeElement.hasClass('Error')).toBe(false);
})

test('First name is not empty',()=>{
    const shallowWrapper = setUp();
    const firstNameElement = elementSelector(shallowWrapper,"first-name");

    expect(firstNameElement.hasClass('Error')).toBe(false);
})

test('Mobile number is not empty',()=>{
    const shallowWrapper = setUp();
    const mobileNumElement = elementSelector(shallowWrapper,"mobile-number");

    expect(mobileNumElement.hasClass('Error')).toBe(false);
})

test('Nationality is not selected or value is not Select',()=>{
    const shallowWrapper = setUp();
    const nationalityElement = elementSelector(shallowWrapper,"nationality");

    expect(nationalityElement.hasClass('Error')).toBe(false);
})

test('birthDate is not selected',()=>{
    const shallowWrapper = setUp();
    const birthDateElement = elementSelector(shallowWrapper,"birth-date");

    expect(birthDateElement.hasClass('Error')).toBe(false);
})

test('address is not filled',()=>{
    const shallowWrapper = setUp();
    const addressElement = elementSelector(shallowWrapper,"address");

    expect(addressElement.hasClass('Error')).toBe(false);
})

test('address duration is not filled',()=>{
    const shallowWrapper = setUp();
    const addressDurationElement = elementSelector(shallowWrapper,"address-duration");

    expect(addressDurationElement.hasClass('Error')).toBe(false);
})

test('marital status is not selected',()=>{
    const shallowWrapper = setUp();
    const maritalStatusElement = elementSelector(shallowWrapper,"marital-status");

    expect(maritalStatusElement.hasClass('Error')).toBe(false);
});