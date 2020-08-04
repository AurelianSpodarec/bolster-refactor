import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    DROPDOWN_OPTION_LOOKUP,
    DROPDOWN_OPTIONS,
    DEFAULT_PIN_OPTIONS_SORT,
} from 'constants/companyAdmin/enums';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

import DropdownList from '../presentational/DropdownList';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

class DropdownListContainer extends Component {
    state = {
        selectedSortValue: this.props.defaultDropdownSorting || DEFAULT_PIN_OPTIONS_SORT.CUSTOM,
    };

    render() {
        const { type } = this.props;
        const { name } = DROPDOWN_OPTIONS[DROPDOWN_OPTION_LOOKUP[type]];
        return (
            <DropdownList
                name={name}
                type={DROPDOWN_OPTION_LOOKUP[type]}
                selectedSortValue={this.state.selectedSortValue}
                handleSortChange={this.handleSortChange}
            />
        );
    }

    componentDidMount = () => {
        const { fetchAllDropdownOptions, fetchManufacturersByPinOptionType, type } = this.props;

        fetchManufacturersByPinOptionType(DROPDOWN_OPTION_LOOKUP[type]);
        fetchAllDropdownOptions(DROPDOWN_OPTION_LOOKUP[type]);
    };

    handleSortChange = value => {
        this.setState({
            selectedSortValue: value,
        });
    };
}

const mapStateToProps = (
    _,
    {
        match: {
            params: { type },
        },
    },
) => ({
    type,
});

const mapDispatchToProps = {
    fetchAllDropdownOptions,
    fetchManufacturersByPinOptionType,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownListContainer);
