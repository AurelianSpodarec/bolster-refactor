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
            postingError={this.props.postingError}
        />
    );

    componentDidUpdate = (prevProps, prevState) => {
        const {
            addFieldError,
            removeFieldError,
            isPosting,
            isPostingSuccess,
            isPostingFailure,
            postError,
            onSuccess = () => {}
        } = this.props;
        const { expiryMonth, expiryYear } = this.state;

        if (expiryMonth !== prevState.expiryMonth || expiryYear !== prevState.expiryYear) {
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

        if (prevProps.isPosting && !isPosting && isPostingSuccess) {
            onSuccess();
        }

        if (prevProps.isPosting && !isPosting && isPostingFailure) {
            addFieldError('errorPostingCard', postError);
        }
    };

    componentWillUnmount = () => {
        const { removeFieldError } = this.props;

        removeFieldError('errorPostingCard');
    };

    handleChange = (name, value) => {
        const { removeFieldError } = this.props;

        this.setState({ [name]: value });
        removeFieldError('errorPostingCard');
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, cardNumber, expiryMonth, expiryYear, CV2 } = this.state;
        const postBody = {
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
        cardsReducer: { postError, isPosting, isPostingSuccess, isPostingFailure }
    },
    shared: {
        fieldErrorsReducer: { fieldErrors }
    }
}) => ({
    postError,
    isPosting,
    isPostingSuccess,
    isPostingFailure,
    postingError: fieldErrors['errorPostingCard']
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
