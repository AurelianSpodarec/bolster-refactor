import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import useCreateHierarchyAlert from '../hooks/useCreateHierarchyAlert';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import Select from 'components/shared/generic/form/presentational/Select';

const CreateHierarchyAlertModal = ({ hierarchy, hideModal }) => {
    const {
        fields: { name, description, deliveryMethod, date, recurrenceFrequency, recurrenceType },
        handleChange,
        handleSubmit,
    } = useCreateHierarchyAlert();

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Create ${hierarchy} Alert`} />

            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name="name"
                            value={name}
                            required
                        />
                    </Field>
                    <Field name="Description">
                        <TextInputContainer
                            handleChange={handleChange}
                            name="description"
                            value={description}
                        />
                    </Field>
                    <Field name="Delivery Operation(s)">
                        <MultiSelect
                            value={deliveryMethod}
                            onChange={handleChange}
                            name="deliveryMethod"
                            options={[
                                { value: 0, label: 'Email' },
                                { value: 1, label: 'Message Centre' },
                            ]}
                        />
                    </Field>
                    <Field name="Date">
                        <DatePickerContainer selected={date} onChange={handleChange} name="date" />
                    </Field>
                    <Field name="Recurrence">
                        <div className="size-lg-6">
                            <TextInputContainer
                                type="number"
                                name="recurrenceFrequency"
                                maxNum={7}
                                value={recurrenceFrequency}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="size-lg-6">
                            <Select
                                value={recurrenceType}
                                onChange={handleChange}
                                name="recurrenceType"
                                options={[
                                    { value: 0, label: 'Day' },
                                    { value: 1, label: 'Week' },
                                    { value: 2, label: 'Month' },
                                ]}
                            />
                        </div>
                    </Field>
                </div>
                <BlockButtonWrapper>
                    <button className="button blue">
                        <i className="fa fa-plus" /> Create Alert
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreateHierarchyAlertModal;
