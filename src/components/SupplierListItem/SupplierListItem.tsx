import React, {Fragment} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import * as Ezmoney from 'ezmoney';
import {Supplier} from '../../models/Supplier';
import {CategoryChip} from '../CategoryChip/CategoryChip';


export interface OwnProps {
    data: Supplier,
    detailsClickHandler?: (supplier: Supplier) => void
}

export const SupplierListItem: React.FC<OwnProps> = ({data: supplier, detailsClickHandler}) => {

    const avgTransaction = Ezmoney.format(
        {
            amount: supplier.average_transaction_amount_normalized!,
            precision: 2,
            currency: 'EUR'
        },
        'en-US'
    );

    return (
        <ListItem className="supplier-list-item">
            <ListItemAvatar>
                <Avatar src={supplier.logo_url}/>
            </ListItemAvatar>
            <ListItemText
                primary={`#${supplier.rank}  ${supplier.name}`}
                secondary={

                    <Fragment>
                        <span>
                          AVG. TRANSACTION: {avgTransaction}
                        </span>

                        {supplier.categories ?
                            <Box mt="10px" >
                                {supplier.categories.map(
                                    (c, i) => <CategoryChip key={i} data={c}/>)
                                }
                            </Box> : null
                        }
                    </Fragment>
                }
            />
            <ListItemSecondaryAction>
                <Button
                    onClick={() => detailsClickHandler ? detailsClickHandler(supplier) : null}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    <Icon fontSize="small">account_balance</Icon>
                    <span style={{marginLeft: "6px"}}>BANK DETAILS</span>
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
