import React from 'react';
import Header from 'components/frontEnd/shared/header/presentational/Header';
import { TrustedByList } from 'constants/frontEnd/trustedBy';

const TrustedBy = () => (
    <div className="trusted-by-container">
        <Header className="trusted-by-header">
            <h3 className="line">Trusted by industry leaders</h3>
        </Header>
        <div className="trusted-by-grid">
            {TrustedByList.map(({ logo, name }, index) => (
                <div key={index} className="item">
                    <img src={logo} alt={name} />
                </div>
            ))}
        </div>
    </div>
);

export default TrustedBy;
