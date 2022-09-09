import React from 'react';
import BlockTable from '../presentational/BlockTable';

const headers = ['Title', ''];

const BlockTableContainer = ({ faqs, isFetching, title, handleDelete }) => {
    return (
        <BlockTable
            title={title}
            faqs={faqs.filter(item => !item.isDeleted)}
            isFetching={isFetching}
            headers={headers}
            handleDelete={handleDelete}
        />
    );
};

export default BlockTableContainer;
