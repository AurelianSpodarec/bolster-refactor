import React from 'react';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompanyServicesList from './CompanyServicesList';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import AddServiceItem from './AddServiceItem';

const ActiveServices = ({
    subscriptions,
    handleChange,
    services,
    showModal
}) => {
    return (
        <BlockContainer>
            <BlockHeading title="Services" />

            <Form className="generic-form ignore-padding size-lg-12">
                <CompanyServicesList
                    subscriptions={subscriptions}
                    handleChange={handleChange}
                >
                    {services.map(service => (
                        <AddServiceItem
                            key={service.id}
                            showModal={showModal}
                            service={service}
                        />
                    ))}
                </CompanyServicesList>
            </Form>
            <div className="size-lg-12">
                <BlockHeading
                    leftIcon={true}
                    classes="sub-heading w-left-icon"
                    title="Looking for something specific?"
                >
                    <StatusIcon
                        classes="question pull-left"
                        iconClass="fa fa-question"
                    />
                </BlockHeading>

                <p className="size-lg-12">
                    The Bolster System can support a wide range of additional
                    services, template and workflows
                    <br />
                    <Link to="#">so get in touch </Link> and we can talk through
                    your custom requirements
                </p>
            </div>
        </BlockContainer>
    );
};

export default ActiveServices;
