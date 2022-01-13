import React from 'react';
import useHierarchyAlerts from './hooks/useHierarchyAlerts';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import AlertItem from '../presentational/AlertItem';
import { isEmpty } from 'lodash';

const HierarchyAlerts = () => {
    const { alerts, isFetching, error } = useHierarchyAlerts();
    return (
        <>
            <PageHeading title="Upcoming Alerts" withBackButton />

            <BlockContainer isFetching={isFetching} error={error} isEmpty={isEmpty(alerts)}>
                <BlockHeading title="Alerts" />
                <Table
                    headers={[
                        'Date',
                        'Created On',
                        'Last sent on',
                        'Method',
                        'Creted by user/company',
                        'Frequency Amount',
                        'Message',
                    ]}
                    isFetching={isFetching}
                    error={error}
                    noData={isEmpty(alerts)}
                    noDataMessage="There are no alerts to display."
                >
                    {Object.values(alerts)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(alert => (
                            <AlertItem key={alert.id} alert={alert} />
                        ))}
                </Table>
            </BlockContainer>
        </>
    );
};

export default HierarchyAlerts;
