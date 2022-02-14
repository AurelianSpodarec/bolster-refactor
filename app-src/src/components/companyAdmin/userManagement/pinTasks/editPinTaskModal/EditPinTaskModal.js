import React from 'react';
import moment from 'moment';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import useEditPinTask from './hooks/useEditPinTask';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Select from 'components/shared/generic/form/presentational/Select';

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
        operatives,
    } = useEditPinTask(id);

    const { dueDate, companyUserID } = formData;

    return (
        <ModalOuterContainer extraClasses="edit-pin-task-modal">
            <Form onSubmit={onSubmit}>
                <BlockHeading title="Edit Task" />
                <BlockContainer
                    isFetching={isFetching}
                    isEmpty={!pinTask}
                    contentClass="no-padding"
                >
                    <Field name="dueDate" sizeClasses="size-lg-12" label="Due Date">
                        <DatePickerContainer
                            name="dueDate"
                            selected={new Date(dueDate)}
                            onChange={value => handleChange('dueDate', value)}
                            required
                            maxDate={moment(new Date()).add(13, 'months').toDate()}
                        />
                    </Field>

                    <Field name="operative" sizeClasses="size-lg-12" label="Select Operative">
                        <Select
                            name="companyUserID"
                            options={operatives}
                            value={companyUserID}
                            onChange={handleChange}
                            placeholder="-- select operative --"
                            search
                        />
                    </Field>

                    {error && <p className="error">{error}</p>}
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
                </BlockContainer>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPinTaskModal;
