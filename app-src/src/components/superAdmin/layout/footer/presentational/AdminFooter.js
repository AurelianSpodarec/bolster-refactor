import React from 'react';
import WhiteLogo from '_content/images/frontend/footer-logo.png';

const AdminFooter = () => (
    <footer id="page-footer" className="basic">
        <div className="container">
            <p>
                Bolster Systems Ltd is a company registered in England and
                Wales.
            </p>

            <img
                alt="logo of Bolster Systems"
                src={WhiteLogo}
                width="93"
                height="40"
            />

            <div className="clear" />
        </div>
    </footer>
);

export default AdminFooter;
