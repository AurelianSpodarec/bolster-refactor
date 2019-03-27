import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from 'actions/generic/modals/sync/showModal';
import EnquiriesListItem from '../presentational/EnquiriesListItem';
import { DELETE_ENQUIRY } from 'constants/modalTypes';

class EnquiriesListItemContainer extends Component {
    render() {
        const { enquiry, colCount } = this.props;
        return (
            <EnquiriesListItem
                enquiry={enquiry}
                colCount={colCount}
                handleShowModal={this.handleShowModal}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { postingError } = this.props;
        if (postingError && !prevProps.postingError) {
            // do the thing
            console.log('error now hello');
        }
    }

    handleShowModal = enquiry => {
        const { showModal } = this.props;
        showModal(DELETE_ENQUIRY, { id: enquiry.id });
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

const mapStateToProps = ({ enquiriesReducer }) => ({
    postingError: enquiriesReducer.postingError
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnquiriesListItemContainer);
