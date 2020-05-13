import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ADMIN_EDIT_MANUFACTURER } from 'constants/shared/modalTypes';

import OptionValueListItem from '.../presentational/OptionValueListItem;
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class OptionValueListItemContainer extends Component {
    render() {
        const { optionValue, colCount, headers, onMobile } = this.props;
        return (
            <OptionValueListItem
                optionValue={optionValue}
                colCount={colCount}
                handleEditOptionValueModal={this.handleEditOptionValueModal}
                headers={headers}
                onMobile={onMobile}
            />
        );
    }
    handleEditOptionValueModal = optionValue => {
        const { showModal } = this.props;
        // showModal(ADMIN_EDIT_MANUFACTURER, { optionValue });
        // todo edit option value modal and associated redux functions
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props)),
});

export default connect(
    ({
        shared: {
            mobileReducer: { onMobile },
        },
    }) => ({
        onMobile,
    }),
    mapDispatchToProps,
)(OptionValueListItemContainer);
