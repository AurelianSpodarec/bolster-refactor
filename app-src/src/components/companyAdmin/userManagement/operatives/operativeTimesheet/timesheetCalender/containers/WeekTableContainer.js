import moment from 'moment';
import { useState } from 'react';
import WeekTable from '../presentational/WeekTable';

const WeekTableContainer = ({ startDate }) => {
    const [selected, setSelected] = useState(moment(new Date()).toISOString());
    return <WeekTable selected={selected} setSelected={setSelected} startDate={startDate} />;
};

export default WeekTableContainer;
