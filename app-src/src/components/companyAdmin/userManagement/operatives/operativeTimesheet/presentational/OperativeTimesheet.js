import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import TimesheetCalenderContainer from '../timesheetCalender/containers/TimesheetCalenderContainer';

const OperativeTimesheet = ({ operativeName }) => (
    <>
        <PageHeading leftChildren={true} title={`Timesheet - ${operativeName}`}>
            <BackButtonContainer />
        </PageHeading>
        <BlockContainer>
            <TimesheetCalenderContainer />
        </BlockContainer>
    </>
);

export default OperativeTimesheet;
