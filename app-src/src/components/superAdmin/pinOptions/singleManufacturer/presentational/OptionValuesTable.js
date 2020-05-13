import React from 'react';

import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const OptionValuesTable = ({
    handleAddOptionValueModal,
    headers,
    optionValues,
    isFetching,
    error,
    title,
    type,
}) => {
    return (
        <BlockContainer>
            <BlockHeading title={'Option Values'}>
                <button className="button green" onClick={handleAddOptionValueModal}>
                    <i className="fa fa-plus" /> {'Add Option Value'}
                </button>
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!optionValues.length}
                noDataMessage={'There are no option values to display.'}
                extraClasses="large"
            >
                {/* <ManufacturerList
                    colCount={headers.length}
                    optionValues={optionValues}
                    headers={headers}
                /> */}
            </Table>
        </BlockContainer>
    );
};

export default OptionValuesTable;
