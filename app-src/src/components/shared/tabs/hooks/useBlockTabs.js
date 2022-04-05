import React, { useState } from 'react';

const useBlockTabs = tabs => {
    const [selectedTabID, setSelectedTabID] = useState(tabs[0].id);

    const selectedTab = tabs.find(tab => tab.id === selectedTabID);
    const SpecificComponent = selectedTab ? selectedTab.component : tabs[0].component;

    return { selectedTabID, setSelectedTabID, SpecificComponent };
};

export default useBlockTabs;
