import { useState } from 'react';

import { MESSAGE_CENTRE_TABS } from 'constants/companyAdmin/enums';

const useMessageCentreTable = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const messages = [
        {
            id: 1,
            title: 'Message 1',
            date: '01/01/2020',
            message:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nunc nisl eget.</p>',
        },
        {
            id: 2,
            title: 'Message 2',
            date: '01/01/2020',
            message:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nunc nisl eget.</p>',
        },
        {
            id: 3,
            title: 'Message 3',
            date: '01/01/2020',
            message:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc ultrices eros, eu porttitor nunc nisl eget.</p>',
        },
    ];

    const showCreateNewButton =
        selectedTab !== MESSAGE_CENTRE_TABS.SYSTEM_MESSAGES &&
        selectedTab !== MESSAGE_CENTRE_TABS.DRAWING_EXPIRY;

    return { selectedTab, setSelectedTab, messages, showCreateNewButton };
};

export default useMessageCentreTable;
