import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import ToggleSelect from 'components/shared/generic/form/presentational/ToggleSelect';
import Select from 'components/shared/generic/form/presentational/Select';
import useEditPinTaskSeries from './hooks/useEditPinTaskSeries';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isEmpty } from 'helpers/generic';
import usePinOptions from '../hooks/usePinOptions';
import { dayOptions, seriesRecurringOptions } from 'constants/companyAdmin/pinTasks';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const EditPinTaskSeriesModal = ({ id }) => {
    const {
        formData,
        handleChange,
        closeModal,
        isFetching,
        isPosting,
        error,
        onSubmit,
        pinTaskSeries,
        handleDeleteSeries,
        operatives,
        isWeekly,
    } = useEditPinTaskSeries(id);

    const { drawingID } = pinTaskSeries;
    const {
        startOn,
        endOn,
        pinIDs,
        service,
        template,
        companyUserID,
        recurrenceType,
        recurrenceDays,
    } = formData;

    const {
        pinOptions,
        pinOptionsFilter,
        isFetching: isFetchingPinOptions,
        error: errorPinOptions,
    } = usePinOptions(service, template, companyUserID, drawingID);

    return (
        <ModalOuterContainer extraClasses="edit-pin-task-modal">
            <Form onSubmit={onSubmit}>
                <BlockHeading title="Edit Task" />
                <BlockContainer
                    isFetching={isFetching || isFetchingPinOptions}
                    error={error || errorPinOptions}
                    isEmpty={isEmpty(pinTaskSeries)}
                >
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="Task type" sizeClasses="size-lg-12">
                                <Select
                                    name="recurrenceType"
                                    value={recurrenceType}
                                    onChange={handleChange}
                                    options={seriesRecurringOptions}
                                    omitPlaceholder
                                />
                            </Field>
                        </div>
                        <div className="size-lg-6 pick-list-wrapper">
                            <Field
                                name="Days"
                                sizeClasses={`size-lg-12 ${!isWeekly ? 'd-none' : ''}`}
                            >
                                <PickListContainer
                                    name="recurrenceDays"
                                    value={recurrenceDays || []}
                                    handleChange={handleChange}
                                    options={dayOptions}
                                    required={isWeekly}
                                    disabled={!isWeekly}
                                />
                            </Field>
                        </div>
                    </div>
                    <Field name="startOn" sizeClasses="size-lg-12" label="Start Date">
                        <DatePickerContainer
                            name="startOn"
                            selected={new Date(startOn)}
                            onChange={value => handleChange('startOn', value)}
                            required
                        />
                    </Field>
                    <Field name="endOn" sizeClasses="size-lg-12" label="End Date">
                        <DatePickerContainer
                            name="endOn"
                            selected={new Date(endOn)}
                            onChange={value => handleChange('endOn', value)}
                            required
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
                    <Field name="pinIDs" sizeClasses="size-lg-12">
                        <p>Use the boxes below to select the pins relevant to this task.</p>
                        <p>Pins can be filtered by selecting a Service and a Template.</p>
                        <br />
                        <ToggleSelect
                            name="pinIDs"
                            handleChange={handleChange}
                            options={pinOptions}
                            idleOptionsFilter={pinOptionsFilter}
                            selected={pinIDs}
                            required
                        />
                    </Field>

                    <div className="size-lg-12">
                        <ButtonWrapper alignment="right">
                            <ActionButton
                                text="Delete"
                                onClick={handleDeleteSeries}
                                ambient="negative"
                                icon="trash"
                                size="small"
                            />

                            <ActionButton
                                text="Cancel"
                                onClick={closeModal}
                                source="secondary"
                                size="small"
                            />

                            <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                        </ButtonWrapper>
                    </div>
                </BlockContainer>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditPinTaskSeriesModal;
