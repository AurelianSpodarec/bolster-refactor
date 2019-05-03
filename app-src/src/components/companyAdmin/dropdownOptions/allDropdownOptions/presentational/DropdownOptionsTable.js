import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownOptionsList from './DropdownOptionsList';

const DropdownOptionsTable = ({
    handleAddOptionModal,
    headers,
    dropdownOptions,
    isFetching,
    error,
    title
}) => {
    return (
        <BlockContainer>
            <BlockHeading title={title}>
                <button className="button green" onClick={handleAddOptionModal}>
                    <i className="fa fa-plus" /> {`Add ${title}`}
                </button>
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
