import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';
import { ADD_CARD } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import setPrimaryCard from 'actions/companyAdmin/cards/async/setPrimaryCard';
import fetchAllCards from 'actions/companyAdmin/cards/async/fetchAllCards';

class CardTableContainer extends Component {
    render() {
        const {
            cards = [],
            isFetching,
            error,
            showModal,
            setPrimaryCard
        } = this.props;
        const headers = [
            'Name',
            'Card No',
            'Expiry',
            'Primary Card',
            'Options'
        ];
        return (
            <CardTable
                cards={Object.values(cards)}
                headers={headers}
                isFetching={isFetching}
                error={error}
                showModal={showModal}
                setPrimaryCard={setPrimaryCard}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, fetchAllCards } = this.props;
        if (postSuccess && !prevProps.postSuccess) fetchAllCards();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching, error, postSuccess }
    }
}) => ({
    cards,
    isFetching,
    error,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal(ADD_CARD)),
    setPrimaryCard: body => dispatch(setPrimaryCard(body)),
    fetchAllCards: () => dispatch(fetchAllCards())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTableContainer);
