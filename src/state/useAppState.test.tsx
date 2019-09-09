import React from 'react';
import useAppState, {selectAllOrFilteredSuppliers} from './useAppState';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {normalizeSupplier} from '../helpers/suppliers.helpers';

describe('App state manager', () => {

  let actions;
  let state;
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
    const HookWrapper = () => {
      const {actions: a, state: s} = useAppState();
      actions = a;
      state = s;
      return null;
    };
    mount(<HookWrapper/>);
  });

  it('should populate suppliers', () => {
    expect(state.ids.length).toEqual(0);
    act(() => actions.addAll(suppliers));
    expect(state.ids.length).toEqual(4);
  });

  it('should normalize suppliers (addAll)', () => {
    act(() => actions.addAll(suppliers));
    expect(selectAllOrFilteredSuppliers(state)).toEqual(suppliers.map(normalizeSupplier));
  });


  it('should normalize suppliers (upsertMany)', () => {
    act(() => actions.upsertMany(suppliers));
    expect(selectAllOrFilteredSuppliers(state)).toEqual(suppliers.map(normalizeSupplier));
  });

  it('should filter suppliers', () => {
    act(() => actions.addAll(suppliers, state));
    act(() => actions.filterSuppliers('carREf'));
    expect(selectAllOrFilteredSuppliers(state).length).toEqual(1);
  });

  it('should update suppliers bankDetails', () => {
    const id = suppliers[0].id;
    const bankDetails = {
      iban: 'iban',
      bicSwift: 'bix swift'
    };
    act(() => actions.addAll(suppliers, state));
    act(() => actions.updateOne(id, {bankDetails}));

    const updatedSupplier = state.entities[id];
    expect(updatedSupplier.bankDetails).toEqual(bankDetails)
  });
});
