import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PinImagesContainer from '../containers/PinImagesContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';
import PinSectionsContainer from '../containers/PinSectionsContainer';

const PinDetails = ({
    pinHistory,
    historyCount,
    historyVersion,
    user,
    services
}) => (
    <>
        <div className="size-lg-12">
            <FieldOutput
                title="History"
                description={`${historyVersion} of ${historyCount}`}
                sizeClass="size-lg-6"
            />

            <FieldOutput
                title="Date created"
                description={moment(pinHistory.createdOn).format(
                    'DD-MM-YYYY, HH:mm a'
                )}
                fieldClass="no-h-padding"
                sizeClass="size-lg-6"
            />

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
            <a className="button red" href="#/">
                <i className="icon fa fa-trash-alt" /> Delete history
            </a>
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
