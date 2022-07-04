import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { CURRENCY_SYMBOLS } from 'constants/companyAdmin/enums';
import { formatAsHrsMins, formatCurrency } from 'helpers/generic';

import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import StickyComponent from 'components/shared/sticky/StickyComponent';
import useIsAdminPlus from '../../../../../../../hooks/useIsAdminPlus';

const ApprovedHoursBreakdown = ({ dailyHoursBreakdown, selectedDate }) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    const thisDay = dailyHoursBreakdown.find(day => moment(day.date).isSame(selectedDate, 'day'));

    const isAdminPlus = useIsAdminPlus();

    if (!thisDay) return null;
    return (
        <StickyComponent>
            <BlockContainer contentClass="inner-pod sticky" isEmpty={!thisDay}>
                <BlockHeading title="Approved Hours Breakdown" />
                <div className="divider" />
                <div className="table-container">
                    <Table
                        headers={[
                            'Job References',
                            'Hours Worked',
                            'Operatives',
                            isAdminPlus ? 'Wage Split' : '',
                        ]}
                        isFetching={false}
                        error={null}
                        noData={!thisDay?.jobReferenceBreakdowns?.length}
                        noDataMessage="No hours to display."
                    >
                        {thisDay.jobReferenceBreakdowns.map(
                            ({
                                jobReferenceID,
                                jobReferenceName,
                                totalHours,
                                totalOperatives,
                                totalWageSplit,
                            }) => {
                                return (
                                    <tr key={jobReferenceID}>
                                        <td>{jobReferenceName}</td>
                                        <td>{formatAsHrsMins(totalHours)}</td>
                                        <td>{totalOperatives}</td>
                                        {isAdminPlus && (
                                            <td>
                                                {currencySymbol}
                                                {formatCurrency(totalWageSplit) || '0.00'}
                                            </td>
                                        )}
                                    </tr>
                                );
                            },
                        )}
                        <tr className="total-row">
                            <td>Total</td>
                            <td>{formatAsHrsMins(thisDay.totalHours)}</td>
                            <td>{thisDay.totalOperatives}</td>
                            {isAdminPlus && (
                                <td>
                                    {currencySymbol}
                                    {formatCurrency(thisDay.totalWageSplit) || '0.00'}
                                </td>
                            )}
                        </tr>
                        {isAdminPlus && (
                            <tr className="total-row">
                                <td>Expenses</td>
                                <td></td>
                                <td></td>
                                <td>
                                    {currencySymbol}
                                    {formatCurrency(thisDay.totalExpenses) || '0.00'}
                                </td>
                            </tr>
                        )}
                    </Table>
                </div>
                {isAdminPlus && (
                    <>
                        <div className="divider" />
                        <div className="shift-total">
                            <span>Total exc VAT:</span>
                            <span className="total">
                                {currencySymbol}
                                {formatCurrency(thisDay.overallTotal) || '0.00'}
                            </span>
                        </div>
                    </>
                )}
            </BlockContainer>
        </StickyComponent>
    );
};

export default ApprovedHoursBreakdown;
