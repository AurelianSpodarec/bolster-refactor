import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { isEmpty } from 'helpers/generic';
import React from 'react';
import useSeries from './hooks/useSeries';
import SeriesListRow from './SeriesTableRow';

const SeriesTable = ({ startEditPinTaskSeries }) => {
    const headers = [
        'Operative',
        'Drawing',
        'Pins',
        'Series Start Date',
        'Series End Date',
        'Last Action Date',
    ];

    const { pinTaskSeriesMultiple, isFetching, error } = useSeries();

    return (
        <BlockContainer
            contentClass="series"
            isFetching={isFetching}
            error={error}
            isEmpty={isEmpty(pinTaskSeriesMultiple)}
        >
            <Table headers={headers}>
                {pinTaskSeriesMultiple.map((pinTaskSeries, i) => (
                    <SeriesListRow
                        key={i}
                        pinTaskSeries={pinTaskSeries}
                        startEditPinTaskSeries={startEditPinTaskSeries}
                    />
                ))}
            </Table>
        </BlockContainer>
    );
};

export default SeriesTable;
