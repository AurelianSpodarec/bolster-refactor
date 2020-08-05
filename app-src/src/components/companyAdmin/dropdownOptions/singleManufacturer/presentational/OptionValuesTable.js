import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

import OptionValuesList from './OptionValuesList';
import DropdownListSortOrderContainer from '../../allDropdownOptions/containers/DropdownListSortOrderContainer';
import { DEFAULT_PIN_OPTIONS_SORT } from 'constants/companyAdmin/enums';

const OptionValuesTable = ({
    handleAddOptionValueModal,
    headers,
    optionValues,
    isFetching,
    error,
    services,
    selectedSortValue,
    handleSortChange,
    moveItem,
}) => {
    return (
        <BlockContainer>
            <BlockHeading title={'Option Values'}>
                <button className="button green" onClick={handleAddOptionValueModal}>
                    <i className="fa fa-plus" /> {'Add Option Value'}
                </button>
            </BlockHeading>
            <DropdownListSortOrderContainer
                selectedSortValue={selectedSortValue}
                handleSortChange={handleSortChange}
            />
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!optionValues.length}
                noDataMessage={'There are no option values to display.'}
                extraClasses="large"
                withoutTBody
            >
                <OptionValuesList
                    colCount={headers.length}
                    optionValues={optionValues}
                    headers={headers}
                    services={services}
                    isCustomSort={+selectedSortValue === DEFAULT_PIN_OPTIONS_SORT.CUSTOM}
                    moveItem={moveItem}
                />
            </Table>
        </BlockContainer>
    );
};

export default OptionValuesTable;
