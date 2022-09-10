import React from 'react';
import moment from 'moment';

import useHierarchyDrawingExpiry from '../hooks/useHierarchyDrawingExpiry';

import BlockContainer from '../../block/containers/BlockContainer';
import FlexModalOuter from './FlexModalOuter';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';

const DrawingExpiryModal = ({ hideModal, id, hierarchyID }) => {
    const { hierarchyDrawings, isFetching, error } = useHierarchyDrawingExpiry(id, hierarchyID);

    return (
        <FlexModalOuter title="Drawing Expiry">
            <div className="flex-content-wrapper">
                <div className="flex-content">
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
                                        className={
                                            moment(expiresOn).isAfter(Date.now()) ? 'green' : 'red'
                                        }
                                    >
                                        <span className="bold-text">Expiry Date </span>
                                        {moment(expiresOn).format('DD/MM/YYYY')}
                                    </span>
                                </p>
                            ),
                        )}
                    </BlockContainer>
                </div>
            </div>

            <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                <ActionButton text="Close" onClick={hideModal} />
            </ButtonWrapper>
        </FlexModalOuter>
    );
};

export default DrawingExpiryModal;
