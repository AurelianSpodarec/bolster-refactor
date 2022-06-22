import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';
import { formatCurrency } from 'helpers/generic';

const ApprovedHoursBreakdown = ({ currencySymbol = '£' }) => {
    return (
        <BlockContainer contentClass="inner-pod">
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
                    {[].map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>###</td>
                                <td>###</td>
                                <td>###</td>
                                <td>0.00</td>
                            </tr>
                        );
                    })}
                    <tr className="total-row">
                        <td>Total</td>
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                    </tr>
                </Table>
            </div>
            <div className="divider" />
            <div className="shift-total">
                <span>Total exc VAT:</span>
                <span className="total">
                    {currencySymbol}
                    {'0.00'}
                </span>
            </div>
        </BlockContainer>
    );
};

export default ApprovedHoursBreakdown;
