import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {CategoryChip} from './CategoryChip';


describe("CategoryChip component", () => {

    let wrapper: ReactWrapper;
    const category = 'some category';

    beforeEach(() => {
        // suppliers = suppliers
        wrapper = mount(<CategoryChip data={category} />);

    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });

    it('should display the category name', function () {
        expect(wrapper.find('.MuiChip-label').text()).toEqual(category)
    });

});
