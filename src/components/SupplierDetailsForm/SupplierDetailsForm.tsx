import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {isBic, isFrIban} from '../../helpers/suppliers.helpers';
import {BankDetails} from '../../models/BankDetails';
import {Supplier} from '../../models/Supplier';


// forms are hard :)

type FormErrors<T> = {
    [P in keyof T]?: string;
};

interface FormState {
    isValid: boolean,
    errors: FormErrors<BankDetails>,
    values: BankDetails
}

const validateForm = ({iban, bicSwift}: BankDetails) => {
    const errors: FormErrors<BankDetails> = {};

    if(!isFrIban(iban)) {
        errors.iban = 'IBAN is invalid';
    }

    if(!isBic(bicSwift)) {
        errors.bicSwift = 'BIC is invalid'
    }

    const isValid = Object.keys(errors).length === 0;

    return {isValid, errors};
};


export interface OwnProps {
    data: Supplier;
    saveHandler?: (supplier: Supplier) => void;
    cancelHandler?: () => void;
}

export const SupplierDetailsForm: React.FC<OwnProps> = ({data: supplier, saveHandler, cancelHandler}) => {

    supplier = Object.assign({}, supplier);

    const [formState, setFormState]= useState<FormState>({
        isValid: false,
        errors: {},
        values: supplier.bankDetails ?
            supplier.bankDetails :
            {iban: '', bicSwift: ''}

    });

    const handleChange = ({prop, value}: {prop: keyof BankDetails, value: string}) => {
        setFormState({
            ...formState,
            values: {
                ...formState.values,
                [prop]: value
            },
        });
    };

    useEffect(() =>
        setFormState({
            ...formState,
            ...validateForm(formState.values),
        }),
        [formState.values]
    );


    return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="stretch" flexDirection="column">

            <Box mb="15px" >

                <TextField
                    fullWidth
                    variant="outlined"
                    error={!!formState.errors.iban}
                    helperText={formState.errors.iban ? formState.errors.iban : null}
                    value={formState.values.iban}
                    id="iban-input"
                    label="IBAN:"
                    onChange={(e) => handleChange({prop: 'iban', value: e.target.value})}
                />

            </Box>

            <Box mb="15px">

                <TextField
                    fullWidth
                    variant="outlined"
                    error={!!formState.errors.bicSwift}
                    helperText={formState.errors.bicSwift ? formState.errors.bicSwift : null}
                    value={formState.values.bicSwift}
                    id="bic-input"
                    label="BIC/SWIFT:"
                    onChange={(e) => handleChange({prop: 'bicSwift', value: e.target.value})}
                />

            </Box>

            <Box my={"20px"} width="100%" display="flex" alignItems="center" justifyContent="flex-end">

                <Button
                    color="secondary"
                    onClick={() => cancelHandler ? cancelHandler() : null}
                >
                    Cancel
                </Button>

                <Button color="primary"
                        style={{marginLeft: "10px"}}
                        variant="contained"
                        disabled={!formState.isValid}
                        onClick={
                            () => saveHandler && formState.isValid ? saveHandler({
                                ...supplier,
                                bankDetails: formState.values
                            }) : null
                        }
                >
                    Save
                </Button>

            </Box>

        </Box>
    )
};
