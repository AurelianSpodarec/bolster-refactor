import React from 'react';
import moment from 'moment';

import useHierarchyDrawingExpiry from '../hooks/useHierarchyDrawingExpiry';

import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import BlockContainer from '../../block/containers/BlockContainer';
import ModalOuterContainer from '../containers/ModalOuterContainer';

const DrawingExpiryModal = ({ hideModal, id, hierarchyID }) => {
    const { hierarchyDrawings, isFetching, error } = useHierarchyDrawingExpiry(id, hierarchyID);

    return (
        <ModalOuterContainer handleClose={hideModal}>
            <BlockHeading title={'Drawing Expiry'} />

            <BlockContainer
                isFetching={isFetching}
                isEmpty={!hierarchyDrawings.length}
                error={error}
                noDataMessage="There are no drawings on this hierarchy"
                contentClass="no-padding"
            >
                {hierarchyDrawings.map(
                    ({ id, siteName, buildingName, floorName, name, expiresOn }) => (
                        <p key={id} className="drawing-expiry-item">
                            {`${siteName} / ${buildingName} / ${floorName} / ${name} - `}
                            <span
                                className={moment(expiresOn).isAfter(Date.now()) ? 'green' : 'red'}
                            >
                                <span className="bold-text">Expiry Date </span>
                                {moment(expiresOn).format('DD/MM/YYYY')}
                            </span>
                        </p>
                    ),
                )}
            </BlockContainer>
        </ModalOuterContainer>
    );
};

export default DrawingExpiryModal;
