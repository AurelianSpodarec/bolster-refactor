import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EnquiryDetailsContainer from '../containers/EnquiryDetailsContainer';

const SingleEnquiry = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Enquiry' }]} />
        <PageHeading title="Details" />
        <EnquiryDetailsContainer />
    </>
);

export default SingleEnquiry;
