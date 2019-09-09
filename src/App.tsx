import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';

import useAppState, {
    AppState,
    selectAllOrFilteredSuppliers,
    selectFilterQuery,
    selectTotalSuppliers,
    suppliersIsFiltering
} from './state/useAppState';

import {SupplierList} from './components/SupplierList/SupplierList';
import {Supplier} from './models/Supplier';
import {FilterField} from './components/FilterField/FilterField';
import {BaseDialog} from './components/BaseDialog/BaseDialog';
import {SupplierDetailsForm} from './components/SupplierDetailsForm/SupplierDetailsForm';
import {fetchSuppliers} from './api/suppliersApi';


const App: React.FC = () => {

    const {state, actions} = useAppState();
    const suppliers = selectAllOrFilteredSuppliers(state);
    const totalSuppliers = selectTotalSuppliers(state);
    const filterQuery = selectFilterQuery(state);
    const isFiltering = suppliersIsFiltering(state);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState<Supplier | undefined>();
    const [snackbarState, setSnackbarState] = useState({isOpen: false, message: ''});

    const supplierBankDetailsClickHandler = (supplier: Supplier) => {
        setCurrentSupplier(supplier);
        setDialogIsOpen(true);
    };

    const dialogCloseHandler = () => {
        setDialogIsOpen(false);
        setCurrentSupplier(undefined);
    };

    const snackbarCloseHandler = () => {
        setSnackbarState({
            message: '',
            isOpen: false
        });
    };

    const supplierSaveHandler = (supplier: Supplier) => {
        actions.updateOne(
            supplier.id,
            {bankDetails: supplier.bankDetails}
        );
        dialogCloseHandler();
        setSnackbarState({
            isOpen: true,
            message: `${supplier.name}'s bank details successfully updated!`
        })
    };


    useEffect(() =>  {
        const persistedState = localStorage.getItem('appState');

        if(persistedState) {
            const hydratedState = JSON.parse(persistedState) as AppState;
            actions.hydrateState(hydratedState);
        }

        fetchSuppliers()
            .then(actions.upsertMany)
            .catch(_ => setSnackbarState({isOpen: true, message: "Error: couldn't load suppliers"}));

    }, []);

    useEffect(() => {
        if(state.ids.length > 0) {
            localStorage.setItem('appState', JSON.stringify({...state, filter: ''}))
        }
    }, [currentSupplier]);

    return (
        <Container maxWidth="md">

            <Box mt={5}>

                <Typography variant="h3" gutterBottom>
                    Suppliers
                    ({isFiltering ? `Filtered: ${suppliers.length}/${totalSuppliers}` : totalSuppliers}):
                </Typography>

                <FilterField
                    data={filterQuery}
                    changeHandler={actions.filterSuppliers}
                />

            </Box>

            <Box my={6} style={{marginBottom: 0, marginTop: '5px'}}>

                <SupplierList
                    detailsClickHandler={supplierBankDetailsClickHandler}
                    data={suppliers}
                />

            </Box>

            {currentSupplier ?
                <BaseDialog
                    isOpen={dialogIsOpen}
                    title={currentSupplier.name}
                    closeHandler={dialogCloseHandler}
                >
                    <SupplierDetailsForm
                        data={currentSupplier}
                        cancelHandler={dialogCloseHandler}
                        saveHandler={supplierSaveHandler}
                    />
                </BaseDialog> : null
            }

            { snackbarState.isOpen ?
                <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    open={snackbarState.isOpen}
                    autoHideDuration={3000}
                    onClose={snackbarCloseHandler}
                    message={<span>{snackbarState.message}</span>}
                />: null
            }
        </Container>
    );
};

export default App;
