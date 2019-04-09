import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionCredits from '../presentational/SubscriptionCredits';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SubscriptionCreditsContainer extends Component {
    state = {
        creditsToBuy: ''
    };

    render = () => (
        <BlockContainer>
            <SubscriptionCredits
                creditsToBuy={this.state.creditsToBuy}
                handleInputChange={this.handleInputChange}
            />
        </BlockContainer>
    );

    handleBuyCredits = () => {};

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    };
}

export default connect()(SubscriptionCreditsContainer);
