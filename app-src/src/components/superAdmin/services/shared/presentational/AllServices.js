import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'components/shared/generic/breadcrumb/presentational/Breadcrumb';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ServiceTableContainer from '../containers/ServiceTableContainer';

const AllServices = () => (
    <>
        <PageHeading title="Services" withBackButton>
            <Link to="/admin/services/create" className="button green">
                <i className="fa fa-plus" />
                Add service
            </Link>
        </PageHeading>
        <BlockContainer>
            <ServiceTableContainer />
        </BlockContainer>
    </>
);

export default AllServices;
