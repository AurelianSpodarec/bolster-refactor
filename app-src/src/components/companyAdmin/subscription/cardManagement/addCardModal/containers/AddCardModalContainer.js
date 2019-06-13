import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import addCard from 'actions/companyAdmin/cards/async/addCard';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import AddCardFormContainer from './AddCardFormContainer';

class AddCardModalContainer extends Component {
    render() {
        return (
            <AddCardFormContainer
                close={this.close}
                onSuccess={this.onSuccess}
            />
        );
    }

    onSuccess = () => {
        this.close();
    };

    close = () => {
        const { hideModal } = this.props;
        hideModal();
    };
}

const mapStateToProps = ({
    companyAdmin: {
        cardsReducer: { postError, postSuccess }
    }
}) => ({
    postError,
    postSuccess
});

const mapDispatchToProps = {
    showModal,
    hideModal,
    addCard,
    addFieldError,
    removeFieldError
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCardModalContainer);
