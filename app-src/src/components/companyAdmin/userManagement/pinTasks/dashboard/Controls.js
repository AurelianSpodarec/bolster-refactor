import React from 'react';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import moment from 'moment';
import { DATE_TIME_IDS, PIN_STATS_DASHBOARD_VIEW } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';

const viewOptions = [
    {
        value: PIN_STATS_DASHBOARD_VIEW.CALENDAR,
        label: 'Calendar',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.LIST,
        label: 'List',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.SERIES,
        label: 'Series',
    },
];

const Controls = ({ startDate, view, onViewChange, onPrev, onNext, onToday, endDate }) => {
    const disabled = view === PIN_STATS_DASHBOARD_VIEW.SERIES;

    return (
        <BlockHeading
            headerClasses="controls"
            title={
                <>
                    <div className="nav-buttons">
                        <button onClick={onPrev} disabled={disabled}>
                            <i className="far fa-chevron-left" />
                        </button>
                        <button onClick={onNext} disabled={disabled}>
                            <i className="far fa-chevron-right" />
                        </button>
                    </div>
                    <div className="date-range">
                        {disabled ? (
                            <p>Showing all</p>
                        ) : (
                            <>
                                <DateTimeContainer
                                    date={moment(startDate).toDate()}
                                    datetime={DATE_TIME_IDS.DATE}
                                />
                                -
                                <DateTimeContainer
                                    date={moment(endDate).toDate()}
                                    datetime={DATE_TIME_IDS.DATE}
                                />
                            </>
                        )}
                    </div>
                    <ButtonContainer
                        className="today-button"
                        setColour="transparent"
                        handleClick={onToday}
                        disabled={disabled}
                    >
                        <i className="far fa-calendar-week"></i> Today
                    </ButtonContainer>
                    <Select
                        name="view"
                        value={view}
                        onChange={(_, value) => onViewChange(value)}
                        options={viewOptions}
                        omitPlaceholder
                    />
                </>
            }
        />
    );
};

export default Controls;
