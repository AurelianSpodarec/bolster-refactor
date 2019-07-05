import React, { Component } from 'react';
import { connect } from 'react-redux';

import PayInvoiceModal from '../presentational/PayInvoiceModal';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import payInvoice from 'actions/companyAdmin/invoices/async/payInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { PAYMENT_SUCCESS, PAYMENT_ERROR } from 'constants/shared/modalTypes';

class PayInvoiceModalContainer extends Component {
    state = {
        stripeCardID: null,
        termsAgreed: false
    };

    render() {
        const { cards, hideModal } = this.props;
        const { stripeCardID, termsAgreed } = this.state;
        const cardOptions = cards.map(card => ({
            text: `${card.nickname || card.name} - ${card.lastFour}`,
            value: card.id
        }));

        const selectedCard = cardOptions.find(
            ({ value }) => value === stripeCardID
        );
        return (
            <PayInvoiceModal
                cards={cardOptions}
                selectedCard={selectedCard}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                hideModal={hideModal}
                termsAgreed={termsAgreed}
            />
        );
    }

    componentDidMount = () => {
        this.props.fetchAllCards();
    };

    componentDidUpdate = prevProps => {
        const {
            isFetching,
            cards,
            postSuccess,
            postFailure,
            showModal
        } = this.props;

        if (!isFetching && prevProps.isFetching && cards.length) {
            const primaryCard = cards.find(({ isPrimary }) => isPrimary);
            this.setState({
                stripeCardID: primaryCard ? primaryCard.id : null
            });
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(PAYMENT_SUCCESS, {
                message: 'Your invoice has been successfully paid.'
            });
        }

        if (postFailure && !prevProps.postFailure) {
            showModal(PAYMENT_ERROR, {
                message:
                    'There was an error while paying this invoice, please try again.',
                resubmit: this.handleSubmit
            });
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        const { payInvoice, invoiceID } = this.props;
        const { stripeCardID } = this.state;
        payInvoice(invoiceID, stripeCardID);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching },
        invoicesReducer: { postSuccess, postFailure }
    }
}) => ({
    cards: Object.values(cards),
    isFetching,
    postSuccess,
    postFailure
});

const mapDispatchToProps = { fetchAllCards, payInvoice, hideModal, showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PayInvoiceModalContainer);
