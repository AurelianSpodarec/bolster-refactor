import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import addCard from 'actions/companyAdmin/cards/async/addCard';
import AddCardModal from '../presentational/AddCardModal';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

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
            validateDate={this.validateDate}
        />
    );

    componentDidUpdate = (prevProps, prevState) => {
        const { hideModal, postSuccess, addFieldError } = this.props;
        if (postSuccess && !prevProps.postSuccess) hideModal();
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

const mapDispatchToProps = { showModal, hideModal, addCard, addFieldError };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCardModalContainer);
