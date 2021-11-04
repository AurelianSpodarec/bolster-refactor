import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import React from 'react';
import BreakdownTabs from './BreakdownTabs';
import useSelectedTab from './hooks/useSelectedTab';

const BreakdownLayout = ({
    title = '',
    tabs = [],
    isLoading = false,
    error = null,
    noData = false,
    handlePDFReportGeneration,
}) => {
    const { selectedTab, onTabChange } = useSelectedTab();

    return (
        <BlockContainer
            contentClass="timesheet-breakdown"
            isFetching={isLoading}
            error={error}
            isEmpty={noData}
        >
            <BlockHeading title={title}>
                <button className="button" onClick={handlePDFReportGeneration}>
                    <i className="fas fa-file-pdf" />
                    Generate Report
                </button>
            </BlockHeading>
            <BreakdownTabs tabs={tabs} selectedTab={selectedTab} onTabChange={onTabChange} />
            {tabs[selectedTab]?.component}
        </BlockContainer>
    );
};

export default BreakdownLayout;
