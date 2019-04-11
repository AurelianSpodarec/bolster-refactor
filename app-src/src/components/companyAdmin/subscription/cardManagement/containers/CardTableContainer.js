import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';
import { ADD_CARD } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import setPrimaryCard from 'actions/companyAdmin/cards/async/setPrimaryCard';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';

class CardTableContainer extends Component {
    state = {
        cards: [],
        settingCard: false
    };

    render = () => {
        const { isFetching, error, showModal } = this.props;
        const headers = [
            'Name',
            'Card No',
            'Expiry',
            'Primary Card',
            'Options'
        ];
        return (
            <CardTable
                cards={this.state.cards}
                headers={headers}
                isFetching={isFetching}
                error={error}
                showModal={showModal}
                setPrimaryCard={this.setPrimaryCard}
            />
        );
    };

    componentDidMount = () => {
        const { isFetching, cards } = this.props;
        if (!isFetching) this.setState({ cards });
    };

    componentDidUpdate = prevProps => {
        const {
            postError,
            postSuccess,
            fetchAllCards,
            cards,
            isFetching
        } = this.props;
        if (!isFetching && prevProps.isFetching) this.setState({ cards });

        if (
            (postError && !prevProps.postError) ||
            (postSuccess && !prevProps.postSuccess)
        ) {
            const { settingCard } = this.state;
            if (settingCard) this.setState({ settingCard: false });
            else fetchAllCards();
        }
    };

    setPrimaryCard = (cards, id) => {
        this.props.setPrimaryCard(id);
        const updatedCards = cards.map(card => ({
            ...card,
            isPrimary: card.id === id
        }));
        this.setState({ cards: updatedCards, settingCard: true });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching, error, postError, postSuccess }
    }
}) => ({
    cards: Object.values(cards),
    isFetching,
    error,
    postError,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal(ADD_CARD)),
    setPrimaryCard: stripeCardID => dispatch(setPrimaryCard({ stripeCardID })),
    fetchAllCards: () => dispatch(fetchAllCards())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTableContainer);
