import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import PinSectionsContainer from '../containers/PinSectionsContainer';

const PinHistoryDetailsItem = ({
    history,
    createdBy,
    services,
    handleEditHistoryModal,
    drawingID
}) => (
    <div className="item">
        <FieldOutput
            title="Type"
            description={services[history.serviceID].name}
            sizeClass="size-lg-6"
        />

        <FieldOutput title="Date added" sizeClass="size-lg-6">
            <p>
                <DateTimeContainer date={history.createdOn} />
            </p>
        </FieldOutput>

        <FieldOutput
            title="Added by"
            description={`${createdBy.userFirstName} ${createdBy.userLastName}`}
            sizeClass="size-lg-6"
        />

        <PinSectionsContainer pinHistory={history} drawingID={drawingID} />

        <BlockButtonWrapper
            additionalClasses="item-button-container"
            sizeClasses="size-lg-12"
        >
            <button className="button red" onClick={handleEditHistoryModal}>
                <i className="far fa-times" /> Delete history
            </button>

            <button className="button yellow" onClick={handleEditHistoryModal}>
                <i className="far fa-pencil" /> Edit history
            </button>
        </BlockButtonWrapper>
    </div>
);

export default PinHistoryDetailsItem;
