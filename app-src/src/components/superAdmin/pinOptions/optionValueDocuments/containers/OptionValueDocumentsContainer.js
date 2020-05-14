import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DROPDOWN_OPTION_LOOKUP, DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';
import fetchManufacturersByPinOptionType from 'actions/superAdmin/manufacturers/async/fetchManufacturersByPinOptionType';

import OptionValueDocuments from '../presentational/OptionValueDocuments';

class OptionValueDocumentsContainer extends Component {
    render() {
        // return <OptionValueDocuments name={name} />;
        return <OptionValueDocuments name={'##Option Value Example##'} />;
    }

    componentDidMount = () => {
        // const { fetchDocumentsByOptionValue, optionValueID } = this.props;
        // fetchDocumentsByOptionValue(optionValueID);
    };
}

// const mapStateToProps = (
//     _,
//     {
//         match: {
//             params: { optionValueID },
//         },
//     },
// ) => ({
//     optionValueID,
// });

// const mapDispatchToProps = {
//     fetchDocumentsByOptionValue,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentsContainer);
export default OptionValueDocumentsContainer;
