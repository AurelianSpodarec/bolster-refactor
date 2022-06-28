import React from 'react';
import { useSelector } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import moment from 'moment';
import getShiftPodData from '../../helpers/getShiftPodData';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { CURRENCY_SYMBOLS, SHIFT_STATUS, SHIFT_STATUS_REVERSE } from 'constants/companyAdmin/enums';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import {
    selectCompanyCurrency,
    selectCompanyTimeZone,
} from 'selectors/companyAdmin/companySettings';
import Table from 'components/shared/generic/tables/presentational/Table';
import HoursWorkedList from './HoursWorkedList';
import ExpensesList from './ExpensesList';
import { formatCurrency } from 'helpers/generic';
import useOverrideShift from './hooks/useOverrideShift';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';
import WarningIcon from '../../../../../../../_content/images/icons/Triangle_Warning.svg';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import ApproveShiftButton from './ApproveShiftButton';
import ApproveShiftMenuButton from './ApproveShiftMenuButton';
import RejectShiftMenuButton from './RejectShiftMenuButton';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import AddExpenseButton from './AddExpenseButton';

const ShiftPod = ({
    shift,
    shiftToEdit,
    setShiftToEdit,
    startDate,
    handleShowDeleteShiftModal,
}) => {
    const users = useSelector(selectCompanyUsers);
    const timeZone = useSelector(selectCompanyTimeZone);
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];
    const user = users[shift.companyUserID] || {};
    const isEditing = shiftToEdit === shift.id;

    const {
        timeIn,
        timeOut,
        breakTime,
        noOfHistories,
        jobReferences, // [{ jobRef, hoursWorked, wageSplit }]
        jobReferencesTotalHours,
        jobReferencesTotalCost,
        expenses, // [{ name, cost }]
        expensesTotal,
        shiftTotal,
        notes,
        status,
        overrideWage,
        overrideShiftTime,
        lateClockIn,
        lateClockOut,
    } = getShiftPodData(shift);

    const { isBolsterPlusActivated } = useBolsterPlus();

    const isTimeInDateTheSameAsTimeOut =
        moment.utc(timeIn).tz(timeZone).format('L') ===
        moment.utc(timeOut).tz(timeZone).format('L');

    const handleToggleEdit = () => setShiftToEdit(isEditing ? null : shift.id);

    const { formData, handleChange, handleSubmit, isPosting } = useOverrideShift(
        shift,
        handleToggleEdit,
        startDate,
        isEditing,
    );

    const statusClassLookup = {
        [SHIFT_STATUS.PENDING]: 'pending',
        [SHIFT_STATUS.APPROVED]: 'approved',
        [SHIFT_STATUS.REJECTED]: 'rejected',
    };

    return (
        <BlockContainer
            contentClass={`shift-pod ${isBolsterPlusActivated && statusClassLookup[status]}`}
        >
            <BlockHeading title={`${user.userFirstName} ${user.userLastName} (${user.userEmail})`}>
                <ButtonWrapper alignment="right">
                    {isBolsterPlusActivated && status === SHIFT_STATUS.PENDING ? (
                        <ApproveShiftButton shiftID={shift.id} />
                    ) : isBolsterPlusActivated && status !== SHIFT_STATUS.PENDING ? (
                        <ActionButton
                            size="small"
                            source="secondary"
                            text={SHIFT_STATUS_REVERSE[status]}
                            disabled
                        />
                    ) : null}
                    {isBolsterPlusActivated ? (
                        <ActionButton
                            size="small"
                            source="secondary"
                            icon="pencil"
                            iconOnly
                            onClick={handleToggleEdit}
                        />
                    ) : (
                        <TooltipContainer text="Edit is available for Bolster Plus users only.">
                            <ActionButton
                                size="small"
                                source="secondary"
                                icon="pencil"
                                iconOnly
                                onClick={handleToggleEdit}
                                disabled={true}
                            />
                        </TooltipContainer>
                    )}
                    {isBolsterPlusActivated ? (
                        <ActionMenu size="small">
                            {status !== SHIFT_STATUS.APPROVED && (
                                <ApproveShiftMenuButton shiftID={shift.id} />
                            )}
                            {status !== SHIFT_STATUS.REJECTED && (
                                <RejectShiftMenuButton shiftID={shift.id} />
                            )}
                            <ActionMenuActionButton
                                text="Delete"
                                onClick={() => handleShowDeleteShiftModal(shift.id)}
                                isNegative
                            />
                        </ActionMenu>
                    ) : (
                        <TooltipContainer text="Delete and Approve/Reject are available for Bolster Plus users only.">
                            <ActionMenu size="small" disabled={true}>
                                {status !== SHIFT_STATUS.APPROVED && (
                                    <ApproveShiftMenuButton shiftID={shift.id} />
                                )}
                                {status !== SHIFT_STATUS.REJECTED && (
                                    <RejectShiftMenuButton shiftID={shift.id} />
                                )}
                                <ActionMenuActionButton
                                    text="Delete"
                                    onClick={() => handleShowDeleteShiftModal(shift.id)}
                                    isNegative
                                />
                            </ActionMenu>
                        </TooltipContainer>
                    )}
                </ButtonWrapper>
            </BlockHeading>
            <div className="divider" />
            <div className="pod-row">
                <BlockContainer contentClass="inner-pod">
                    <FlexWrapper>
                        <BlockHeading title="Time In" />
                        {lateClockIn && (
                            <TooltipContainer side="right" text="Operative started shift late.">
                                <img alt="Warning Icon" src={WarningIcon} />
                            </TooltipContainer>
                        )}
                    </FlexWrapper>
                    <p>{moment.utc(timeIn).tz(timeZone).format('HH:mm:ss')}</p>
                </BlockContainer>
                <BlockContainer contentClass="inner-pod">
                    <FlexWrapper>
                        <BlockHeading title="Time Out" />
                        {lateClockOut && (
                            <TooltipContainer side="right" text="Operative finished shift late.">
                                <img alt="Warning Icon" src={WarningIcon} />
                            </TooltipContainer>
                        )}
                    </FlexWrapper>
                    <p>
                        {timeOut
                            ? isTimeInDateTheSameAsTimeOut
                                ? moment.utc(timeOut).tz(timeZone).format('HH:mm:ss')
                                : moment.utc(timeOut).tz(timeZone).format('DD-MM-YYYY hh:mm:ss')
                            : 'N/A'}
                    </p>
                </BlockContainer>
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Break Time" />
                    <p>{moment.utc(breakTime).tz(timeZone).format('HH:mm:ss')}</p>
                </BlockContainer>
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Histories" />
                    <p>{noOfHistories}</p>
                </BlockContainer>
            </div>
            <BlockContainer contentClass="inner-pod">
                <BlockHeading title="Hours" />
                <div className="divider" />
                <div className="table-container">
                    <Table
                        headers={['Job References', 'Hours Worked', 'Wage Split']}
                        isFetching={false}
                        error={null}
                        noData={!jobReferences.length}
                        noDataMessage="No jobs to display."
                    >
                        <HoursWorkedList
                            shiftID={shift.id}
                            jobReferences={jobReferences}
                            jobReferencesTotalCost={jobReferencesTotalCost}
                            jobReferencesTotalHours={jobReferencesTotalHours}
                            currencySymbol={currencySymbol}
                            formData={formData}
                            handleChange={handleChange}
                            isEditing={isEditing}
                            overrideWage={overrideWage}
                            overrideShiftTime={overrideShiftTime}
                        />
                    </Table>
                    {!!isEditing && (
                        <>
                            <div className="divider" />
                            <ButtonWrapper alignment="right">
                                <ActionButton
                                    size="small"
                                    text="Cancel"
                                    source="secondary"
                                    onClick={() => setShiftToEdit(null)}
                                />
                                <ActionButton
                                    size="small"
                                    text="Submit"
                                    ambient="positive"
                                    onClick={handleSubmit}
                                    isPosting={isPosting}
                                    disabled={isPosting}
                                />
                            </ButtonWrapper>
                        </>
                    )}
                </div>

                <BlockHeading title="Expenses" />
                <div className="divider" />
                <div className="table-container">
                    <Table
                        headers={['', '', '']}
                        isFetching={false}
                        error={null}
                        noData={!expenses.length}
                        noDataMessage="No expenses to display."
                    >
                        <ExpensesList
                            expenses={expenses}
                            expensesTotal={expensesTotal}
                            currencySymbol={currencySymbol}
                        />
                    </Table>
                    <ButtonWrapper alignment="right">
                        <AddExpenseButton shiftID={shift.id} />
                    </ButtonWrapper>
                </div>
                <div className="shift-total">
                    <span>Total exc VAT:</span>
                    <span className="total">
                        {currencySymbol}
                        {formatCurrency(shiftTotal) || '0.00'}
                    </span>
                </div>
            </BlockContainer>
            <BlockContainer contentClass="inner-pod">
                <BlockHeading title="Notes" />
                <div className="divider" />
                {notes.map((note, i) => (
                    <p key={`${i}-${note.uid}`}>{note.comments}</p>
                ))}
            </BlockContainer>
        </BlockContainer>
    );
};

export default ShiftPod;
