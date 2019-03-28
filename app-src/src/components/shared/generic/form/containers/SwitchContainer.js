import React, { Component } from 'react';
import Switch from '../presentational/Switch';

export default class SwitchContainer extends Component {
    render() {
        const {
            checked,
            disabled = false,
            handleChange,
            value,
            name
        } = this.props;
        return (
            <Switch
                checked={checked}
                disabled={disabled}
                handleChange={handleChange}
                handleBlur={this.handleBlur}
                name={name}
                value={value}
            />
        );
    }

    handleBlur = () => {
        this.setState({
            ...this.state,
            showFieldError: true
        });
    };

    handleChange = e => {
        this.props.handleChange(e);
        // this._validate(e.target.value);
    };
}
