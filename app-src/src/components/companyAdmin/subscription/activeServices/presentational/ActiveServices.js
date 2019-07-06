import React from 'react';
import { Link } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompanyServicesList from './CompanyServicesList';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import AddServiceItem from './AddServiceItem';
import { isObjEmpty } from 'helpers/generic';

const ActiveServices = ({
    subscriptions,
    handleChange,
    services,
    showModal,
    isAutoRenew,
    noCards
}) => (
    <BlockContainer>
        <BlockHeading title="Services" />
        {noCards && isObjEmpty(subscriptions) && (
            <p className="info-message error" style={{ marginBottom: '15px' }}>
                Note: You must add a card to pay for a subscription.
            </p>
        )}
        <Form className="generic-form ignore-padding size-lg-12">
            <CompanyServicesList
                subscriptions={subscriptions}
                handleChange={handleChange}
                isAutoRenew={isAutoRenew}
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
                classes="w-left-icon"
                title="Looking for something specific?"
            >
                <StatusIcon
                    classes="question pull-left"
                    iconClass="fa fa-question"
                />
            </BlockHeading>

            <p className="size-lg-12">
                The Bolster System can support a wide range of additional
                services, template and workflows,{' '}
                <Link to="/company/tools/support">so get in touch</Link> and we
                can talk through your custom requirements.
                <br />
                You can call us on <a href="tel:0161 873 7679">0161 873 7679</a>
                , or e-mail at{' '}
                <a href="mailto:info@bolstersystems.com">
                    info@bolstersystems.com
                </a>
            </p>
        </div>
    </BlockContainer>
);

export default ActiveServices;
