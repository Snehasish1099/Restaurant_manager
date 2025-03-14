import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { AuthHooks } from '../../containers/authentication/hooks';

const Layout = () => {

    const { getUserByIdApiCall } = AuthHooks()

    useEffect(() => {
        getUserByIdApiCall(localStorage.getItem('userId'))
    }, [localStorage.getItem('userId')])

    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
