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
                {InfoCardList.map((item, index) => {
                    return (
                        <OurSystemList
                            title={item.title}
                            icon={item.icon}
                            handleClick={() => handleModalClick(item)}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );

    function handleModalClick(item) {
        showModal(WHY_USE_OUR_SYSTEM, item);
    }
};

const mapDispatchToProps = {
    showModal,
};

export default connect(null, mapDispatchToProps)(OurSystemListContainer);
