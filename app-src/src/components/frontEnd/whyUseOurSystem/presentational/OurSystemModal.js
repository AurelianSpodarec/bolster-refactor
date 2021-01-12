import React from 'react';

import FrontEndModalOuterContainer from 'components/frontEnd/shared/modals/containers/FrontEndModalOuterContainer';

const OurSystemModal = ({ item }) => {
    const { title, icon, description } = item;
    return (
        <FrontEndModalOuterContainer>
            <div className="icon-wrapper">
                <img src={icon} className="icon" />
            </div>
            <h2>{title}</h2>
            <div className="divider"></div>
            <div
                className="modal-description"
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>
        </FrontEndModalOuterContainer>
    );
};

export default OurSystemModal;
