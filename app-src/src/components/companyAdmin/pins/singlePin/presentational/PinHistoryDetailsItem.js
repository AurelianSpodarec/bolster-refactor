import React from 'react';

import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import PinSectionsContainer from '../containers/PinSectionsContainer';
import { PIN_STATUS_TYPES } from 'constants/companyAdmin/enums';

const PinHistoryDetailsItem = ({
    history,
    services,
    handleEditHistoryModal,
    handleDeleteHistoryModal,
    editedByUserName,
    drawingID,
    isDeleteHistory,
    pin
}) => (
    <div className="item">
        <FieldOutput
            title="Type"
            description={services[history.serviceID].name}
            sizeClass="size-lg-3 size-md-12"
        />

        <FieldOutput title="Date added" sizeClass="size-lg-3 size-md-12">
            <p>
                <DateTimeContainer date={history.createdOn} />
            </p>
        </FieldOutput>

        <FieldOutput
            title="Added by"
            description={`${history.createdByOperativeFullName}`}
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Status"
            description={`${PIN_STATUS_TYPES[history.status]}`}
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Last edited"
            description={
                history.lastEditedOn ? <DateTimeContainer date={history.lastEditedOn} /> : 'N/A'
            }
            sizeClass="size-lg-3 size-md-12"
        />
        <FieldOutput
            title="Last edited by"
            description={editedByUserName || 'N/A'}
            sizeClass="size-lg-3 size-md-12"
        />

        <PinSectionsContainer pinHistory={history} drawingID={drawingID} />

        <BlockButtonWrapper additionalClasses="item-button-container" sizeClasses="size-lg-12">
            <button className="button red" onClick={handleDeleteHistoryModal}>
                <i className="far fa-times" /> Delete {isDeleteHistory > 1 ? 'History' : 'Pin'}
            </button>
            {pin.isEditButtonEnabled && (
                <button className="button yellow" onClick={handleEditHistoryModal}>
                    <i className="far fa-pencil" /> Edit this history
                </button>
            )}
        </BlockButtonWrapper>
    </div>
);

export default PinHistoryDetailsItem;
