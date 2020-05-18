import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ManufacturerList from './ManufacturerList';

const ManufacturerTable = ({
    handleAddManufacturerModal,
    headers,
    manufacturers,
    isFetching,
    error,
}) => {
    return (
        <BlockContainer>
            <div className="size-lg-12">
                <BlockHeading title="Manufacturers" classes="w-table">
                    <button
                        className="pull-right button green"
                        onClick={handleAddManufacturerModal}
                    >
                        <i className="fa fa-plus" /> {'Add Manufacturer'}
                    </button>
                </BlockHeading>
                <div className="size-lg-12">
                    <Table
                        withActions
                        headers={headers}
                        isFetching={isFetching}
                        error={error}
                        noData={!manufacturers.length}
                        noDataMessage={'There are no manufacturers to display.'}
                        extraClasses="large"
                    >
                        <ManufacturerList
                            colCount={headers.length}
                            manufacturers={manufacturers}
                            headers={headers}
                        />
                    </Table>
                </div>
            </div>
        </BlockContainer>
    );
};

export default ManufacturerTable;
