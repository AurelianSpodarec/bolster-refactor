import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import React, { useEffect } from 'react';
import BreakdownTabs from './BreakdownTabs';
import useSelectedTab from './hooks/useSelectedTab';

const BreakdownLayout = ({ tabs = [], isLoading = false, error = null, noData = false }) => {
    const { selectedTab, onTabChange } = useSelectedTab();

    useEffect(() => {
        if (tabs.find(tab => tab.id === selectedTab)?.disabled) onTabChange(tabs[0].id);
    }, [tabs, selectedTab]);

    return (
        <BlockContainer
            contentClass="timesheet-breakdown"
            isFetching={isLoading}
            error={error}
            isEmpty={noData}
        >
            <BreakdownTabs tabs={tabs} selectedTab={selectedTab} onTabChange={onTabChange} />
            {tabs[selectedTab]?.component}
        </BlockContainer>
    );
};

export default BreakdownLayout;
