import {mount, ReactWrapper} from 'enzyme';
import React from 'react';
import {SupplierList} from './SupplierList';


describe("SupplierList component", () => {

    let wrapper: ReactWrapper;
    const suppliers = [
        {
            address: "407 Little Street, Norris, Missouri, 3313",
            average_transaction_amount: "1216.6149",
            average_transaction_amount_normalized: 121661,
            categories: ["AIRLINES"],
            id: "5d48260aa86783fd68f531d3",
            isActive: false,
            logo_url: "https://logo.clearbit.com/carrefour.com",
            name: "CARREFOUR",
            phone: "+1 (997) 445-2391",
            rank: 0
        },
        {
            address: "409 Rose Street, Warren, Maine, 2241",
            average_transaction_amount: "2669.1797",
            average_transaction_amount_normalized: 266918,
            categories: ["MEALS"],
            id: "5d48260a0af5155a05ac5e8f",
            isActive: true,
            logo_url: "https://logo.clearbit.com/apple.com",
            name: "APPLE",
            phone: "+1 (821) 505-2921",
            rank: 1},
        {
            address: "565 Havemeyer Street, Mapletown, Palau, 4934",
            average_transaction_amount: "1968.2616",
            average_transaction_amount_normalized: 196826,
            categories: null,
            id: "5d48260a6b8700d05ba014d4",
            isActive: true,
            logo_url: "https://logo.clearbit.com/easyjet.com",
            name: "EASYJET",
            phone: "+1 (922) 439-2608",
            rank: 2,
        },
        {
            address: "549 Ferris Street, Broadlands, Washington, 6147",
            average_transaction_amount: "2403.0311",
            average_transaction_amount_normalized: 240303,
            categories: ["COMMUTER", "GOVERNMENT SERVICES", null],
            id: "5d48260ac93bafa367c5b197",
            isActive: true,
            logo_url: "https://logo.clearbit.com/uber.com",
            name: "UBER",
            phone: "+1 (989) 496-2407",
            rank: 3,
        }
    ];

    beforeEach(() => {
        // suppliers = suppliers
        wrapper = mount(<SupplierList data={suppliers}/>);

    });


    it('renders without crashing', () => {
        expect(wrapper).toBeTruthy()
    });


    it('should render 4 supplier list items', () => {
        expect(wrapper.find('.MuiListItem-container').length).toEqual(4)
    });

});

