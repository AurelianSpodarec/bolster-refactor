import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';
import clearFieldErrors from 'actions/shared/generic/fieldErrors/sync/clearFieldErrors';
import showFieldErrors from 'actions/shared/generic/fieldErrors/sync/showFieldErrors';

class Form extends Component {
    state = {
        isFieldErrorsCleared: false,
        disabled: false
    };
    render() {
        const { className, children, style = {} } = this.props;

        return !this.state.isFieldErrorsCleared ? null : (
            <form
                noValidate
                className={className}
                onSubmit={this.handleSubmit}
                style={{ ...style }}
            >
                {children}
            </form>
        );
    }

    componentDidMount = () => {
        this.props.clearFieldErrors();

        this.setState({ isFieldErrorsCleared: true });
    };

    componentDidUpdate = () => {
        const { disabled } = this.state;
        const { fieldErrors } = this.props;
        if (disabled && !isObjEmpty(fieldErrors)) {
            this.setState({ disabled: false });
        }
    };

    handleSubmit = e => {
        const { disabled } = this.state;
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
        if (disabled) return;

        this.setState({ disabled: true });
        onSubmit(e);
    };
}

const mapStateToProps = ({
    shared: {
        fieldErrorsReducer: { fieldErrors, errorsVisible }
    }
}) => ({
    fieldErrors,
    errorsVisible
});

const mapDispatchToProps = dispatch => ({
    clearFieldErrors: () => dispatch(clearFieldErrors()),
    showFieldErrors: () => dispatch(showFieldErrors())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);
