import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionCredits from '../presentational/SubscriptionCredits';

class SubscriptionCreditsContainer extends Component {
    render() {
        return <SubscriptionCredits />;
    }
}

export default connect()(SubscriptionCreditsContainer);
