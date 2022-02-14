import React from 'react';
import SeriesTable from './SeriesTable';

const SeriesView = ({ startEditPinTaskSeries }) => {
    return (
        <div className="list-view size-lg-12">
            <SeriesTable startEditPinTaskSeries={startEditPinTaskSeries} />
        </div>
    );
};

export default SeriesView;
