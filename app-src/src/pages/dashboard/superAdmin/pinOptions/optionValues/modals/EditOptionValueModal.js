import React from 'react';
import { useSelector } from 'react-redux';

import { selectPinOptionSet } from '../../../../../../selectors/superAdmin/pinOptionSets';
import { selectServicesArr } from '../../../../../../selectors/superAdmin/services';

import useEditOptionValue from '../hooks/useEditOptionValue';

import ButtonMultiDropdown from 'components_DEPRECATED/shared/filters/ButtonMultiDropdown';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const EditOptionValueModal = ({ option }) => {
    const { form, handleChange, handleSubmit, isPosting } = useEditOptionValue(option);

    const services = useSelector(selectServicesArr);
    const set = useSelector(state => selectPinOptionSet(state, option.pinOptionSetID));
    const serviceOptions = Object.values(services)
        .filter(service => !set?.serviceIDs || set.serviceIDs.includes(service.id))
        .map(service => ({
            value: service.id,
            text: service.name,
        }));

    return (
        <FlexModalOuter
            title={`Edit ${option.name}`}
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

export default EditOptionValueModal;
