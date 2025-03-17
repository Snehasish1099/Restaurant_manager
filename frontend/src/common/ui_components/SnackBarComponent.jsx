import React, { useEffect } from "react";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { snackbarClose } from "../../containers/snackbarReducerSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const SnackBarComponent = () => {

    const dispatch = useDispatch()

    const notification = useSelector((state) => state.snackbar)

    useEffect(() => {
        if (notification?.open === true) {
            setTimeout(() => {
                dispatch(snackbarClose())
            }, 3000);
        }
    }, [notification])

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            open={notification?.open}
            onClose={() => dispatch(snackbarClose())}
            // key={vertical + horizontal}
            style={{
                width: '100%',
            }}
        >
            <Alert
                // onClose={props.messageClose}
                variant="filled"
                severity={notification?.result?.alertType}
                style={{
                    width: 322, textAlign: 'left', background:
                        notification?.result?.alertType === 'success' ?
                            '#dcfce7'
                            :
                            notification?.result?.alertType === 'error' ?
                                '#fee2e2'
                                :
                                notification?.result?.alertType === 'warning' ? '#fef9c3' : '',
                    padding: '0.5rem 1.5rem 1.5rem 1.5rem',
                    borderRadius: '12px',
                }}
                icon={false}

            >
                <IconButton size="small" aria-label="add" color="inherit"
                    // onClick={props.handleClose}
                    data-cy="notifiedMessage-module-closeIcon"
                    className={`!absolute !top-1 !right-1`}
                >
                    <Close className={`text-black`} fontSize={`small`} />
                </IconButton>
                <div>
                    <div className={`w-full flex items-center gap-2`}>
                        <div>
                            {notification?.result?.alertType === 'success' ? <CheckCircleIcon color="success"/>
                                :
                                notification?.result?.alertType === 'error' ? <ErrorIcon color="error"/>
                                    :
                                    notification?.result?.alertType === 'warning' ? <WarningIcon color="warning" />
                                        : null}
                        </div>
                        <div>
                            {notification?.result?.alertType === 'success' ? <p className={`text-[#026100] text-lg font-semibold capitalize`}>{notification?.result?.alertType}</p>
                                :
                                notification?.result?.alertType === 'error' ? <p className={`text-[#CE0C00] text-lg font-semibold capitalize`}>{notification?.result?.alertType}</p>
                                    :
                                    notification?.result?.alertType === 'warning' ? <p className={`text-[#E3A403] text-lg font-semibold capitalize`}>{notification?.result?.alertType}</p>
                                        :
                                        null
                            }
                        </div>
                    </div>
                    <p className={`text-[#3D4255] text-sm`}>{notification?.result?.message}</p>
                </div>
            </Alert>
        </Snackbar>
    )
}
SnackBarComponent.propTypes = {
    messageOpen: PropTypes.bool,
    messageClose: PropTypes.func,
    notificationText: PropTypes.string,
    subText: PropTypes.string,
    alertType: PropTypes.string,
    borderClass: PropTypes.string,
    handleClose: PropTypes.func
}
export default SnackBarComponent