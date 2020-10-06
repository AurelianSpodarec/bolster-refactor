import React from 'react';
import Header from 'components/frontEnd/shared/header/presentational/Header';
import { AccreditationsList } from 'constants/frontEnd/accreditations';

const Accreditations = () => (
    <div className="accreditations-container">
        <Header className="accreditations-header">
            <h3 className="line">Accreditations</h3>
        </Header>
        <div className="accreditations-grid">
            {AccreditationsList.map(({ logo, name }, index) => (
                <div key={index} className="item">
                    <img src={logo} alt={name} />
                </div>
            ))}
        </div>
    </div>
);

export default Accreditations;
