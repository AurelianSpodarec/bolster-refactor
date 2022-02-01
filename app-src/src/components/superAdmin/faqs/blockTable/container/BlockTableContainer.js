import React from 'react';
import BlockTable from '../presentational/BlockTable';

const headers = ['Title', ''];

const BlockTableContainer = ({ faqs, isFetching, title }) => {
    return <BlockTable title={title} faqs={faqs} isFetching={isFetching} headers={headers} />;
};

export default BlockTableContainer;
