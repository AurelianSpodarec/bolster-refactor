import React from 'react';
import moment from 'moment';

// import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import PinImagesContainer from '../containers/PinImagesContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PIN_STATUS_TYPES as STATUS } from 'constants/companyAdmin/enums';

const PinDetails = ({ pinHistory, historyCount, historyVersion, user }) => (
    <>
        <FieldOutput
            title="ID"
            description={pinHistory.id}
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
            description={pinHistory.type}
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

        {/* <div className="field-output no-h-padding size-lg-12">
                <label className="title">Photo(s)</label>
                <PinImagesContainer images={pinHistory.photoIds} />
            </div> */}

        <BlockButtonWrapper>
            <a className="button red" href="#/">
                <i className="icon fa fa-trash" /> Delete this history
            </a>
            <a className="button" href="#/">
                Edit this history
            </a>
        </BlockButtonWrapper>
    </>
);

export default PinDetails;
