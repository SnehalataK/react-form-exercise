import React from 'react';
import Enzyme,{shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './index';
import Form from '../Form/';

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

test('renders without crashing', () => {
  //create a ShallowWrapper for the App component.
  const shallowWrapper = shallow(<App/>);

  expect(shallowWrapper).toBeTruthy();
});

test('renders Header element',()=>{
  const shallowWrapper = setUp();
  const headerElement = elementSelector(shallowWrapper,"header-elem");

  expect(headerElement).toBeTruthy();
});

test('renders Form element',()=>{
  const shallowWrapper = setUp();
  const formComponent = elementSelector(shallowWrapper,"form-elem");

  expect(formComponent).toBeTruthy();
})
