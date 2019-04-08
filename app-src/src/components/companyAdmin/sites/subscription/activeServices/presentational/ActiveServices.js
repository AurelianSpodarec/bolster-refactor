import React from 'react';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';

const ActiveServices = ({ subscriptions, handleChange }) => (
    <BlockContainer>
        <Form>
            <Field name="Services">
                {subscriptions.map(sub => (
                    <Checkbox
                        key={`subscription-id-${sub.id}`}
                        checked={sub.isAutoRenew}
                        name={sub.name}
                        value={sub.serviceID}
                        id={`subscription-id-${sub.id}`}
                        handleChange={handleChange}
                        text={sub.name}
                    />
                ))}
                <>
                    <span>
                        <i className="fa fa-add" /> Add service{' '}
                        <button className="button green" onClick={() => {}}>
                            Add{' '}
                        </button>
                    </span>
                </>
            </Field>

            <div className="size-lg-12">
                <h3 className="heading heading-3">
                    <i className="fa fa-question" />
                    Looking for something specific?
                </h3>
                <p>
                    The Bolster System can support a wide range of additional
                    services, template and workflows{' '}
                    <strong>so get in touch </strong> and we can talk through
                    your custom requirements
                </p>
            </div>
        </Form>
    </BlockContainer>
);

export default ActiveServices;
