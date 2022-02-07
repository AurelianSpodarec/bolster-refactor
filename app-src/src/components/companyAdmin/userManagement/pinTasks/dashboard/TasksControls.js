import React from 'react';
import moment from 'moment';

import useTasksFilters from './_hooks/useTasksFilters';

import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Select from 'components/shared/generic/form/presentational/Select';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';

import { DATE_TIME_IDS, PIN_STATS_DASHBOARD_VIEW } from 'constants/companyAdmin/enums';

const viewOptions = [
    {
        value: PIN_STATS_DASHBOARD_VIEW.CALENDAR,
        label: 'Calendar - Monthly',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.LIST,
        label: 'List - Weekly',
    },
    {
        value: PIN_STATS_DASHBOARD_VIEW.SERIES,
        label: 'Series',
    },
];

const TasksControls = ({ startDate, view, onViewChange, onPrev, onNext, onToday, endDate }) => {
    const disabled = view === PIN_STATS_DASHBOARD_VIEW.SERIES;
    const buttonText = view === PIN_STATS_DASHBOARD_VIEW.LIST ? 'Week' : 'Month';

    const { form, handleChange, serviceOptions, siteOptions, operativeOptions } = useTasksFilters();

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
                    {!disabled && (
                        <ButtonContainer
                            className="today-button"
                            setColour="transparent"
                            handleClick={onToday}
                            disabled={disabled}
                        >
                            <i className="far fa-calendar-week"></i> This {buttonText}
                        </ButtonContainer>
                    )}
                    <div className="filters-wrapper">
                        <Select
                            name="view"
                            value={view}
                            onChange={(_, value) => onViewChange(value)}
                            options={viewOptions}
                            omitPlaceholder
                        />

                        <MultiSelect
                            name="services"
                            value={form.services}
                            onChange={handleChange}
                            options={serviceOptions}
                            placeholder="service"
                            classes="x-large"
                            search
                        />

                        <MultiSelect
                            name="operatives"
                            value={form.operatives}
                            onChange={handleChange}
                            options={operativeOptions}
                            placeholder="operative"
                            classes="x-large"
                            search
                        />

                        <MultiSelect
                            name="sites"
                            value={form.sites}
                            onChange={handleChange}
                            options={siteOptions}
                            placeholder="site"
                            classes="x-large"
                            search
                        />
                    </div>
                </>
            }
        />
    );
};

export default TasksControls;
