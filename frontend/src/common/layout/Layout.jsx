import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { AuthHooks } from '../../containers/authentication/hooks';
import SnackBarComponent from '../ui_components/SnackBarComponent';

const Layout = () => {

    const { getUserByIdApiCall } = AuthHooks()

    useEffect(() => {
        localStorage.getItem('userId') && getUserByIdApiCall(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
            <SnackBarComponent/>
        </React.Fragment>
    );
};

export default Layout;
