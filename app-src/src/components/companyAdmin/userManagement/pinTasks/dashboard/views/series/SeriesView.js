import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React from 'react';
import SeriesTable from './SeriesTable';

const SeriesView = ({ startDate }) => {
    return (
        <div className="list-view size-lg-12">
            <BlockContainer contentClass="series">
                <SeriesTable />
            </BlockContainer>
        </div>
    );
};

export default SeriesView;
