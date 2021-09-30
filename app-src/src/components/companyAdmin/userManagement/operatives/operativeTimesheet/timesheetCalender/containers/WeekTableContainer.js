import { useState } from 'react';
import WeekTable from '../presentational/WeekTable';

const WeekTableContainer = () => {
    const [selected, setSelected] = useState(0);
    return <WeekTable selected={selected} setSelected={setSelected} />;
};

export default WeekTableContainer;
