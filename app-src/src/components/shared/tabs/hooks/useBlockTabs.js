import React, { useEffect, useState } from 'react';

import { isEmpty } from 'helpers/generic';
import { usePrevious } from 'helpers/hooks';

const useBlockTabs = (tabs, initialSelectedTabID) => {
    const [selectedTabID, setSelectedTabID] = useState(initialSelectedTabID);

    const selectedTab = tabs.find(tab => tab.id === selectedTabID);
    const SpecificComponent = selectedTab ? selectedTab.component : null;

    const prevProps = usePrevious({ tabs });

    useEffect(() => {
        if (JSON.stringify(tabs) === JSON.stringify(prevProps.tabs)) {
            if (!isEmpty(tabs) && !selectedTabID) setSelectedTabID(tabs[0].id);
            return;
        }

        if (isEmpty(tabs)) {
            setSelectedTabID(null);
        } else {
            setSelectedTabID(tabs[0].id);
        }
    }, [JSON.stringify(tabs)]);

    return { selectedTabID, setSelectedTabID, SpecificComponent };
};

export default useBlockTabs;
