import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddServiceToSubscriptionModal from '../presentational/AddServiceToSubscriptionModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchProRataSubscriptionCost from 'actions/companyAdmin/subscriptions/async/fetchProRataSubscriptionCost';

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
                selectedCard={
                    cardOptions.find(
                        ({ value }) => value === this.state.stripeCardID
                    ) || cardOptions[0]
                }
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
        const { isFetching, cards } = this.props;

        if (!isFetching && prevProps.isFetching && cards.length) {
            const primaryCard = cards.find(({ isPrimary }) => isPrimary);
            this.setState({
                stripeCardID: primaryCard ? primaryCard.id : cards[0].id
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
            service: { id }
        } = this.props;
        const postBody = { paymentType, stripeCardID, servicesIDs: [id] };
        // ! add service to subscription here
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching: fetchingCards },
        subscriptionsReducer: { isFetching: fetchingSubs, proRataCost }
    }
}) => ({
    cards: Object.values(cards),
    isFetching: fetchingCards || fetchingSubs,
    proRataCost
});

const mapDispatchToProps = dispatch => ({
    fetchAllCards: () => dispatch(fetchAllCards()),
    fetchProRataSubscriptionCost: () =>
        dispatch(fetchProRataSubscriptionCost()),
    hideModal: () => dispatch(hideModal()),
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddServiceToSubscriptionModalContainer);
