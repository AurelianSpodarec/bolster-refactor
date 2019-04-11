import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddServiceToSubscriptionModal from '../presentational/AddServiceToSubscriptionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchProRataSubscriptionCost from 'actions/companyAdmin/subscriptions/async/fetchProRataSubscriptionCost';
import addServiceToSubscription from 'actions/companyAdmin/subscriptions/async/addServiceToSubscription';
import { PAYMENT_SUCCESS, PAYMENT_ERROR } from 'constants/shared/modalTypes';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import fetchAllSubscriptions from 'actions/companyAdmin/subscriptions/async/fetchAllSubscriptions';

class AddServiceToSubscriptionModalContainer extends Component {
    state = {
        paymentType: 2,
        stripeCardID: null
    };

    render() {
        const { cards, hideModal, service, proRataCost } = this.props;
        const { paymentType, stripeCardID } = this.state;
        const cardOptions = cards.map(card => ({
            text: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));

        return (
            <AddServiceToSubscriptionModal
                paymentType={paymentType}
                proRataCost={proRataCost}
                stripeCardID={stripeCardID}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                cards={cardOptions}
                selectedCard={cardOptions.find(
                    ({ value }) => value === this.state.stripeCardID
                )}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                service={service}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchAllCards();
        this.props.fetchProRataSubscriptionCost();
    };

    componentDidUpdate = prevProps => {
        // put primary card as default into state
        const {
            isFetching,
            cards,
            postSuccess,
            postFailure,
            showModal,
            hideModal,
            fetchAllSubscriptions,
            error
        } = this.props;
        const { paymentType } = this.state;
        console.log(error);

        if (!isFetching && prevProps.isFetching && cards.length) {
            const primaryCard = cards.find(({ isPrimary }) => isPrimary);
            this.setState({
                stripeCardID: primaryCard ? primaryCard.id : null
            });
        }

        if (postSuccess && !prevProps.postSuccess) {
            // success modal
            fetchAllSubscriptions();
            showModal(PAYMENT_SUCCESS, {
                message: `Your order has been placed successfully and your new service ${
                    paymentType === PAYMENT_IDS.CARD
                        ? 'has been added for you to use immediately.'
                        : 'will be available for use once the invoice has been paid.'
                }`
            });
        }

        if (postFailure && !prevProps.postFailure) {
            // fail modal
            fetchAllSubscriptions();
            showModal(PAYMENT_ERROR, {
                message:
                    'There was an error while purchasing your subscription. Please try again',
                resubmit: hideModal,
                error
            });
        }
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { paymentType, stripeCardID } = this.state;
        const {
            service: { id },
            addServiceToSubscription
        } = this.props;

        const postBody = {
            paymentType,
            stripeCardID:
                paymentType === PAYMENT_IDS.CARD ? stripeCardID : null,
            serviceIDs: [id]
        };
        addServiceToSubscription(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching: fetchingCards },
        subscriptionsReducer: {
            isFetching: fetchingSubs,
            proRataCost,
            postSuccess,
            postFailure,
            error
        }
    }
}) => ({
    cards: Object.values(cards),
    isFetching: fetchingCards || fetchingSubs,
    proRataCost,
    postSuccess,
    postFailure,
    error
});

const mapDispatchToProps = dispatch => ({
    addServiceToSubscription: body => dispatch(addServiceToSubscription(body)),
    fetchAllCards: () => dispatch(fetchAllCards()),
    fetchAllSubscriptions: () => dispatch(fetchAllSubscriptions()),
    fetchProRataSubscriptionCost: () =>
        dispatch(fetchProRataSubscriptionCost()),
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddServiceToSubscriptionModalContainer);
