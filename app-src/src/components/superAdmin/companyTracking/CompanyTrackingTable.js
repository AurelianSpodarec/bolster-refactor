import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'helpers/generic';
import Table from 'components/shared/generic/tables/presentational/Table';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import DatePickerPresentational from 'components/shared/generic/form/presentational/DatePicker';
import ContactContacted from './CompanyContacted';
import {
    COMPANY_TRACKING_PERIOD_KEY,
    COMPANY_TRACKING_PERIOD_TYPE,
} from 'constants/superAdmin/enums';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import { companyTrackingShowWarning } from 'helpers/general';

const headers = [
    'Name',
    'Owner Info',
    'Date Created',
    'Most Recent Resubscription',
    'Subscription Expiry',
    'Auto Renew',
    'Services',
    'Contacted After 1 Month?',
    'Contacted After 3 Month?',
    'Contacted After 11 Month?',
];

const CompanyTrackingTable = ({ dates, setDates }) => {
    const { adminServices, companies, isFetching, error } = useSelector(mapStateToProps);
    const today = new Date();

    return (
        <div className="company-tracking-container">
            <div className="company-tracking-filters">
                <div className="flex item ">
                    <p className="">Start Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                            selected={dates.dateFrom}
                            onChange={date =>
                                setDates({
                                    ...dates,
                                    dateFrom: date,
                                })
                            }
                            placeholderText="Start Date"
                            maxDate={today}
                        />
                    </div>
                </div>
                <div className="flex item ">
                    <p className="">End Date:</p>
                    <div className="flex">
                        <DatePickerPresentational
                            selected={dates.dateTo}
                            onChange={date =>
                                setDates({
                                    ...dates,
                                    dateTo: date,
                                })
                            }
                            placeholderText="End Date"
                            maxDate={today}
                        />
                    </div>
                </div>
            </div>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={isEmpty(companies)}
                noDataMessage="No companies to display"
            >
                {Object.values(companies)
                    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
                    .map(company => {
                        const { period, showWarning } = companyTrackingShowWarning(company);

                        return (
                            <tr
                                className={`${showWarning ? 'warning' : ''}`}
                                key={company.companyID}
                            >
                                <td className="center">
                                    {showWarning && (
                                        <TooltipContainer
                                            htmlText={`This company has yet to be contacted within a ${COMPANY_TRACKING_PERIOD_KEY[
                                                period
                                            ].toLowerCase()} period`}
                                            containerSide="left"
                                        >
                                            <i className="far fa-exclamation-triangle red-icon" />
                                        </TooltipContainer>
                                    )}
                                    {company.companyName}
                                </td>
                                <td>
                                    {company.accountOwnerName} - {company.accountOwnerEmail}
                                </td>
                                <td>
                                    <DateTimeContainer date={company.companyCreatedOn} />
                                </td>
                                <td>
                                    <DateTimeContainer date={company.latestSubscriptionStartOn} />
                                </td>
                                <td>
                                    <DateTimeContainer date={company.latestSubscriptionEndOn} />
                                </td>
                                <td>
                                    {company.autoRenew ? (
                                        <i className="fa fa-check" />
                                    ) : (
                                        <i className="fa fa-times" />
                                    )}
                                </td>
                                <td>
                                    {company.serviceIDs &&
                                        adminServices &&
                                        company.serviceIDs
                                            .split(',')
                                            .map(item =>
                                                adminServices[item]
                                                    ? adminServices[item].name
                                                    : item,
                                            )
                                            .join(', ')}
                                </td>
                                <td>
                                    <ContactContacted
                                        contacted={company.contactedAfterMonth}
                                        period={COMPANY_TRACKING_PERIOD_TYPE.ONE_MONTH}
                                        companyID={company.companyID}
                                    />
                                </td>
                                <td>
                                    <ContactContacted
                                        contacted={company.contactedAfterThreeMonths}
                                        period={COMPANY_TRACKING_PERIOD_TYPE.THREE_MONTHS}
                                        companyID={company.companyID}
                                    />
                                </td>
                                <td>
                                    <ContactContacted
                                        contacted={company.contactedAfterElevenMonths}
                                        period={COMPANY_TRACKING_PERIOD_TYPE.ELEVEN_MONTHS}
                                        companyID={company.companyID}
                                    />
                                </td>
                            </tr>
                        );
                    })}
            </Table>
        </div>
    );
};

const mapStateToProps = ({
    superAdmin: {
        companyTrackingReducer: { companies, isFetching, error },
        adminServicesReducer: { adminServices, isFetching: isFetchingServices },
    },
}) => ({
    adminServices,
    companies,
    isFetching: isFetching || isFetchingServices,
    error,
});

export default CompanyTrackingTable;
