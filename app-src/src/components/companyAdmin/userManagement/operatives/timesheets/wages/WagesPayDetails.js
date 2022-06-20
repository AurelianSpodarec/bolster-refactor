import React from 'react';

import BlockContainer from '../../../../../shared/generic/block/containers/BlockContainer';
import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';

const WagesPayDetails = ({ selectedUserIDs, getUserNameByID }) => {
    return (
        <BlockContainer className="content-container size-lg-7">
            <BlockHeading
                title={
                    selectedUserIDs.length
                        ? selectedUserIDs.length === 1
                            ? getUserNameByID(selectedUserIDs[0])
                            : 'Multiple Users'
                        : 'All Users'
                }
            />

            <h4 className="heading heading-4">Pay Details</h4>
        </BlockContainer>
    );
};

export default WagesPayDetails;
