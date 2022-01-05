import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import React from 'react';
import useEditPinTask from './hooks/useEditPinTask';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import moment from 'moment';

const EditPinTaskModal = ({ id }) => {
    const {
        formData,
        handleChange,
        closeModal,
        isFetching,
        isPosting,
        error,
        onSubmit,
        pinTask,
        handleDeleteTask,
    } = useEditPinTask(id);

    const { date } = formData;

    return (
        <ModalOuterContainer extraClasses="edit-pin-task-modal">
            <Form onSubmit={onSubmit}>
                <BlockHeading title="Edit Task" />
                <BlockContainer isFetching={isFetching} isEmpty={!pinTask}>
                    <Field name="date" sizeClasses="size-lg-12" label="Date">
                        <DatePickerContainer
                            name="date"
                            selected={new Date(date)}
                            onChange={value => handleChange('date', value)}
                            required
                            maxDate={moment(new Date()).add(13, 'months').toDate()}
                        />
                    </Field>

                    {error && <p className="error">{error}</p>}
                    <BlockButtonWrapper>
                        <button className="button green" key={3} disabled={isPosting}>
                            Submit
                        </button>
                        <button
                            type="button"
                            className="button red"
                            onClick={handleDeleteTask}
                            disabled={isPosting}
                        >
                            Delete
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
                </BlockContainer>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPinTaskModal;
