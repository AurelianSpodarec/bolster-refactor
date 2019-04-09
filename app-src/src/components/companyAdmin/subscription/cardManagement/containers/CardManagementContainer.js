import React, { Component } from 'react';

import CardManagement from '../presentational/CardManagement';

export default class CardManagementContainer extends Component {
    render() {
        const { cards, isFetching, error } = this.props;
        return (
            <CardManagement
                cards={cards}
                isFetching={isFetching}
                error={error}
            />
        );
    }
}
