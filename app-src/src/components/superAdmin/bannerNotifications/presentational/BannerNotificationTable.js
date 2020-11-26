import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const BannerNotificationTable = ({ showModal }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Notifcations">
                <button className="button green" onClick={showModal}>
                    <i className="fa fa-plus" /> Add New Banner Notifcation
                </button>
            </BlockHeading>
        </BlockContainer>
    );
};

export default BannerNotificationTable;
