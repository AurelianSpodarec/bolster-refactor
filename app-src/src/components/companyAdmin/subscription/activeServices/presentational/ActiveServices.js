import React from 'react';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import { ADD_SERVICE_TO_SUBSCRIPTION } from 'constants/shared/modalTypes';

const ActiveServices = ({
    subscriptions,
    handleChange,
    services,
    showModal
}) => {
    return (
        <BlockContainer>
            <Form>
                <Field name="Services">
                    {subscriptions.map(sub => (
                        <div
                            key={`subscription-id-${sub.id}`}
                            className="size-lg-6"
                        >
                            <div className="size-lg-6">
                                <i className="fa fa-check" />
                                <label
                                    className="heading heading-3"
                                    htmlFor={`subscription-id-${sub.id}`}
                                >
                                    {sub.name}
                                </label>
                            </div>
                            <Checkbox
                                checked={sub.isAutoRenew}
                                name={sub.name}
                                value={sub.serviceID}
                                id={`subscription-id-${sub.id}`}
                                handleChange={handleChange}
                                text="Renew?"
                            />
                        </div>
                    ))}
                    {services.map(service => (
                        <div key={service.id} className="size-lg-6">
                            <div className="size-lg-6">
                                <span>
                                    <i className="fa fa-plus" />
                                    ##{service.name}##
                                </span>
                            </div>
                            <button
                                className="button green"
                                onClick={e => {
                                    e.preventDefault();
                                    showModal(ADD_SERVICE_TO_SUBSCRIPTION, {
                                        service
                                    });
                                }}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </Field>

                <div className="size-lg-12">
                    <h3 className="heading heading-3">
                        <i className="fa fa-question" />
                        Looking for something specific?
                    </h3>
                    <p>
                        The Bolster System can support a wide range of
                        additional services, template and workflows{' '}
                        <strong>so get in touch </strong> and we can talk
                        through your custom requirements
                    </p>
                </div>
            </Form>
        </BlockContainer>
    );
};

export default ActiveServices;
