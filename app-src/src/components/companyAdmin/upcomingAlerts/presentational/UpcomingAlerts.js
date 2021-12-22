import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import React from 'react';
import useUpcomingAlerts from '../hooks/useUpcomingAlerts';

const UpcomingAlerts = () => {
    const { fields, handleChange } = useUpcomingAlerts();

    return (
        <>
            <PageHeading title="Upcoming Alerts" withBackButton />
            <BlockContainer>
                <form className="table-search size-lg-12">
                    <div className="table-filter">
                        <Dropdown
                            placeholder="All roles"
                            name="role"
                            options={[]}
                            selectedOption={fields.selectedRole}
                            handleChange={handleChange}
                        />
                        <p>Filter by role:</p>
                    </div>
                </form>
            </BlockContainer>
            <BlockContainer>
                <BlockHeading title="Users" />
                Table goes here
            </BlockContainer>
        </>
    );
};

export default UpcomingAlerts;
