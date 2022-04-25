import React from 'react';

const useFilterDocuments = (allDocuments, optionID) => {
    const documents = allDocuments.filter(
        document => document.pinOptionID === parseInt(optionID) && document.isDeleted === false,
    );

    return { documents };
};

export default useFilterDocuments;
