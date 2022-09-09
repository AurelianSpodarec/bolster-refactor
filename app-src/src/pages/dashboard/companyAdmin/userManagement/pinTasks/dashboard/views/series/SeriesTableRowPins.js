import React from 'react';
import useSeriesPinTaskModal from './seriesPinTaskModal/hooks/useSeriesPinTaskModal';

const SeriesTableRowPins = ({ pinCount, pins, isFetching, error }) => {
    const { handleShowSeriesPinTaskModal } = useSeriesPinTaskModal(pins, isFetching, error);
    return (
        <button className="button blue" onClick={handleShowSeriesPinTaskModal}>
            Click to view ({pinCount})
        </button>
    );
};

export default SeriesTableRowPins;
