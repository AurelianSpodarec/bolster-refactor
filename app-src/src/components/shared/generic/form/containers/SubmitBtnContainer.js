import React, { Component } from 'react';
import { connect } from 'react-redux';

import { isObjEmpty } from 'helpers/generic';

class SubmitBtnContainer extends Component {
    state = { disabled: false };

    render() {
        return (
            <button type="submit" disabled={this.state.disabled}>
                Login
            </button>
        );
    }

    componentDidUpdate = () => {
        if (!isObjEmpty(this.props.fieldErrors) && this.state.disabled) {
            this._setDisable(false);
        }
    };

    handleClick = e => {
        if (this.state.disabled) {
            e.preventDefault();

            return;
        }

        this._setDisable(true);
    };

    _setDisable = disabled => {
        this.setState({
            ...this.state,
            disabled: disabled
        });
    };
}

export default connect(state => state.genericReducers.fieldErrors)(
    SubmitBtnContainer
);
