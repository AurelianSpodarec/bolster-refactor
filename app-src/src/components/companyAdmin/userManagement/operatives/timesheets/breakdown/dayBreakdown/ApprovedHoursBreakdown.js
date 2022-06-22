import React, { useMemo } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import { formatCurrency } from 'helpers/generic';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS, SHIFT_STATUS } from 'constants/companyAdmin/enums';

const ApprovedHoursBreakdown = ({
    shiftsForToday = [],
    grandTotal = 0,
    expensesTotal = 0,
    jobRefTotal = 0,
}) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    const jobReferences = useMemo(() => {
        // const approvedShifts = shiftsForToday.filter(
        //     shift => shift.status === SHIFT_STATUS.APPROVED,
        // );
        // const approvedClockerEntries = approvedShifts.reduce((acc, curr) => {
        //     if (curr.status !== SHIFT_STATUS.APPROVED) return acc;
        //     return acc.concat(curr.clockerEntries);
        // }, []);
        // const jobRefTally = approvedClockerEntries.reduce((tally, entry) => {
        //     const { jobReferenceID, jobReference, totalHours, companyUserID } = entry;

        //     let idToUse = jobReferenceID;
        //     let nameToUse = jobReference;
        //     if (!jobReferenceID) idToUse = 'noRef';
        //     if (!jobReference) nameToUse = 'N/A';

        //     if (tally[idToUse]) {
        //         tally[idToUse].totalHours += totalHours;

        //         if (!tally[idToUse].companyUserIDs.some(id => id === companyUserID))
        //             tally[idToUse].companyUserIDs.push(companyUserID);
        //     } else {
        //         tally[idToUse] = {
        //             jobReferenceID,
        //             jobReference: nameToUse,
        //             totalHours,
        //             companyUserIDs: [companyUserID],
        //         };
        //     }
        //     return tally;
        // }, {});
        // return Object.values(jobRefTally);

        return [];
    }, [shiftsForToday]);

    const totalRow = jobReferences.reduce(
        (acc, curr) => ({
            totalHours: acc.totalHours + curr.totalHours,
            companyUserIDs: acc.companyUserIDs
                .filter(id => !curr.companyUserIDs.includes(id))
                .concat(curr.companyUserIDs),
        }),
        { totalHours: 0, companyUserIDs: [] },
    );

    return (
        <BlockContainer contentClass="inner-pod sticky">
            <BlockHeading title="Approved Hours Breakdown" />
            <div className="divider" />
            <div className="table-container">
                <Table
                    headers={['Job References', 'Hours Worked', 'Operatives', 'Wage Split']}
                    isFetching={false}
                    error={null}
                    noData={false}
                    noDataMessage="No hours to display."
                >
                    {jobReferences.map(({ jobReference, totalHours, companyUserIDs }, i) => {
                        return (
                            <tr key={i}>
                                <td>{jobReference}</td>
                                <td>{totalHours.toFixed(2)}</td>
                                <td>{companyUserIDs.length}</td>
                                <td>0.00</td>
                            </tr>
                        );
                    })}
                    <tr className="total-row">
                        <td>Total</td>
                        <td>{totalRow.totalHours.toFixed(2)}</td>
                        <td>{totalRow.companyUserIDs.length}</td>
                        <td>
                            {currencySymbol}
                            {formatCurrency(jobRefTotal) || '0.00'}
                        </td>
                    </tr>
                    <tr className="total-row">
                        <td>Expenses</td>
                        <td></td>
                        <td></td>
                        <td>
                            {currencySymbol}
                            {formatCurrency(expensesTotal) || '0.00'}
                        </td>
                    </tr>
                </Table>
            </div>
            <div className="divider" />
            <div className="shift-total">
                <span>Total exc VAT:</span>
                <span className="total">
                    {currencySymbol}
                    {formatCurrency(grandTotal) || '0.00'}
                </span>
            </div>
        </BlockContainer>
    );
};

export default ApprovedHoursBreakdown;
