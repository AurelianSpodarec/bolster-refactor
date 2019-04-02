import React, { Component } from 'react';
import CheckboxList from '../presentational/CheckboxList';

export default class CheckboxListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { items, handleChange } = this.props;
        return <CheckboxList items={items} handleChange={handleChange} />;
    }
}
