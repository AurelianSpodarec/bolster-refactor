import React from 'react';
import { Link } from 'react-router-dom';

// import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PinImagesContainer from '../containers/PinImagesContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';
import PinSectionsContainer from '../containers/PinSectionsContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const PinDetails = ({
    pinHistory,
    pin,
    historyCount,
    historyVersion,
    user,
    services,
    handleDelete
}) => (
    <>
        <div className="size-lg-12">
            <FieldOutput
                title="Date created"
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            >
                <p>
                    <DateTimeContainer date={pinHistory.createdOn} />
                </p>
            </FieldOutput>

            <FieldOutput
                title="Type"
                description={services[pinHistory.serviceID].name}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />

            <FieldOutput
                title="Added by"
                description={`${user.userFirstName} ${user.userLastName}`}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />

            <FieldOutput
                title="Status"
                description={STATUS[pinHistory.status]}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />
        </div>

        <PinSectionsContainer pinHistory={pinHistory} />

        {/* <div className="field-output no-h-padding size-lg-12">
                <label className="title">Photo(s)</label>
                <PinImagesContainer images={pinHistory.photoIds} />
            </div> */}

        <BlockButtonWrapper>
            <button className="button red" onClick={handleDelete}>
                <i className="icon fa fa-trash-alt" /> Delete history
            </button>
            <Link
                className="button yellow"
                to={`/company/pins/${pinHistory.pinID}/edit-history/${
                    pinHistory.id
                }`}
            >
                <i className="far fa-pencil" /> Edit history
            </Link>
        </BlockButtonWrapper>
    </>
);

export default PinDetails;
