import React from 'react';
import Breadcrumb from 'components_DEPRECATED/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import ContactSubmissionDetailsContainer from '../containers/ContactSubmissionDetailsContainer';

const SingleContactSubmission = () => (
    <>
        <PageHeading title="Contact Submission" withBackButton>
            <Breadcrumb
                breadcrumbs={[
                    { link: '/admin/contact-submissions', text: 'Contact Submissions' },
                    { text: 'Contact Submission' },
                ]}
            />
        </PageHeading>

        <ContactSubmissionDetailsContainer />
    </>
);

export default SingleContactSubmission;
