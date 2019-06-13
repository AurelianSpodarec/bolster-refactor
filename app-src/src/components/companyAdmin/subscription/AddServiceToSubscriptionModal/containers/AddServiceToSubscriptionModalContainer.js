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
        stripeCardID: null,
        termsAgreed: false
    };

    render() {
        const { cards, hideModal, service, proRataCost } = this.props;
        const { paymentType, stripeCardID, termsAgreed } = this.state;
        const cardOptions = cards.map(card => ({
            text: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));

        const noCards = !cards.length;

        return (
            <AddServiceToSubscriptionModal
                paymentType={paymentType}
                proRataCost={proRataCost}
                stripeCardID={stripeCardID}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                cards={cardOptions}
                noCards={noCards}
                selectedCard={cardOptions.find(
                    ({ value }) => value === stripeCardID
                )}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                service={service}
                termsAgreed={termsAgreed}
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
                message: `Your order has been placed successfully. ${
                    +paymentType === PAYMENT_IDS.CARD
                        ? 'You can now use this service. If you would like a custom pin template, please call us on +44(0)161 873 7679.'
                        : 'Your new service will be available for use once the invoice has been paid.'
                }`
            });
        }

        if (postFailure && !prevProps.postFailure) {
            // fail modal
            fetchAllSubscriptions();
            showModal(PAYMENT_ERROR, {
                message:
                    'There was an error while purchasing your subscription. Please try again.',
                resubmit: hideModal,
                error: error.replace('office', 'invoice')
            });
        }
    };

    handleChange = (name, value) => {
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
                +paymentType === PAYMENT_IDS.CARD ? stripeCardID : null,
            serviceIDs: [id]
        };
        addServiceToSubscription(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards = {}, isFetching: fetchingCards },
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
