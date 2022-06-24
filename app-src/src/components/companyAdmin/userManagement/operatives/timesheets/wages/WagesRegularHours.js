import React from 'react';

import useWagesRegularHours from './hooks/useWagesRegularHours';

import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import TimePickerContainer from '../../../../../shared/generic/form/containers/TimePickerContainer';
import NumberInputContainer from '../../../../../shared/generic/form/containers/NumberInputContainer';

const WagesRegularHours = () => {
    const { form, handleDayChange, handleChange, days, timeDifference } = useWagesRegularHours();

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
                        <p>Between</p>
                        <TimePickerContainer
                            name="startTime"
                            value={form[day] && form[day].startTime}
                            handleChange={value => handleChange(day, 'startTime', value)}
                            disabled={!form[day]}
                        />
                        <NumberInputContainer
                            name="breakMinutes"
                            value={form[day] && form[day].breakMinutes}
                            handleChange={(name, value) => handleChange(day, name, value)}
                            placeholder="-"
                            disabled={!form[day]}
                        />
                        <TimePickerContainer
                            name="endTime"
                            value={form[day] && form[day].endTime}
                            handleChange={value => handleChange(day, 'endTime', value)}
                            disabled={!form[day]}
                        />
                        <p>
                            {(form[day] &&
                                timeDifference(form[day].startTime, form[day].endTime)) ||
                                '0'}
                        </p>
                    </>
                ))}
            </div>
        </>
    );
};

export default WagesRegularHours;
