import { useState } from 'react';

const useExpandableTab = () => {
    const [expandedDate, setExpandedDate] = useState(null);

    const handleJobsClick = date => {
        if (expandedDate === date) {
            setExpandedDate(null);
        } else {
            setExpandedDate(date);
        }
    };

    return { expandedDate, handleJobsClick };
};

export default useExpandableTab;
