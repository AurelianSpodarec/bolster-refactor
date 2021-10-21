import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import { DAY, RECURRING_TYPE } from 'constants/companyAdmin/enums';
import React, { useEffect } from 'react';
import useCreatePinTask from './hooks/useCreatePinTask';
import CreatePinTaskStep1 from './CreatePinTaskStep1';
import CreatePinTaskStep2 from './CreatePinTaskStep2';
import CreatePinTaskStep3 from './CreatePinTaskStep3';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Select from 'components/shared/generic/form/presentational/Select';

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

const CreatePinTaskModal = ({ initialDate }) => {
    const {
        formData,
        handleChange,
        step,
        setStep,
        closeModal,
        isRecurring,
        isWeekly,
        isMonthly,
        onNextStep,
        isPosting,
    } = useCreatePinTask(initialDate);

    const {
        days,
        recurring,
        date,
        endDate,
        operatives,
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
            operatives={operatives}
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
        <CreatePinTaskStep3 key={3} formData={formData} isPosting={isPosting} />,
    ];

    const Step = steps[step];

    const buttons = [
        <button className="button blue" key={1}>
            Next
        </button>,
        <button className="button blue" key={2}>
            Confirm
        </button>,
        <button className="button green" key={3} disabled={isPosting}>
            Submit
        </button>,
    ];

    const Button = buttons[step];

    return (
        <ModalOuterContainer extraClasses="create-pin-task-modal">
            <Form onSubmit={onNextStep}>
                <BlockHeading title="Create Task" />
                <div className="size-lg-12 header">
                    <div className="size-lg-6">
                        <Field sizeClasses="size-lg-12">
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
                </div>
                <div className="size-lg-12 step-tabs">
                    {new Array(3).fill(null).map((_, i) => (
                        <div className={`step-tab ${step === i ? 'selected' : ''}`} key={i}>
                            <p className="text">Step {i + 1}</p>
                        </div>
                    ))}
                </div>
                <div className="size-lg-12">
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
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreatePinTaskModal;
