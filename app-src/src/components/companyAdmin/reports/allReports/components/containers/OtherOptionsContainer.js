import React from 'react';
import { connect } from 'react-redux';
import OtherOptions from '../presentational/OtherOptions';
import updateFilterOption from 'actions/companyAdmin/reports/sync/updateFilterOption';
import {
    SORT_BY_OPTIONS_TEXT,
    LAYOUT_OPTIONS_TEXT
} from 'constants/companyAdmin/enums';

const OtherOptionsContainer = ({ options, updateFilterOption }) => {
    const enumFormat = obj =>
        Object.entries(obj).map(([value, label]) => ({
            value: String(value),
            label
        }));
    const sortByOptions = enumFormat(SORT_BY_OPTIONS_TEXT);
    const layoutOptions = enumFormat(LAYOUT_OPTIONS_TEXT);
    return (
        <OtherOptions
            handleChange={handleChange}
            handleChangeSelect={handleChangeSelect}
            options={options}
            sortByOptions={sortByOptions}
            layoutOptions={layoutOptions}
        />
    );

    function handleChange({ target: { name, value, checked, type } }) {
        updateFilterOption(name, type === 'checkbox' ? checked : value);
    }

    function handleChangeSelect(name, value) {
        updateFilterOption(name, String(value));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { options }
    }
}) => ({
    options
});

const mapDispatchToProps = dispatch => ({
    updateFilterOption: (key, value) => dispatch(updateFilterOption(key, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OtherOptionsContainer);
