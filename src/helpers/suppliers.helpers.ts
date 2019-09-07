import {Supplier} from '../models/Supplier';
import {isValid as isValidIban} from 'iban';

export const isBic = (value: string) =>
    /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test( value.toUpperCase() );


export const isFrIban = (value: string) =>
    isValidIban(value) && /^fr.*/i.test(value);


// remove regex special characters from a string
export const escapeRegExp = (val: string) =>
    val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


export const byName =
    (name: string) =>
        (supplier: Supplier) =>
            supplier.name.toLowerCase().match(`${escapeRegExp(name).toLowerCase()}.*`);

export const getAllOrFilteredSuppliers = (q?: string) => (suppliers: Supplier[]) =>
    q && q.length > 0 ? suppliers.filter(byName(q)) : suppliers;

export const normalizeSupplier = (s: Supplier) => {
    const normalizedSupplier = Object.assign({}, s);

    // normalize the average transaction amount to precision 2, and convert to number (ex: "23.3458" => 2334)
    // this value will be consumed by Ezmoney formatter
    // Normalizing the amount beforehand prevents unnecessary calculations during component re-renders
    normalizedSupplier.average_transaction_amount_normalized = Number(
        parseFloat(normalizedSupplier.average_transaction_amount)
            .toFixed(2)
            .split('.')
            .join('')
    );

    if(normalizedSupplier.categories) {
        // remove null values from the categories array;
        normalizedSupplier.categories = normalizedSupplier.categories.filter(Boolean);

        // Remove underscores from names
        normalizedSupplier.categories = normalizedSupplier.categories.map(c => c!.split('_').join(' '))
    }

    return normalizedSupplier;

};
