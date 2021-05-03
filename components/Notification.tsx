import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

export const Notification = () => {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const message = useSelector((state: any) => state.newMsg);

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    if (!message.message) {
        return null;
    }

    if (message.msgType === 'success') {
        return (
            <div>
                <Snackbar
                    //@ts-ignore
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    key={vertical + horizontal}
                >
                    <Alert severity="success" onClose={handleClose}>
                        <strong>{message.message}</strong>
                    </Alert>
                </Snackbar>
            </div>
        );
    }
    if (message.msgType === 'error') {
        return (
            <div>
                <Snackbar
                    //@ts-ignore
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    key={vertical + horizontal}
                >
                    <Alert severity="error" onClose={handleClose}>
                        <strong>{message.message}</strong>
                    </Alert>
                </Snackbar>
            </div>
        );
    }
};
