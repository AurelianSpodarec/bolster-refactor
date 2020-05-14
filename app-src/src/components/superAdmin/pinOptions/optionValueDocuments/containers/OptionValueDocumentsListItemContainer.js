import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import selectPinHistory from 'actions/companyAdmin/pins/sync/selectPinHistory';
import OptionValueDocumentsListItem from '../presentational/OptionValueDocumentsListItem';

class OptionValueDocumentsListItemContainer extends Component {
    state = { active: false };

    render() {
        const { document } = this.props;

        return <OptionValueDocumentsListItem document={document} />;
    }

    componentDidUpdate = prevProps => {};

    handleEditDocumentModal = () => {
        //todo edit document name modal and reducers
    };

    handleAddDocumentVersionModal = () => {
        //todo add version to document modal and reducers
    };
}

// export default connect(mapStateToProps, mapDispatchToProps)(OptionValueDocumentsListItemContainer);
export default OptionValueDocumentsListItemContainer;
