import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {BaseDialog} from './BaseDialog';


describe("BaseDialog component", () => {

    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<BaseDialog/>);

    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });

});
