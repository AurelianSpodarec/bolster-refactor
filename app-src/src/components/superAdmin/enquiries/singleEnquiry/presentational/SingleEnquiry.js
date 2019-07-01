import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import EnquiryDetailsContainer from '../containers/EnquiryDetailsContainer';

const SingleEnquiry = () => (
    <>
        <PageHeading title="Enquiry" withBackButton>
            <Breadcrumb
                breadcrumbs={[
                    { link: '/admin/enquiries', text: 'User Enquiries' },
                    { text: 'Enquiry' }
                ]}
            />
        </PageHeading>

        <EnquiryDetailsContainer />
    </>
);

export default SingleEnquiry;
