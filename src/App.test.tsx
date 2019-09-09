import React from 'react';
import App from './App';
import {mount, ReactWrapper} from 'enzyme';
import {Supplier} from './models/Supplier';


describe("<App>", () => {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        // suppliers = suppliers
        wrapper = mount(<App/>);

    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });

    it('should display header text', () => {
        expect(wrapper.find('h3').html()).toMatch(/suppliers/i)
    });

});
