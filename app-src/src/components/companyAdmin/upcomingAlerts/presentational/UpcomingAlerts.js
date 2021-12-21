import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Search from 'components/shared/generic/form/presentational/Search';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { useForm } from 'helpers/hooks';
import React from 'react';

const UpcomingAlerts = () => {
    const [fields, handleChange] = useForm({
        email: '',
        selectedRole: 0,
    });
    return (
        <>
            <PageHeading title="Upcoming Alerts" withBackButton />
            <BlockContainer>
                <form className="table-search size-lg-12">
                    <Search
                        value={fields.email}
                        name="email"
                        placeholder="Search by email address..."
                        handleChange={handleChange}
                    />
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
