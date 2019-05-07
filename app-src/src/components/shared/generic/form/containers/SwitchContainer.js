import React, { Component } from 'react';
import Switch from '../presentational/Switch';

export default class SwitchContainer extends Component {
    render() {
        const {
            checked,
            disabled = false,
            handleChange,
            value,
            name,
            text
        } = this.props;
        return (
            <Switch
                checked={checked}
                disabled={disabled}
                handleChange={handleChange}
                handleBlur={this.handleBlur}
                name={name}
                text={text}
                value={value}
            />
        );
    }

    handleBlur = () => {
        this.setState({ showFieldError: true });
    };

    handleChange = ({ target: { name, value } }) => {
        this.props.handleChange(name, value);
        // this._validate(e.target.value);
    };
}
