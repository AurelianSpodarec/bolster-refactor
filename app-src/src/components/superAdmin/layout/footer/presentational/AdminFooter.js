import React from 'react';
import WhiteLogo from '_content/images/footer/logo-white.png';

const AdminFooter = () => (
    <footer id="page-footer" className="basic">
        <div className="container">
            <p>
                Bolster Systems Ltd is a company registered in England and
                Wales. Company No: ##12345678##.
            </p>

            <img alt="logo of Bolster Systems" src={WhiteLogo} />

            <div className="clear" />
        </div>
    </footer>
);

export default AdminFooter;
