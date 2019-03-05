import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import clearFieldErrors from 'actions/generic/fieldErrors/sync/clearFieldErrors';
import showFieldErrors from 'actions/generic/fieldErrors/sync/showFieldErrors';

class Form extends Component {
    state = {
        isFieldErrorsCleared: false
    };
    render() {
        const { className, children } = this.props;

        if (!this.state.isFieldErrorsCleared) return null;
        return (
            <form className={className} onSubmit={this.handleSubmit}>
                {children}
            </form>
        );
    }

    componentDidMount = () => {
        this.props.clearFieldErrors();

        this.setState({
            ...this.state,
            isFieldErrorsCleared: true
        });
    };

    handleSubmit = e => {
        const {
            fieldErrors,
            showFieldErrors,
            errorsVisible,
            onSubmit
        } = this.props;
        e.persist();
        e.preventDefault();

        if (!isObjEmpty(fieldErrors)) {
            if (!errorsVisible) {
                showFieldErrors();
            }

            return;
        }

        onSubmit(e);
    };
}

const mapStateToProps = state => ({
    fieldErrors: state.genericReducers.fieldErrors.fieldErrors,
    errorsVisible: state.genericReducers.fieldErrors.errorsVisible
});

const mapDispatchToProps = dispatch => ({
    clearFieldErrors: () => {
        dispatch(clearFieldErrors());
    },
    showFieldErrors: () => {
        dispatch(showFieldErrors());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);
