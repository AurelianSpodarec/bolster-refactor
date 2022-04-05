import React from 'react';

import useSearch from 'hooks/useSearch';

import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';

const FRRatings = () => {
    const { searchTerm, handleUpdateSearch } = useSearch();

    return (
        <>
            <div className="flex-row align-center width-12">
                <TextInputContainer
                    name="search"
                    value={searchTerm}
                    handleChange={handleUpdateSearch}
                    placeholder="Search"
                />

                <button className="button green">Add</button>
            </div>
        </>
    );
};

export default FRRatings;
