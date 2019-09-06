import {Supplier} from '../../models/Supplier';
import React, {Fragment} from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {SupplierListItem} from '../SupplierListItem/SupplierListItem';

export interface OwnProps {
    data: Array<Supplier>,
    detailsClickHandler?: (s: Supplier) => void
}

export const SupplierList: React.FC<OwnProps> = ({data: suppliers, detailsClickHandler}) => {
    return (
        <List style={{
            maxHeight: "calc(100vh - 230px)",
            overflowY: "scroll"
        }}>
            {suppliers && suppliers.length ? suppliers.map( s =>
                    <Fragment key={s.id}>
                        <SupplierListItem
                            detailsClickHandler={detailsClickHandler}
                            data={s}
                        />
                        <Divider variant="inset" component="li" />
                    </Fragment>
                ) :
                <span> No data...</span>
            }
        </List>
    )

};
