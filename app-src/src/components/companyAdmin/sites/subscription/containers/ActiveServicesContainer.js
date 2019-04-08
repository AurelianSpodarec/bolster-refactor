import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'components/shared/generic/form/containers/Form';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import { isObjEmpty } from 'helpers/generic';
import Field from 'components/shared/generic/form/presentational/Field';

class ActiveServicesContainer extends Component {
    state = {
        subscriptions: []
    };

    render() {
        const { subscriptions } = this.state;
        return (
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
                                handleChange={this.handleChange}
                                text={sub.name}
                            />
                        ))}
                        <>
                            <span>
                                <i className="fa fa-add" /> Add service{' '}
                                <button
                                    className="button green"
                                    onClick={() => {}}
                                >
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
                            The Bolster System can support a wide range of
                            additional services, template and workflows{' '}
                            <strong>so get in touch </strong> and we can talk
                            through your custom requirements
                        </p>
                    </div>
                </Form>
            </BlockContainer>
        );
    }

    componentDidMount = () => {};

    componentDidUpdate = prevProps => {
        if (!this.props.isFetching && prevProps.isFetching)
            this.setState({
                subscriptions: this.getActiveSubscriptions()
            });
    };

    getActiveSubscriptions = () => {
        const { subscriptions, services } = this.props;
        return subscriptions.services && !isObjEmpty(services)
            ? subscriptions.services.map(service => ({
                  ...service,
                  name: services[service.serviceID].name
              }))
            : [];
    };

    handleChange = () => {};
}

const mapStateToProps = ({
    companyAdmin: {
        subscriptionsReducer: { error, isFetching, subscriptions },
        servicesReducer: { services }
    }
}) => ({
    subscriptions,
    services,
    error,
    isFetching
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveServicesContainer);
