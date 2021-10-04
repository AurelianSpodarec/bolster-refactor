import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';
import BreakdownTabs from './BreakdownTabs';
import useSelectedTab from './hooks/useSelectedTab';

const BreakdownLayout = ({ selectedDate, tabs }) => {
    const { selectedTab, onTabChange } = useSelectedTab();

    return (
        <BlockContainer contentClass="timesheet-breakdown">
            <BlockHeading
                title={
                    <DateTimeContainer
                        date={new Date(selectedDate)}
                        datetime={DATE_TIME_IDS.DATE}
                    />
                }
            />
            <BreakdownTabs tabs={tabs} selectedTab={selectedTab} onTabChange={onTabChange} />
            {tabs[selectedTab].component}
        </BlockContainer>
    );
};

export default BreakdownLayout;
