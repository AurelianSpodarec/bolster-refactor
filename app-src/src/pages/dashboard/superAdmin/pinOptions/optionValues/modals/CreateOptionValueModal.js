import React from 'react';
import { useSelector } from 'react-redux';

import { selectPinOptionSet } from '../../../../../../selectors/superAdmin/pinOptionSets';
import { selectPinOptionType } from '../../../../../../selectors/superAdmin/pinOptionTypes';
import { selectServices } from '../../../../../../selectors/superAdmin/services';

import useCreateOptionValue from '../hooks/useCreateOptionValue';

import ButtonMultiDropdown from '../../../../../../components/shared/filters/ButtonMultiDropdown';
import Form from '../../../../../../components/shared/generic/form/containers/Form';
import Field from '../../../../../../components/shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../../../components/shared/generic/form/containers/TextInputContainer';
import ActionButton from '../../../../../../components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from '../../../../../../components/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const singularTypeName = pinOptionType.name;

    const { form, handleChange, handleSubmit, isPosting } = useCreateOptionValue(
        pinOptionTypeID,
        pinOptionSetID,
    );

    const services = useSelector(selectServices);
    const set = useSelector(state => selectPinOptionSet(state, pinOptionSetID));
    const serviceOptions = Object.values(services)
        .filter(service => !set?.serviceIDs || set.serviceIDs.includes(service.id))
        .map(service => ({
            value: service.id,
            text: service.name,
        }));

    return (
        <FlexModalOuter
            title={`Add ${singularTypeName}`}
            headingChildren={
                !!serviceOptions.length && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={serviceOptions}
                        selectedOptions={form.serviceIDs}
                        handleChange={handleChange}
                        isNumberValues
                        scrollElementID="modal-block"
                    />
                )
            }
        >
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <p className="generic-text size-lg-12">{`Create an ${singularTypeName}`}</p>

                    <div className="form-fields-container">
                        <Field name="Name" required>
                            <TextInputContainer
                                name="name"
                                value={form.name}
                                handleChange={handleChange}
                                placeholder="Type name"
                                required
                            />
                        </Field>

                        <Field name="Short Name" labelClasses="small-margin">
                            <p className="generic-text size-lg-12">
                                This is how the pin option will output through the app.
                            </p>
                            <TextInputContainer
                                name="shortName"
                                value={form.shortName}
                                handleChange={handleChange}
                                placeholder="Type short name"
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Save"
                        icon={isPosting ? 'spinner' : 'save'}
                        iconSpin={isPosting}
                        ambient="positive"
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default CreateOptionValueModal;
