import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubscriptionCredits from '../presentational/SubscriptionCredits';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { BUY_CREDITS } from 'constants/shared/modalTypes';

class SubscriptionCreditsContainer extends Component {
    state = {
        creditsToBuy: ''
    };

    render = () => {
        const { creditsToBuy } = this.state;
        const {
            isFetching,
            totalCredits,
            showModal,
            costOfCredits,
            vatCostOfCredits
        } = this.props;
        const costWithoutVAT = creditsToBuy * costOfCredits;
        const costOfVAT = creditsToBuy * vatCostOfCredits;
        const costWithVAT = costWithoutVAT + costOfVAT;
        return (
            <BlockContainer isFetching={isFetching}>
                <SubscriptionCredits
                    creditsToBuy={creditsToBuy}
                    costOfCredits={costOfCredits}
                    costWithoutVAT={costWithoutVAT}
                    costWithVAT={costWithVAT}
                    totalCredits={totalCredits}
                    showModal={e => {
                        e.preventDefault();
                        showModal(BUY_CREDITS, { creditsToBuy });
                        this.setState({ creditsToBuy: '' });
                    }}
                    handleCreditsChange={this.handleCreditsChange}
                />
            </BlockContainer>
        );
    };

    handleCreditsChange = (name, value) => {
        let num = value;
        if (Number(value) <= 0) num = 0;
        this.setState({ [name]: num });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits, isFetching, costOfCredits, vatCostOfCredits }
    }
}) => ({
    totalCredits: Object.values(credits).reduce(
        (acc, curr) => acc + curr.quantity,
        0
    ),
    isFetching,
    costOfCredits,
    vatCostOfCredits
});

const mapDispatchToProps = { showModal };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubscriptionCreditsContainer);
