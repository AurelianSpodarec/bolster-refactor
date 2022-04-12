import React from 'react';

import { PIN_OPTION_TYPES, PIN_OPTION_TYPES_CREATE_VALUE_ENUM } from 'constants/companyAdmin/enums';

import useCreateOptionValue from '../hooks/useCreateOptionValue';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const typeNameSingular = PIN_OPTION_TYPES[pinOptionTypeID].singular;
    const typeNameSmallSingular = PIN_OPTION_TYPES_CREATE_VALUE_ENUM[pinOptionTypeID];

    const { form, handleChange, handleSubmit, isPosting, serviceOptions } = useCreateOptionValue(
        pinOptionTypeID,
        pinOptionSetID,
    );

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

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Type name"
                        required
                    />
                </Field>

                <Field name="Short Name" required>
                    <TextInputContainer
                        name="shortName"
                        value={form.shortName}
                        handleChange={handleChange}
                        placeholder="Type short name"
                        required
                    />
                </Field>

                {serviceOptions.length > 0 && (
                    <Field name="Services">
                        <CheckboxListContainer
                            name="serviceIDs"
                            text=""
                            handleChange={handleChange}
                            selectedOptions={form.serviceIDs}
                            options={serviceOptions}
                            isNumberValues
                        />
                    </Field>
                )}

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Save"
                            icon={isPosting ? 'spinner' : 'save'}
                            iconSpin={isPosting}
                            ambient="positive"
                            size="medium"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateOptionValueModal;
