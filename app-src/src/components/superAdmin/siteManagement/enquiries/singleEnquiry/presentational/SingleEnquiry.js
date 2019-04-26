import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EnquiryDetailsContainer from '../containers/EnquiryDetailsContainer';

const SingleEnquiry = () => (
    <>
        <Breadcrumb breadcrumbs={[{ text: 'Enquiry' }]} />
        <PageHeading title="Enquiry" withBackButton />
        <EnquiryDetailsContainer />
    </>
);

export default SingleEnquiry;
