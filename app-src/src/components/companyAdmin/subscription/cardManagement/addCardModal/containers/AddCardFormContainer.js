import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import addCard from 'actions/companyAdmin/cards/async/addCard';

import AddCardModal from '../presentational/AddCardModal';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { ADD_CARD_SUCCESS } from 'constants/actionTypes/cards';
import { ERROR_MODAL } from 'constants/shared/modalTypes';

class AddCardFormContainer extends Component {
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
            close={this.props.close}
            validateMaxLength={this.validateMaxLength}
            validateDate={this.validateDate}
        />
    );

    componentDidUpdate = (prevProps, prevState) => {
        const { addFieldError, removeFieldError } = this.props;
        const { expiryMonth, expiryYear } = this.state;

        if (
            expiryMonth !== prevState.expiryMonth ||
            expiryYear !== prevState.expiryYear
        ) {
            const [thisMonth, thisYear] = moment(Date.now())
                .format('MM YYYY')
                .split(' ');

            if (
                +expiryYear < +thisYear ||
                (+expiryYear === +thisYear && +expiryMonth < +thisMonth)
            ) {
                addFieldError('expiryYear', 'This expiry date has passed.');
            } else {
                removeFieldError('expiryYear');
            }
        }
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

        const { addCard, onSuccess = () => {} } = this.props;
        addCard(postBody).then(({ payload, type, error }) => {
            if (type === ADD_CARD_SUCCESS) return onSuccess(payload);
            if (error) return showModal(ERROR_MODAL);
        });
    };

    validateMaxLength = num => value =>
        value.length <= num ? '' : `Maximum length for this field is ${num}`;
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { postError }
    }
}) => ({
    postError
});

const mapDispatchToProps = {
    showModal,
    addCard,
    addFieldError,
    removeFieldError
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCardFormContainer);
