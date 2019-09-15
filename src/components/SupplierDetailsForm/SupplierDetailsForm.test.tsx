import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {SupplierDetailsForm} from './SupplierDetailsForm';
import {Supplier} from '../../models/Supplier';


describe("SupplierDetailsForm component", () => {

    let wrapper: ReactWrapper;

    const supplier: Supplier = {
        address: "407 Little Street, Norris, Missouri, 3313",
        average_transaction_amount: "1216.6149",
        average_transaction_amount_normalized: 121661,
        categories: ["AIRLINES"],
        id: "5d48260aa86783fd68f531d3",
        isActive: false,
        logo_url: "https://logo.clearbit.com/carrefour.com",
        name: "CARREFOUR",
        phone: "+1 (997) 445-2391",
        rank: 0,
        bankDetails: {
            bicSwift: 'bic',
            iban: 'iban'
        }
    };

    beforeEach(() => {
        wrapper = mount(<SupplierDetailsForm data={supplier}/>);
    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });


    it('should initililize with a vlaue', () => {
        wrapper = mount(<SupplierDetailsForm data={supplier}/>);
        expect(wrapper.find('.iban-text-field').find('input').prop('value')).toEqual(supplier.bankDetails!.iban);
        expect(wrapper.find('.bic-text-field').find('input').prop('value')).toEqual(supplier.bankDetails!.bicSwift);
    });

});
