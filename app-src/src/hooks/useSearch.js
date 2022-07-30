import { useState } from 'react';

const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleUpdateSearch = (_, value) => {
        setSearchTerm(value);
    };

    return { searchTerm, handleUpdateSearch };
};

export default useSearch;
