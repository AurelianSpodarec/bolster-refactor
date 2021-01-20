import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';
import { ADD_CARD, ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import setPrimaryCard from 'actions/companyAdmin/cards/async/setPrimaryCard';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import deleteCard from 'actions/companyAdmin/cards/async/deleteCard';

class CardTableContainer extends Component {
    state = {
        cards: [],
    };

    render = () => {
        const { isFetching, showModal, deleteCard, cards, onMobile } = this.props;
        const headers = ['Name on card', 'Card No.', 'Expiry', 'Primary Card', 'Options'];
        return (
            <CardTable
                cards={cards}
                headers={headers}
                isFetching={isFetching}
                showModal={() => showModal(ADD_CARD)}
                setPrimaryCard={this.setPrimaryCard}
                deleteCard={deleteCard}
                onMobile={onMobile}
            />
        );
    };

    setPrimaryCard = id => {
        this.props.setPrimaryCard(id);
    };

    componentDidUpdate = prevProps => {
        const { error, showModal } = this.props;
        if (error && !prevProps.error) {
            showModal(ERROR_MODAL, { message: error });
        }
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching, error, postError, postSuccess },
    },
    shared: {
        mobileReducer: { onMobile },
    },
}) => ({
    cards: Object.values(cards),
    isFetching,
    error,
    postError,
    postSuccess,
    onMobile,
});

const mapDispatchToProps = {
    showModal,
    setPrimaryCard,
    deleteCard,
    fetchAllCards,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardTableContainer);
