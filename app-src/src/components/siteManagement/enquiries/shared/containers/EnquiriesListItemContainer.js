import React from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/generic/modals/sync/showModal';
import EnquiriesListItem from '../presentational/EnquiriesListItem';

const EnquiriesListItemContainer = ({ enquiry, colCount }) => {
    return <EnquiriesListItem enquiry={enquiry} colCount={colCount} />;
};

export default EnquiriesListItemContainer;
