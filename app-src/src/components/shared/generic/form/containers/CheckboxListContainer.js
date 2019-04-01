import React, { Component } from 'react';
import CheckboxList from '../presentational/CheckboxList';

export default class CheckboxListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { items, checkedServices, handleChange } = this.props;
        return (
            <CheckboxList
                items={items}
                checkedServices={checkedServices}
                handleChange={handleChange}
            />
        );
    }
}
