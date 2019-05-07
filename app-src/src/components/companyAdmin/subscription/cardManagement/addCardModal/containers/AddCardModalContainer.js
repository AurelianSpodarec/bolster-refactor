import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
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
            validateMaxLength={this.validateMaxLength}
        />
    );

    componentDidUpdate = prevProps => {
        const { hideModal, postSuccess } = this.props;
        if (postSuccess && !prevProps.postSuccess) hideModal();
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
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

    validateMaxLength = num => value =>
        value.length <= num ? '' : `Maximum length for this field is ${num}`;
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { postError, postSuccess }
    }
}) => ({
    postError,
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
    hideModal: () => dispatch(hideModal()),
    addCard: body => dispatch(addCard(body))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCardModalContainer);
