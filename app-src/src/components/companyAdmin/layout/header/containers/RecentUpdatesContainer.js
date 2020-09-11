import React, { useRef, useState } from 'react';

import RecentUpdates from '../presentational/RecentUpdates';

const RecentUpdatesContainer = () => {
    const node = useRef();
    const [listVisible, setListVisible] = useState(false);

    return (
        <RecentUpdates
            node={node}
            listVisible={listVisible}
            toggleListVisibility={toggleListVisibility}
        />
    );

    function toggleListVisibility() {
        if (!listVisible) {
            document.addEventListener('click', handleOutsideClick, false);
        } else {
            document.removeEventListener('click', handleOutsideClick, false);
        }

        setListVisible(!listVisible);
    }

    function handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (node && node.current.contains(e.target)) {
            return;
        }

        setListVisible(false);
    }
};

export default RecentUpdatesContainer;
