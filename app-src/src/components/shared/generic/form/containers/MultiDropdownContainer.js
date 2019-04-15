import React, { Component } from 'react';
import MultiDropdown from '../presentational/MultiDropdown';

class MultiSelectDropdown extends Component {
    render() {
        const { options } = this.props;

        return (
            <MultiDropdown options={options} handleChange={this.handleChange} />
        );
    }

    handleChange = e => {
        this.props.handleChange(e);
    };
}

export default MultiSelectDropdown;
