import ControlsContainer from '../containers/ControlsContainer';
import WeekTableContainer from '../containers/WeekTableContainer';

const TimesheetCalender = () => {
    return (
        <div className="timesheet-calender">
            <ControlsContainer />
            <WeekTableContainer />
        </div>
    );
};

export default TimesheetCalender;
