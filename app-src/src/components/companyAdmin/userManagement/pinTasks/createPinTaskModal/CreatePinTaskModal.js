import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Form from 'components/shared/generic/form/containers/Form';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import { DAY, RECURRING_TYPE } from 'constants/companyAdmin/enums';
import React from 'react';
import useCreatePinTask from './hooks/useCreatePinTask';
import CreatePinTaskStep1 from './CreatePinTaskStep1';
import CreatePinTaskStep2 from './CreatePinTaskStep2';
import CreatePinTaskStep3 from './CreatePinTaskStep3';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const recurringOptions = [
    {
        value: RECURRING_TYPE.NONE,
        text: 'None',
    },
    {
        value: RECURRING_TYPE.WEEKLY,
        text: 'Weekly',
    },
    {
        value: RECURRING_TYPE.MONTHLY,
        text: 'Monthly',
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
        formData: { days, recurring, date, operatives, site, building, floor, drawing },
        handleChange,
        step,
        setStep,
        closeModal,
        isWeekly,
        isNotRecurring,
    } = useCreatePinTask(initialDate);

    const steps = [
        <CreatePinTaskStep1
            key={1}
            date={date}
            handleChange={handleChange}
            isNotRecurring={isNotRecurring}
            operatives={operatives}
            site={site}
            building={building}
            floor={floor}
            drawing={drawing}
        />,
        <CreatePinTaskStep2 key={2} />,
        <CreatePinTaskStep3 key={3} />,
    ];

    const Step = steps[step];

    const buttons = [
        <button className="button blue" key={1}>
            Next
        </button>,
        <button className="button blue" key={2}>
            Confirm
        </button>,
        <button className="button green" key={3}>
            Submit
        </button>,
    ];

    const Button = buttons[step];

    return (
        <ModalOuterContainer extraClasses="create-pin-task-modal">
            <Form onSubmit={() => setStep(step + 1)}>
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
                                disabled={!isWeekly}
                            />
                        </Field>
                    </div>
                    <div className="size-lg-6">
                        <Field name="recurring" sizeClasses="size-lg-12">
                            <DropdownContainer
                                name="recurring"
                                value={recurringOptions.find(option => option.value === recurring)}
                                handleChange={handleChange}
                                options={recurringOptions}
                                withoutPlaceholder
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
                        <button type="button" className="button" onClick={closeModal}>
                            Cancel
                        </button>
                    </BlockButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreatePinTaskModal;
