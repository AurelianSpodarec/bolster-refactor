import HeaderProfile from 'components/companyAdmin/layout/header/presentational/HeaderProfile';
import React from 'react';
import { Link } from 'react-router-dom';
import bolsterLogo from '_content/images/bolster_logo.png';
import useAdminHeader from '../hooks/useAdminHeader';

const AdminHeader = () => {
    const { isMobile, toggleMobileMenu } = useAdminHeader();

    return (
        <header id="page-header" className="flex-row justify-between align-stretch">
            <div className="flex flex-row align-stretch">
                <div className="logo flex-row justify-center align-center">
                    {isMobile && (
                        <div className="mobile-menu" onClick={() => toggleMobileMenu()}>
                            <i className="far fa-bars" />
                        </div>
                    )}

                    <Link to="/admin">
                        <img alt="bolster logo" src={bolsterLogo} />
                    </Link>
                </div>
            </div>
            <div className="account-area flex-row">
                <div className="notifications flex-row align-center">
                    <HeaderProfile />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
