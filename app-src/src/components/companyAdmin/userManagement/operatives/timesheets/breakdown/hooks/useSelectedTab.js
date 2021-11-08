import { useState } from 'react';

const useSelectedTab = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return { selectedTab, onTabChange: setSelectedTab };
};

export default useSelectedTab;
