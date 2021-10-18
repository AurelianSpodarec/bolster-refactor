import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DatePickerContainer from 'components/shared/generic/form/containers/DatePickerContainer';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Form from 'components/shared/generic/form/containers/Form';
import PickListContainer from 'components/shared/generic/form/containers/PickListContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import { DAY, RECURRING_TYPE } from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    const [{ date, recurring, days }, handleChange] = useForm({
        date: initialDate ?? new Date(),
        recurring: RECURRING_TYPE.NONE,
        days,
    });

    const isWeekly = recurring === RECURRING_TYPE.WEEKLY;

    useEffect(() => {
        if (!isWeekly) {
            handleChange('days', []);
            dispatch(removeFieldError('days'));
        }
    }, [isWeekly]);

    return (
        <ModalOuterContainer extraClasses="create-pin-task-modal">
            <Form onSubmit={() => {}}>
                <div className="size-lg-12 header">
                    <div className="size-lg-6">
                        <BlockHeading title="Create Task" />
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
                        <Field name="date" sizeClasses="size-lg-6">
                            <DatePickerContainer
                                name="date"
                                selected={new Date(date)}
                                onChange={value => handleChange('name', value)}
                            />
                        </Field>
                    </div>
                </div>
                <div className="size-lg-12">
                    {false && <Loading message="Loading task..." />}

                    <div className="size-lg-12">
                        <ButtonContainer type="submit">Submit</ButtonContainer>
                    </div>
                </div>
            </Form>
            ¸
        </ModalOuterContainer>
    );
};

export default CreatePinTaskModal;
