import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface OwnProps {
    title?: string;
    isOpen?: boolean;
    closeHandler?: () => void;
}

export const BaseDialog: React.FC<OwnProps> = ({title='', isOpen = false, closeHandler, children}) => {

    return (
        <Dialog
            fullWidth={true}
            open={isOpen}
            onClose={() => closeHandler ? closeHandler() : null}
        >
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Provide/Edit supplier's bank details:
                </DialogContentText>

                {children}

            </DialogContent>
        </Dialog>
    )
};

