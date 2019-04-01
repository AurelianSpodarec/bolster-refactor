import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import addSection from 'actions/superAdmin/templateBuilder/sync/addSection';
import hideModal from 'actions/generic/modals/sync/hideModal';

import AddTemplateModal from '../presentational/AddTemplateModal';

class AddTemplateModalContainer extends React.Component {
    state = {
        name: ''
    };

    render() {
        return (
            <AddTemplateModal
                name={this.state.name}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
            />
        );
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { companyID } = this.props;
        console.log('hihihihihi');
        console.log(companyID);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    addSection: newSection => {
        dispatch(addSection(newSection));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AddTemplateModalContainer);
