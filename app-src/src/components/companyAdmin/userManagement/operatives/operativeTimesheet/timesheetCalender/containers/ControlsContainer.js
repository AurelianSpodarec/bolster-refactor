import React from 'react';
import Controls from '../presentational/Controls';

const ControlsContainer = ({ startDate, onPrev, onNext, onToday }) => {
    return <Controls startDate={startDate} onPrev={onPrev} onNext={onNext} onToday={onToday} />;
};

export default ControlsContainer;
