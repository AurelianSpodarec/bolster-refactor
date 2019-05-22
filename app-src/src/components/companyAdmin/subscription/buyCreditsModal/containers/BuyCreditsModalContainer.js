import React, { Component } from 'react';
import { connect } from 'react-redux';

import BuyCreditsModal from '../presentational/BuyCreditsModal';
import createCredits from 'actions/companyAdmin/credits/createCredits';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PAYMENT_ERROR, PAYMENT_SUCCESS } from 'constants/shared/modalTypes';
import { PAYMENT_IDS } from 'constants/companyAdmin/enums';
import fetchAllInvoices from 'actions/companyAdmin/invoices/async/fetchAllInvoices';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import fetchCostOfCredits from 'actions/companyAdmin/credits/fetchCostOfCredits';

class BuyCreditsModalContainer extends Component {
    state = {
        paymentType: 2,
        stripeCardID: null,
        creditsToBuy: this.props.creditsToBuy || ''
    };

    render = () => {
        const { cards, hideModal, costOfCredits } = this.props;
        const cardOptions = cards.map(card => ({
            text: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));
        const selectedCard = cardOptions.find(
            ({ isPrimary, value }) =>
                value === this.state.stripeCardID || isPrimary
        );

        return (
            <BuyCreditsModal
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                cards={cardOptions}
                noCards={!cards.length}
                costOfCredits={costOfCredits}
                selectedCard={selectedCard}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
            />
        );
    };

    componentDidMount = () => {
        const { fetchAllCards, fetchCostOfCredits } = this.props;
        fetchAllCards();
        fetchCostOfCredits();
    };

    componentDidUpdate = prevProps => {
        const {
            isFetching,
            cards,
            postError,
            postSuccess,
            fetchAllCredits,
            showModal
        } = this.props;
        const { paymentType } = this.state;
        if (!isFetching && prevProps.isFetching) {
            const primaryCard = cards.find(({ isPrimary }) => isPrimary);
            this.setState({
                stripeCardID: primaryCard ? primaryCard.id : null
            });
        }
        if (postSuccess && !prevProps.postSuccess) {
            showModal(PAYMENT_SUCCESS, {
                message: `Your order has been successfully placed and your new credits ${
                    +paymentType === PAYMENT_IDS.CARD
                        ? 'have been added.'
                        : 'will be available once the invoice has been paid'
                }`
            });
        }
        if (postError && !prevProps.postError) {
            fetchAllCredits();
            showModal(PAYMENT_ERROR, {
                message:
                    'There was an error while purchasing your credits. Please try again.',
                resubmit: hideModal
            });
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const { paymentType, creditsToBuy: credits, stripeCardID } = this.state;
        const { createCredits } = this.props;

        const postBody = {
            paymentType,
            credits,
            stripeCardID:
                +paymentType === PAYMENT_IDS.CARD ? stripeCardID : null
        };

        createCredits(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { postSuccess, postError, costOfCredits },
        cardsReducer: { cards, isFetching }
    }
}) => ({
    cards: Object.values(cards) || [],
    costOfCredits,
    postSuccess,
    postError,
    isFetching
});

const mapDispatchToProps = dispatch => ({
    createCredits: body => dispatch(createCredits(body)),
    fetchAllCards: () => dispatch(fetchAllCards()),
    fetchCostOfCredits: () => dispatch(fetchCostOfCredits()),
    fetchAllCredits: () => dispatch(fetchAllCredits()),
    fetchAllInvoices: () => dispatch(fetchAllInvoices()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyCreditsModalContainer);
