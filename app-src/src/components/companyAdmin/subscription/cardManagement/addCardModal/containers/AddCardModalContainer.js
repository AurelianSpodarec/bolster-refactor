import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import addCard from 'actions/companyAdmin/cards/async/addCard';
import AddCardModal from '../presentational/AddCardModal';

class AddCardModalContainer extends Component {
    state = {
        nickname: '',
        name: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        CV2: '',
        saveCardDetails: false
    };
    render = () => (
        <AddCardModal
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            hideModal={e => {
                e.preventDefault();
                this.props.hideModal();
            }}
        />
    );

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const {
            nickname,
            name,
            cardNumber,
            expiryMonth,
            expiryYear,
            CV2
        } = this.state;
        const postBody = {
            nickname,
            name,
            cardNumber,
            expiryMonth,
            expiryYear,
            CV2
        };
        const { addCard } = this.props;
        addCard(postBody);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => dispatch(hideModal()),
    addCard: body => dispatch(addCard(body))
});

export default connect(
    null,
    mapDispatchToProps
)(AddCardModalContainer);
