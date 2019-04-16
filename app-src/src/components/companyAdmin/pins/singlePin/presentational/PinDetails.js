import React from 'react';
import moment from 'moment';

// import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PinImagesContainer from '../containers/PinImagesContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';
import PinSectionsContainer from '../containers/PinSectionsContainer';

const PinDetails = ({
    pin,
    pinHistory,
    historyCount,
    historyVersion,
    user,
    services
}) => (
    <>
        <FieldOutput
            title="ID"
            description={pin.pinCode}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="History"
            description={`${historyVersion} of ${historyCount}`}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Date created"
            description={moment(pinHistory.createdOn).format(
                'DD-MM-YYYY, HH:mm a'
            )}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Type"
            description={services[pinHistory.serviceID].name}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Added by"
            description={`${user.userFirstName} ${user.userLastName}`}
            fieldClass="no-h-padding"
        />

        <FieldOutput
            title="Status"
            description={STATUS[pinHistory.status]}
            fieldClass="no-h-padding"
        />

        <PinSectionsContainer />

        {/* <div className="field-output no-h-padding size-lg-12">
                <label className="title">Photo(s)</label>
                <PinImagesContainer images={pinHistory.photoIds} />
            </div> */}

        <BlockButtonWrapper>
            <a className="button red" href="#/">
                <i className="icon fa fa-trash-alt" /> Delete history
            </a>
            <a className="button yellow" href="#">
                <i className="far fa-pencil" /> Edit history
            </a>
        </BlockButtonWrapper>
    </>
);

export default PinDetails;
