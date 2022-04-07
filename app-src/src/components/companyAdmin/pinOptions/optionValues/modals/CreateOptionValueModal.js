import React from 'react';

import { PIN_OPTION_TYPES, PIN_OPTION_TYPES_CREATE_VALUE_ENUM } from 'constants/companyAdmin/enums';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CreateOptionValueModal = ({ pinOptionTypeID }) => {
    const typeNameSingular = PIN_OPTION_TYPES[pinOptionTypeID].singular;
    const typeNameSmallSingular = PIN_OPTION_TYPES_CREATE_VALUE_ENUM[pinOptionTypeID];

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Add ${typeNameSingular}`} />

            <p className="generic-text size-lg-12">
                Create an {typeNameSingular.toLowerCase()} and apply prices to different
                measurements.
            </p>

            <p className="generic-text size-lg-12">
                Your operatives will be able to apply a measurement to each{' '}
                {typeNameSmallSingular.toLowerCase()} used on a history to calculate a price
                associated to that pin.
            </p>
        </ModalOuterContainer>
    );
};

export default CreateOptionValueModal;
