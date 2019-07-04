import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';
import { ADD_CARD } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import setPrimaryCard from 'actions/companyAdmin/cards/async/setPrimaryCard';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';
import deleteCard from 'actions/companyAdmin/cards/async/deleteCard';

class CardTableContainer extends Component {
    state = {
        cards: []
    };

    render = () => {
        const {
            isFetching,
            error,
            showModal,
            deleteCard,
            cards,
            onMobile
        } = this.props;
        const headers = [
            'Name on card',
            'Nickname',
            'Card No.',
            'Expiry',
            'Primary Card',
            'Options'
        ];
        return (
            <CardTable
                cards={cards}
                headers={headers}
                isFetching={isFetching}
                error={error}
                showModal={showModal}
                setPrimaryCard={this.setPrimaryCard}
                deleteCard={deleteCard}
                onMobile={onMobile}
            />
        );
    };

    setPrimaryCard = id => {
        this.props.setPrimaryCard(id);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching, error, postError, postSuccess }
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    cards: Object.values(cards),
    isFetching,
    error,
    postError,
    postSuccess,
    onMobile
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal(ADD_CARD)),
    setPrimaryCard: stripeCardID => dispatch(setPrimaryCard(stripeCardID)),
    deleteCard: stripeCardID => {
        dispatch(deleteCard(stripeCardID));
    },
    fetchAllCards: () => dispatch(fetchAllCards())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTableContainer);
