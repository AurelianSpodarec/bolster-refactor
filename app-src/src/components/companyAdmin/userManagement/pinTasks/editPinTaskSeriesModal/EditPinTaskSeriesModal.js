import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import React from 'react';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import useStep2Options from '../createPinTaskModal/hooks/useStep2Options';
import ToggleSelect from 'components/shared/generic/form/presentational/ToggleSelect';
import Select from 'components/shared/generic/form/presentational/Select';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import useEditPinTaskSeries from './hooks/useEditPinTaskSeries';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const EditPinTaskSeriesModal = ({
    date: prevDate,
    endDate: prevEndDate,
    pins: prevPins,
    drawing,
}) => {
    const { formData, handleChange, closeModal, isPosting, onSubmit } = useEditPinTaskSeries(
        prevDate,
        prevEndDate,
        prevPins,
    );

    const { date, endDate, pins, service, template } = formData;

    const {
        isFetching,
        fetchError,
        serviceOptions,
        templateOptions,
        pinOptions,
        pinOptionsFilter,
    } = useStep2Options(handleChange, drawing, service, template);

    return (
        <ModalOuterContainer extraClasses="edit-pin-task-modal">
            {isFetching && <Loading message="Loading Filters" />}
            {fetchError && !isFetching && <p className="fetch-error">{fetchError}</p>}
            <Form onSubmit={onSubmit}>
                <BlockHeading title="Edit Task" />
                <BlockContainer>
                    <Field name="date" sizeClasses="size-lg-12" label="Start Date">
                        <DatePickerContainer
                            name="date"
                            selected={new Date(date)}
                            onChange={value => handleChange('date', value)}
                            required
                        />
                    </Field>
                    <Field name="endDate" sizeClasses="size-lg-12" label="End Date">
                        <DatePickerContainer
                            name="endDate"
                            selected={new Date(endDate)}
                            onChange={value => handleChange('endDate', value)}
                            required
                        />
                    </Field>
                </BlockContainer>
                <BlockContainer>
                    <Field name="service" sizeClasses="size-lg-12">
                        <Select
                            name="service"
                            value={service}
                            onChange={handleChange}
                            options={serviceOptions}
                            disabled={isFetching || fetchError}
                            search
                        />
                    </Field>
                    <Field name="template" sizeClasses="size-lg-12">
                        <Select
                            name="template"
                            value={template}
                            onChange={handleChange}
                            options={templateOptions}
                            disabled={isFetching || fetchError || service == null}
                            search
                        />
                    </Field>
                    <Field name="pins" sizeClasses="size-lg-12">
                        <p>Use the boxes below to select the pins relevant to this task.</p>
                        <p>Pins can be filtered by selecting a Service and a Template.</p>
                        <br />
                        <ToggleSelect
                            name="pins"
                            handleChange={handleChange}
                            options={pinOptions}
                            idleOptionsFilter={pinOptionsFilter}
                            selected={pins}
                            required
                        />
                    </Field>
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

export default EditPinTaskSeriesModal;
