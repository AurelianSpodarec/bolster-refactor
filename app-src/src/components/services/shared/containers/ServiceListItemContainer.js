import React, { Component } from 'react';
import ServiceListItem from '../presentational/ServiceListItem';
import { showModal } from 'actions/generic/modals/sync/showModal';
import { connect } from 'react-redux';
import { EDIT_SERVICE } from 'constants/modalTypes';

class ServiceListItemContainer extends Component {
    render() {
        const { service, colCount } = this.props;
        return (
            <ServiceListItem
                service={service}
                colCount={colCount}
                handleShowModal={this.handleShowModal}
            />
        );
    }

    handleShowModal = service => {
        this.props.showModal(EDIT_SERVICE, service);
    };
}

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ServiceListItemContainer);
