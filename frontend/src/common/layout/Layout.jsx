import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
