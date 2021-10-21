import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import React from 'react';
import useEditPinTask from './hooks/useEditPinTask';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';

const EditPinTaskModal = ({ date: prevDate }) => {
    const { formData, handleChange, closeModal, isPosting, onSubmit, isSeries } = useEditPinTask(
        prevDate,
    );

    const { date } = formData;

    return (
        <ModalOuterContainer extraClasses="edit-pin-task-modal">
            <Form onSubmit={onSubmit}>
                <BlockHeading title="Edit Task" />
                <div className="size-lg-12">
                    <Field
                        name="date"
                        sizeClasses="size-lg-12"
                        label={isSeries ? 'Start Date' : 'Date'}
                    >
                        <DatePickerContainer
                            name="date"
                            selected={new Date(date)}
                            onChange={value => handleChange('date', value)}
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <BlockButtonWrapper>
                        <button className="button green" key={3} disabled={isPosting}>
                            Submit
                        </button>
                        <button
                            type="button"
                            className="button"
                            onClick={closeModal}
                            disabled={isPosting}
                        >
                            Cancel
                        </button>
                    </BlockButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPinTaskModal;
