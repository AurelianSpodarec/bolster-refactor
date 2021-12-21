import { useState } from 'react';

const useMessageCentreTable = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return { selectedTab, setSelectedTab };
};

export default useMessageCentreTable;
