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

class BuyCreditsModalContainer extends Component {
    state = {
        paymentType: 2,
        stripeCardID: null,
        creditsToBuy: this.props.creditsToBuy || 0
    };

    render = () => {
        const { cards, hideModal } = this.props;
        const cardOptions = Object.values(cards).map(card => ({
            text: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));
        return (
            <BuyCreditsModal
                {...this.state}
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
            />
        );
    };

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { paymentType, creditsToBuy: credits, stripeCardID } = this.state;
        const { createCredits, showModal, fetchAllCredits } = this.props;

        const postBody = {
            paymentType,
            credits,
            stripeCardID: paymentType === PAYMENT_IDS.CARD ? stripeCardID : null
        };

        createCredits(postBody)
            .then(() => {
                fetchAllCredits();
                fetchAllInvoices();
                showModal(PAYMENT_SUCCESS, {
                    message: `Your order has been successfully placed and your new credits ${
                        paymentType === PAYMENT_IDS.CARD
                            ? 'have been added.'
                            : 'will be available once the invoice has been paid'
                    }`
                });
            })
            .catch(() => {
                showModal(PAYMENT_ERROR, {
                    message:
                        'There was an error while purchasing your credits. Please try again.',
                    resubmit: this.handleSubmit
                });
            });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { postSuccess, postError },
        cardsReducer: { cards, isFetching }
    }
}) => ({
    cards,
    postSuccess,
    postError,
    isFetching
});

const mapDispatchToProps = dispatch => ({
    createCredits: body => dispatch(createCredits(body)),
    fetchAllCredits: () => dispatch(fetchAllCredits()),
    fetchAllInvoices: () => dispatch(fetchAllInvoices()),
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyCreditsModalContainer);
