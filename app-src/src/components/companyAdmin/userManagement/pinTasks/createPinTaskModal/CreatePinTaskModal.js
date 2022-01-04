import React from 'react';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import { DAY, RECURRING_TYPE } from 'constants/companyAdmin/enums';
import useCreatePinTask from './hooks/useCreatePinTask';
import CreatePinTaskStep1 from './CreatePinTaskStep1';
import CreatePinTaskStep2 from './CreatePinTaskStep2';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Select from 'components/shared/generic/form/presentational/Select';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const recurringOptions = [
    {
        value: RECURRING_TYPE.NONE,
        label: 'None',
    },
    {
        value: RECURRING_TYPE.WEEKLY,
        label: 'Weekly',
    },
    {
        value: RECURRING_TYPE.MONTHLY,
        label: 'Monthly',
    },
];

const dayOptions = [
    { value: DAY.MONDAY, text: 'M' },
    { value: DAY.TUESDAY, text: 'T' },
    { value: DAY.WEDNESDAY, text: 'W' },
    { value: DAY.THURSDAY, text: 'T' },
    { value: DAY.FRIDAY, text: 'F' },
    { value: DAY.SATURDAY, text: 'S' },
    { value: DAY.SUNDAY, text: 'S' },
];

const CreatePinTaskModal = ({ initialDate, startDate }) => {
    const {
        formData,
        handleChange,
        step,
        closeModal,
        isRecurring,
        isWeekly,
        onNextStep,
        isPosting,
    } = useCreatePinTask(initialDate, startDate);

    const {
        days,
        recurring,
        date,
        endDate,
        operative,
        site,
        building,
        floor,
        drawing,
        service,
        template,
        pins,
    } = formData;

    const steps = [
        <CreatePinTaskStep1
            key={1}
            handleChange={handleChange}
            date={date}
            endDate={endDate}
            operative={operative}
            site={site}
            building={building}
            floor={floor}
            drawing={drawing}
            isRecurring={isRecurring}
        />,
        <CreatePinTaskStep2
            key={2}
            handleChange={handleChange}
            drawing={drawing}
            service={service}
            template={template}
            pins={pins}
        />,
        // <CreatePinTaskStep3 key={3} formData={formData} isPosting={isPosting} />,
    ];

    const Step = steps[step];

    const buttons = [
        <button className="button blue" key={1}>
            Next
        </button>,
        <button className="button blue" key={2} disabled={isPosting}>
            Submit
        </button>,
        // <button className="button green" key={3} disabled={isPosting}>
        //     Submit
        // </button>,
    ];

    const Button = buttons[step];

    return (
        <ModalOuterContainer extraClasses="create-pin-task-modal">
            <Form onSubmit={onNextStep}>
                <BlockHeading title="Create Task" />
                <BlockContainer contentClass="header">
                    <div className="size-lg-6">
                        <Field
                            sizeClasses={`size-lg-12 ${!isWeekly || step === 2 ? 'd-none' : ''}`}
                        >
                            <PickListContainer
                                name="days"
                                value={days}
                                handleChange={handleChange}
                                options={dayOptions}
                                required={isWeekly}
                                disabled={!isWeekly || step === 2}
                            />
                        </Field>
                    </div>
                    <div className="size-lg-6">
                        <Field name="recurring" sizeClasses="size-lg-12">
                            <Select
                                name="recurring"
                                value={recurring}
                                onChange={handleChange}
                                options={recurringOptions}
                                omitPlaceholder
                                disabled={step === 2}
                            />
                        </Field>
                    </div>
                </BlockContainer>
                <BlockContainer contentClass="step-tabs">
                    {new Array(2).fill(null).map((_, i) => (
                        <div className={`step-tab ${step === i ? 'selected' : ''}`} key={i}>
                            <p className="text">Step {i + 1}</p>
                        </div>
                    ))}
                </BlockContainer>
                <BlockContainer>
                    {Step}

                    <BlockButtonWrapper>
                        {Button}
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

export default CreatePinTaskModal;
