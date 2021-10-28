import React from 'react';
import SeriesTable from './SeriesTable';

const SeriesView = ({ startDate, startEditPinTaskSeries }) => {
    return (
        <div className="list-view size-lg-12">
            <SeriesTable startDate={startDate} startEditPinTaskSeries={startEditPinTaskSeries} />
        </div>
    );
};

export default SeriesView;
