import React, { useEffect, useMemo, useRef, useState } from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import { formatCurrency } from 'helpers/generic';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from 'selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS, SHIFT_STATUS } from 'constants/companyAdmin/enums';
import { usePrevious } from 'helpers/hooks';
import moment from 'moment';

const ApprovedHoursBreakdown = ({
    dailyHoursBreakdown,
    selectedDate,
    grandTotal = 0,
    expensesTotal = 0,
}) => {
    const currency = useSelector(selectCompanyCurrency);
    const currencySymbol = CURRENCY_SYMBOLS[currency];

    // const [width, setWidth] = useState(null);
    // const [top, setTop] = useState(85);
    const sizeRef = useRef(null);
    // const prevWindowWidth = usePrevious(window.innerWidth);

    const thisDay = dailyHoursBreakdown.find(day => moment(day.date).isSame(selectedDate, 'day'));

    const { totalHours, totalOperatives, totalWageSplit, jobReferenceBreakdowns } = thisDay;

    // useEffect(() => {
    //     if (sizeRef.current && (width === null || window.innerWidth !== prevWindowWidth)) {
    //         const { width } = sizeRef.current.getBoundingClientRect();
    //         setWidth(width);
    //     }
    // }, [sizeRef, prevWindowWidth, window.innerWidth, width]);

    // useEffect(() => {
    //     window.addEventListener('scroll', e => {
    //         console.log(e);
    //     });
    //     return () => {
    //         window.removeEventListener('scroll', () => {});
    //     };
    // }, []); // Todo - make approved hours pod sticky

    return (
        <div
            ref={sizeRef}
            // style={{
            //     maxWidth: width,
            //     position: 'fixed',
            //     top: '85px',
            //     boxSizing: 'border-box',
            // }}
        >
            <BlockContainer contentClass="inner-pod sticky">
                <BlockHeading title="Approved Hours Breakdown" />
                <div className="divider" />
                <div className="table-container">
                    <Table
                        headers={['Job References', 'Hours Worked', 'Operatives', 'Wage Split']}
                        isFetching={false}
                        error={null}
                        noData={!jobReferenceBreakdowns?.length}
                        noDataMessage="No hours to display."
                    >
                        {jobReferenceBreakdowns.map(
                            (
                                { jobReferenceName, totalHours, totalOperatives, totalWageSplit },
                                i,
                            ) => {
                                return (
                                    <tr key={i}>
                                        <td>{jobReferenceName}</td>
                                        <td>{totalHours}</td>
                                        <td>{totalOperatives}</td>
                                        <td>
                                            {currencySymbol}
                                            {formatCurrency(totalWageSplit) || '0.00'}
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        <tr className="total-row">
                            <td>Total</td>
                            <td>{totalHours.toFixed(2)}</td>
                            <td>{totalOperatives}</td>
                            <td>
                                {currencySymbol}
                                {formatCurrency(totalWageSplit) || '0.00'}
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
        </div>
    );
};

export default ApprovedHoursBreakdown;
