import React from 'react';
import { connect } from 'react-redux';

import OurSystemList from '../presentational/OurSystemList';
import { InfoCardList } from 'constants/frontEnd/infoCard';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { WHY_USE_OUR_SYSTEM } from 'constants/shared/modalTypes';

const OurSystemListContainer = ({ showModal }) => {
    return (
        <div className="our-system-list-wrapper">
            <div className="info-card-list-wrapper">
                {InfoCardList.map(({ title, icon }, index) => {
                    return (
                        <OurSystemList
                            title={title}
                            icon={icon}
                            handleClick={handleModalClick}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );

    function handleModalClick() {
        showModal(WHY_USE_OUR_SYSTEM);
    }
};

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(OurSystemListContainer);
