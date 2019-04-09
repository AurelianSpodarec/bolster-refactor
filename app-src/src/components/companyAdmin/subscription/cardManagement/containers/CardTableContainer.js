import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';
import { ADD_CARD } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class CardTableContainer extends Component {
    render() {
        const { cards = [], isFetching, error, showModal } = this.props;
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
            />
        );
    }
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { cards, isFetching, error }
    }
}) => ({
    cards,
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showModal(ADD_CARD))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTableContainer);
