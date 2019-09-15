import {mount, ReactWrapper, shallow} from 'enzyme';
import React from 'react';
import {FilterField} from './FilterField';


describe("FilterField component", () => {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<FilterField/>);
    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });

    it('should initililize with a vlaue', () => {
        const val = 'some value';

        wrapper = mount(<FilterField data={val}/>);

        expect(wrapper.find('input').prop('value')).toEqual(val);
    });

});
