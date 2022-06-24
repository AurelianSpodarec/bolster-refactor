import React from 'react';

import BlockHeading from '../../../../../shared/generic/blockHeading/presentational/BlockHeading';
import Field from '../../../../../shared/generic/form/presentational/Field';
import Tickbox from '../../../../../shared/generic/form/presentational/Tickbox';
import TimePickerContainer from '../../../../../shared/generic/form/containers/TimePickerContainer';

const WagesRegularHours = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
                        <Tickbox label={day} />
                        <p>Between</p>
                        <TimePickerContainer />
                        <TimePickerContainer />
                        <TimePickerContainer />
                        <p>8HR</p>
                    </>
                ))}
            </div>
        </>
    );
};

export default WagesRegularHours;
