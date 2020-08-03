import React from 'react';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import DemoDetailsContainer from '../containers/DemoDetailsContainer';

const SingleDemoRequest = () => (
    <>
        <PageHeading title="Demo Request" withBackButton>
            <Breadcrumb
                breadcrumbs={[
                    { link: '/admin/demo-requests', text: 'User Demo Requests' },
                    { text: 'Demo Request' },
                ]}
            />
        </PageHeading>

        <DemoDetailsContainer />
    </>
);

export default SingleDemoRequest;
