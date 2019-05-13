import React from 'react';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import OperativeAlertMetricsTable from './OperativeAlertMetricsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import OperativeAlertsChart from './OperativeAlertsChart';

const OperativeAlertMetrics = ({ alerts, isFetching, error, users, alert }) => (
    <>
        <PageHeading title="Operative alerts" withBackButton />
        <BlockContainer>
            <FieldOutput title="Message" description={alert.message} />
            <div className="size-lg-12">
                <FieldOutput title="Created on" sizeClass="size-lg-4">
                    <p>
                        <DateTimeContainer date={alert.createdOn} />
                    </p>
                </FieldOutput>
                <FieldOutput
                    title="Sent by"
                    sizeClass="size-lg-4"
                    description={`${alert.createdByUserFirstName} ${
                        alert.createdByUserLastName
                    }`}
                />
                <div className="size-lg-4">
                    <OperativeAlertsChart alerts={alerts} alert={alert} />
                </div>
            </div>
            <div className="size-lg-12">
                <FieldOutput
                    sizeClass="size-lg-4"
                    title="Sent Count"
                    description={String(alert.sentCount)}
                />
                <FieldOutput
                    sizeClass="size-lg-4"
                    title="Delivered Count"
                    description={String(alert.deliveredCount)}
                />
                <FieldOutput
                    sizeClass="size-lg-4"
                    title="Read Count"
                    description={String(alert.readCount)}
                />
            </div>
        </BlockContainer>
        <BlockContainer>
            <OperativeAlertMetricsTable
                alerts={alerts}
                isFetching={isFetching}
                error={error}
                users={users}
            />
        </BlockContainer>
    </>
);

export default OperativeAlertMetrics;
