import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownOptionsList from './DropdownOptionsList';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';

const DropdownOptionsTable = ({
    handleAddOptionModal,
    headers,
    dropdownOptions,
    isFetching,
    error,
    title,
    type,
    moveItem,
    isSorting,
    serviceFilterOptions,
    selectedService,
    handleChange,
}) => {
    return (
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title={title} classes="w-table">
                    <div className="pin-option-filters">
                        <Dropdown
                            placeholder="--select service option--"
                            name="status"
                            options={serviceFilterOptions}
                            selectedOption={selectedService}
                            handleChange={handleChange}
                        />

                        <button className="button green" onClick={handleAddOptionModal}>
                            <i className="fa fa-plus" /> {`Add ${DROPDOWN_OPTIONS[type].singular}`}
                        </button>
                    </div>
                </BlockHeading>

                <div className="size-lg-12">
                    <Table
                        withActions
                        headers={headers}
                        isFetching={isFetching}
                        error={error}
                        noData={!dropdownOptions.length}
                        noDataMessage={`There are no ${DROPDOWN_OPTIONS[type].name} to display.`}
                        extraClasses="large"
                        withoutTBody
                    >
                        <DropdownOptionsList
                            colCount={headers.length}
                            dropdownOptions={dropdownOptions}
                            headers={headers}
                            type={type}
                            moveItem={moveItem}
                            isSorting={isSorting}
                        />
                    </Table>
                </div>
            </div>
        </BlockContainer>
    );
};

export default DropdownOptionsTable;
