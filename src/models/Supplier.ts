import {BankDetails} from './BankDetails';

export interface Supplier {
    id: string;
    rank: number;
    isActive: boolean;
    average_transaction_amount: string;
    average_transaction_amount_normalized?: number;
    logo_url: string;
    name: string;
    phone: string;
    address: string;
    categories: Array<string | null> | null;
    bankDetails?: BankDetails
}
