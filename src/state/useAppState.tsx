import {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {createEntityAdapter, EntityState, Update} from 'redux-ngrx-entity';
import {Supplier} from '../models/Supplier';
import {getAllOrFilteredSuppliers, normalizeSupplier} from '../helpers/suppliers.helpers';

/*
EntityState<T> shape looks like the following:

{
  ids: Array<number | string>,
  entities: { [id: number | string]: T},
}

- ids:
  is an array of IDs, used for sorting and ordering the records

- entities:
  is an un-ordered key-value Dictionary, allows fast lookup of records by their IDs,
  instead of iterating/filtering over an array of records
*/
export interface AppState extends EntityState<Supplier>{
    filter?: string // for filtering suppliers by name
}

/* NGRX Entity Adapter (this is a stand alone version of the package)
   Helps managing/selecting records and performing CRUD operations in an efficient and immutable manner
   More info: https://ngrx.io/guide/entity/adapter */
const suppliersEntityAdapter = createEntityAdapter<Supplier>({
    selectId: (s) => s.id, // point to an identifier key
    sortComparer: (a, b) => a.rank - b.rank // sort entities by rank by default
});

const useAppState = () => {
    const initState: AppState = suppliersEntityAdapter.getInitialState({
        filter: ''
    });

    const [state, setState] = useState(initState);
    const actions = useMemo(() => getActions(setState), [setState]);

    return { state, actions }
};

const getActions = (setState: Dispatch<SetStateAction<AppState>>) => ({
    addAll: (suppliers: Supplier[]) =>
        setState(state => suppliersEntityAdapter.addAll(suppliers.map(normalizeSupplier), state)),

    upsertOne: (supplier: Supplier) =>
        setState(state => suppliersEntityAdapter.upsertOne(supplier, state)),

    updateOne: (id: string, changes: Partial<Supplier>) =>
        setState( state =>  suppliersEntityAdapter.updateOne({id, changes}, state)),

    removeOne: (id: string) =>
        setState(state => suppliersEntityAdapter.removeOne(id, state)),

    removeAll: () =>
        setState(state => suppliersEntityAdapter.removeAll(state)),

    updateSuppliers: (updates: Update<Supplier>[]) => {
        setState(state => suppliersEntityAdapter.updateMany(updates, state))
    },

    filterSuppliers: (q?: string) =>
        setState( state => ({...state, filter: q}))
});


// State selectors

export const selectAllOrFilteredSuppliers = (state: AppState) =>
    getAllOrFilteredSuppliers(state.filter!)(selectAllSuppliers(state));

export const selectFilterQuery = (state: AppState) => state.filter;

export const suppliersIsFiltering = (state: AppState) => !!(state.filter && state.filter.length);

export const {
    selectAll: selectAllSuppliers,
    selectTotal: selectTotalSuppliers
} = suppliersEntityAdapter.getSelectors();

export default useAppState;
