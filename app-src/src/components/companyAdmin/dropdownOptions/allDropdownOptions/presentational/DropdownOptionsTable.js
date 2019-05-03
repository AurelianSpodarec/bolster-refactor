import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

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
    title,
    type
}) => {
    return (
        <BlockContainer>
            <BlockHeading title={title}>
                <button className="button green" onClick={handleAddOptionModal}>
                    <i className="fa fa-plus" />{' '}
                    {`Add ${DROPDOWN_OPTIONS[type].singular}`}
                </button>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!dropdownOptions.length}
                noDataMessage={`No ${DROPDOWN_OPTIONS[type].name} To Display.`}
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
