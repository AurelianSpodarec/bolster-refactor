import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownOptionsList from './DropdownOptionsList';

const DropdownOptionsTable = ({
    headers,
    dropdownOptions,
    isFetching,
    error,
    title
}) => {
    return (
        <BlockContainer>
            <BlockHeading title={title}>
                <Link
                    className="button green"
                    to="/company/users-management/company-admins/create"
                >
                    <i className="fa fa-plus" /> {`Add ${title}`}
                </Link>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!dropdownOptions.length}
                noDataMessage="No dropdown options to display"
                extraClasses="large"
            >
                <DropdownOptionsList
                    colCount={headers.length}
                    dropdownOptions={dropdownOptions}
                />
            </Table>
        </BlockContainer>
    );
};

export default DropdownOptionsTable;
