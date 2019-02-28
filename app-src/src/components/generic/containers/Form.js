import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import clearFieldErrors from 'actions/generic/sync/fieldErrors/clearFieldErrors';
import showFieldErrors from 'actions/generic/sync/fieldErrors/showFieldErrors';

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
        const { fieldErrors, showFieldErrors, onSubmit } = this.props;

        if (!isObjEmpty(fieldErrors)) {
            e.preventDefault();
            showFieldErrors();

            return;
        }

        onSubmit(e);
    };
}

const mapStateToProps = state => ({
    fieldErrors: state.genericReducers.fieldErrors.fieldErrors,
    showFieldErrors: state.genericReducers.fieldErrors.showFieldErrors
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
