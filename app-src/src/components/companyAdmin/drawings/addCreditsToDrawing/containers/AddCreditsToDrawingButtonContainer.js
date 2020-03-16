import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCreditsToDrawingButton from '../presentational/AddCreditsToDrawingButton';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADD_CREDITS_TO_DRAWING } from 'constants/shared/modalTypes';

class AddCreditsToDrawingButtonContainer extends Component {
    state = {
        shouldRestrictPayments: false
    };
    render() {
        if (this.state.shouldRestrictPayments) {
            return <></>;
        } else {
            return (
                <AddCreditsToDrawingButton
                    handleClick={this.handleClick}
                    shouldRestrictPayments={this.state.shouldRestrictPayments}
                />
            );
        }
    }

    handleClick = () => {
        this.props.showModal(ADD_CREDITS_TO_DRAWING, {
            drawing: this.props.drawing
        });
    };

    componentDidMount = () => {
        const { users, companyUserID } = this.props;

        if (users && users[companyUserID]) {
            this.setState({
                shouldRestrictPayments:
                    users[companyUserID].shouldRestrictPayments
            });
        }
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

const mapStateToProps = ({
    companyAdmin: {
        companyUsersReducer: { users }
    },
    shared: {
        decodeJWTReducer: {
            jwtData: { companyUserID }
        }
    }
}) => ({
    companyUserID,
    users
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCreditsToDrawingButtonContainer);
