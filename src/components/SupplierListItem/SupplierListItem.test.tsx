import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {SupplierListItem} from './SupplierListItem';
import {Supplier} from '../../models/Supplier';
import {normalizeSupplier} from '../../helpers/suppliers.helpers';
import * as Ezmoney from 'ezmoney';


describe("SupplierListItem component", () => {

    let wrapper: ReactWrapper;

    const supplier: Supplier = {
        address: "407 Little Street, Norris, Missouri, 3313",
        average_transaction_amount: "1216.6149",
        average_transaction_amount_normalized: 121661,
        categories: ["AIRLINES", "CAT"],
        id: "5d48260aa86783fd68f531d3",
        isActive: false,
        logo_url: "https://logo.clearbit.com/carrefour.com",
        name: "CARREFOUR",
        phone: "+1 (997) 445-2391",
        rank: 0
    };

    beforeEach(() => {
        wrapper = mount(<SupplierListItem data={normalizeSupplier(supplier)}/>);
    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });

    it('should render supplier title', () => {
        const supplierTitle = wrapper.find('.MuiTypography-body1').text();
        expect(supplierTitle).toMatch(new RegExp(supplier.name));
    });


    it('should render supplier avg transaction', () => {

        const avgTransactionLabel = wrapper.find('.avg-transaction').text();
        const avgTransactionFormatted = Ezmoney.format(
            {
                amount: supplier.average_transaction_amount_normalized!,
                precision: 2,
                currency: 'EUR'
            },
            'en-US'
        );

        expect(avgTransactionLabel).toMatch(new RegExp(avgTransactionFormatted));
    });

    it('should render supplier categories', () => {
        const categoryChips = wrapper.find('.MuiChip-label');
        expect(categoryChips.length).toEqual(supplier.categories!.length);
        supplier.categories!.map( (c, i) => expect(categoryChips.at(i).text()).toEqual(c))
    });

});
