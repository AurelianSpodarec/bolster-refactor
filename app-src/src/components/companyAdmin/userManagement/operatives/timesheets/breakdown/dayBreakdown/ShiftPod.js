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
import useEditShift from './hooks/useEditShift';

const ShiftPod = ({ shift, shiftToEdit, setShiftToEdit }) => {
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
        groupUID,
    } = getShiftPodData(shift);

    const { formData, handleChange, handleSubmit } = useEditShift(shift);

    const handleToggleEdit = () => setShiftToEdit(isEditing ? null : shift.id);

    const statusClassLookup = {
        [SHIFT_STATUS.PENDING]: 'pending',
        [SHIFT_STATUS.APPROVED]: 'approved',
        [SHIFT_STATUS.REJECTED]: 'rejected',
    };

    return (
        <BlockContainer key={shift.id} contentClass={`shift-pod ${statusClassLookup[status]}`}>
            <BlockHeading title={`${user.userFirstName} ${user.userLastName} (${user.userEmail})`}>
                <ButtonWrapper alignment="right">
                    {status === SHIFT_STATUS.PENDING ? (
                        <ActionButton size="small" ambient="positive" text={'Approve'} />
                    ) : (
                        <ActionButton
                            size="small"
                            source="secondary"
                            text={SHIFT_STATUS_REVERSE[status]}
                            disabled
                        />
                    )}
                    <ActionButton
                        size="small"
                        source="secondary"
                        icon="pencil"
                        iconOnly
                        onClick={handleToggleEdit}
                    />
                    <ActionButton
                        size="small"
                        source="secondary"
                        ambient="negative"
                        icon="trash"
                        iconOnly
                    />
                </ButtonWrapper>
            </BlockHeading>
            <div className="divider" />
            <div className="pod-row">
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Time In" />
                    <p>{moment.utc(timeIn).tz(timeZone).format('HH:mm:ss')}</p>
                </BlockContainer>
                <BlockContainer contentClass="inner-pod">
                    <BlockHeading title="Time Out" />
                    <p>{moment.utc(timeOut).tz(timeZone).format('HH:mm:ss')}</p>
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
                            jobReferences={jobReferences}
                            jobReferencesTotalCost={jobReferencesTotalCost}
                            jobReferencesTotalHours={jobReferencesTotalHours}
                            currencySymbol={currencySymbol}
                            formData={formData}
                            handleChange={handleChange}
                            isEditing={isEditing}
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
                                    onClick={() => {}}
                                />
                            </ButtonWrapper>
                        </>
                    )}
                </div>

                <BlockHeading title="Expenses" />
                <div className="divider" />
                <div className="table-container">
                    <Table
                        headers={['', '']}
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
                        <ActionButton
                            size="small"
                            icon="plus"
                            text="Create new"
                            onClick={() => {}}
                        />
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
                {notes.map(note => (
                    <p key={note.uid}>{note.comments}</p>
                ))}
            </BlockContainer>
        </BlockContainer>
    );
};

export default ShiftPod;
