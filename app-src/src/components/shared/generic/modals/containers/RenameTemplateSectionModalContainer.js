import React from 'react';
import { connect } from 'react-redux';

import updateSection from 'actions/superAdmin/templateBuilder/sync/updateSection';
import hideModal from 'actions/generic/modals/sync/hideModal';

import RenameTemplateSectionModal from '../presentational/RenameTemplateSectionModal';

class RenameTemplateSectionModalContainer extends React.Component {
    state = {
        name: ''
    };
    render() {
        return (
            <RenameTemplateSectionModal
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
    componentDidMount = () => {
        this.setState({
            name: this.props.section.name
        });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        this.props.updateSection({ name, uuid: this.props.section.uuid });
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    updateSection: section => {
        dispatch(updateSection(section));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(RenameTemplateSectionModalContainer);
