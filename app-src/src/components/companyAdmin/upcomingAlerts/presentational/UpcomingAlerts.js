import React from 'react';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import Table from 'components/shared/generic/tables/presentational/Table';
import useUpcomingAlerts from '../hooks/useUpcomingAlerts';

const UpcomingAlerts = ({ isFetching, alerts }) => {
    const { fields, handleChange } = useUpcomingAlerts();

    return (
        <>
            <PageHeading title="Upcoming Alerts" withBackButton />
            <BlockContainer>
                <form className="table-search size-lg-12">
                    <div className="table-filter">
                        <Dropdown
                            placeholder="All alerts"
                            name="alerts"
                            options={[]}
                            selectedOption={fields.selectedRole}
                            handleChange={handleChange}
                        />
                        <p>Filter:</p>
                    </div>
                </form>
            </BlockContainer>
            <BlockContainer>
                <BlockHeading title="Alerts" />
                <Table
                    headers={['Created On', 'Alert', 'Frequency']}
                    withActions
                    isFetching={isFetching}
                    noData={!alerts.length}
                    noDataMessage="There are no alerts to display."
                    alerts={alerts}
                ></Table>
            </BlockContainer>
        </>
    );
};

export default UpcomingAlerts;
