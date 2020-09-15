import React from 'react';
import Header from 'components/frontEnd/shared/header/presentational/Header';
import { TrustedByList } from 'constants/frontEnd/trustedBy';

const TrustedBy = () => (
    <div className="trusted-by-container">
        <Header className="trusted-by-header">
            <h1 className="line">Trusted by industry leaders</h1>
        </Header>
        <div className="trusted-by-grid">
            {TrustedByList.map((item, index) => (
                <div key={index} className="item">
                    <img src={item} alt="item-1" />
                </div>
            ))}
        </div>
    </div>
);

export default TrustedBy;
