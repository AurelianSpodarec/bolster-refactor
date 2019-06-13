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
        termsAgreed: false,
        creditsToBuy: this.props.creditsToBuy || ''
    };

    render = () => {
        const {
            cards,
            hideModal,
            costOfCredits,
            vatCostOfCredits,
            credits
        } = this.props;
        const { creditsToBuy } = this.state;

        const costWithoutVAT = costOfCredits * creditsToBuy;
        const costOfVAT = vatCostOfCredits * creditsToBuy;
        const costWithVAT = costWithoutVAT + costOfVAT;

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
                costWithVAT={costWithVAT}
                costWithoutVAT={costWithoutVAT}
                credits={credits}
                cards={cardOptions}
                noCards={!cards.length}
                costOfCredits={costOfCredits}
                selectedCard={selectedCard}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                handleCreditsChange={this.handleCreditsChange}
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
            fetchAllCredits();
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

    handleCreditsChange = (name, value) => {
        let num = value;
        if (Number(value) <= 0) num = 0;
        this.setState({ [name]: num });
    };

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
        creditsReducer: {
            postSuccess,
            postError,
            costOfCredits,
            vatCostOfCredits,
            credits
        },
        cardsReducer: { cards, isFetching }
    }
}) => ({
    cards: Object.values(cards || {}),
    credits: Object.values(credits).reduce(
        (total, log) => total + log.quantity,
        0
    ),
    costOfCredits,
    vatCostOfCredits,
    postSuccess,
    postError,
    isFetching
});

const mapDispatchToProps = {
    createCredits,
    fetchAllCards,
    fetchCostOfCredits,
    fetchAllCredits,
    fetchAllInvoices,
    showModal,
    hideModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyCreditsModalContainer);
