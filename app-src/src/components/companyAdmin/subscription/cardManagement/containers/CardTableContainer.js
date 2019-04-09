import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardTable from '../presentational/CardTable';

class CardTableContainer extends Component {
    render() {
        const { cards = [], isFetching, error } = this.props;
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

export default connect(mapStateToProps)(CardTableContainer);
