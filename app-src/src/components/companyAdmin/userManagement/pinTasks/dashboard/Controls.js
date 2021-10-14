import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import moment from 'moment';
import { DATE_TIME_IDS, PIN_STATS_DASHBOARD_VIEW } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const viewOptions = [
    {
        value: PIN_STATS_DASHBOARD_VIEW.CALENDER,
        text: 'Calender',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.LIST,
        text: 'List',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.SERIES,
        text: 'Series',
    },
];

const Controls = ({ startDate, view, timePeriod, onViewChange, onPrev, onNext, onToday }) => {
    return (
        <BlockHeading
            headerClasses="controls"
            title={
                <>
                    <div className="nav-buttons">
                        <button onClick={onPrev}>
                            <i className="far fa-chevron-left" />
                        </button>
                        <button onClick={onNext}>
                            <i className="far fa-chevron-right" />
                        </button>
                    </div>
                    <div className="date-range">
                        <DateTimeContainer
                            date={moment(startDate).toDate()}
                            datetime={DATE_TIME_IDS.DATE}
                        />
                        -
                        <DateTimeContainer
                            date={moment(startDate).add(1, timePeriod).subtract(1, 'day').toDate()}
                            datetime={DATE_TIME_IDS.DATE}
                        />
                    </div>
                    <ButtonContainer
                        className="today-button"
                        setColour="transparent"
                        handleClick={onToday}
                    >
                        <i className="far fa-calendar-week"></i> Today
                    </ButtonContainer>
                    <DropdownContainer
                        name="view"
                        value={viewOptions.find(option => option.value === view)}
                        handleChange={(_, value) => onViewChange(value)}
                        options={viewOptions}
                        withoutPlaceholder
                    />
                </>
            }
        />
    );
};

export default Controls;
