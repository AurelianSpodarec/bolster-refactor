import React from 'react';

import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import Select from '../../../../../shared/generic/form/presentational/Select';
import { breakOptions, timeOptions } from 'constants/companyAdmin/options';

const WagesRegularHours = ({ form, handleDayChange, handleChange, days, timeDifference }) => {
    return (
        <>
            <BlockHeading
                title="Regular Hours"
                subTitle={`Selecting working hours will send push notifications to 
                            remind users to start and finish using timesheets. 
                            This will also flag irregular hours inside the 
                            timesheets area for your approval.`}
            />
            <div className="regular-hours-grid">
                <p>Day</p>
                <p></p>
                <p>Start</p>
                <p>Break</p>
                <p>End</p>
                <p>Total Hours</p>

                {days.map(day => (
                    <>
                        <Tickbox
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                            name={day}
                            handleChange={(name, value) => handleDayChange(name, value)}
                            checked={form[day] !== null}
                            value={form[day] !== null}
                        />

                        <p className={!form[day] ? 'disabled-opacity' : ''}>Between</p>

                        <Select
                            name="startTime"
                            value={form[day] && form[day].startTime}
                            onChange={(_, value) => handleChange(day, 'startTime', value)}
                            disabled={!form[day]}
                            extraClasses={!form[day] ? 'disabled-opacity' : ''}
                            options={timeOptions}
                            classes="large"
                            placeholder="-select-"
                        />
                        <Select
                            name="breakMinutes"
                            value={form[day] && form[day].breakMinutes}
                            onChange={(_, value) => handleChange(day, 'breakMinutes', value)}
                            disabled={!form[day]}
                            extraClasses={!form[day] ? 'disabled-opacity' : ''}
                            options={breakOptions}
                            classes="large"
                            placeholder="-select-"
                        />
                        <Select
                            name="endTime"
                            value={form[day] && form[day].endTime}
                            onChange={(_, value) => handleChange(day, 'endTime', value)}
                            disabled={!form[day]}
                            extraClasses={!form[day] ? 'disabled-opacity' : ''}
                            options={timeOptions}
                            classes="large"
                            placeholder="-select-"
                        />
                        <div className="flex-column justify-center">
                            <p className={!form[day] ? 'disabled-opacity' : ''}>
                                {(form[day] &&
                                    timeDifference(form[day].startTime, form[day].endTime)) ||
                                    '0'}
                            </p>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
};

export default WagesRegularHours;
