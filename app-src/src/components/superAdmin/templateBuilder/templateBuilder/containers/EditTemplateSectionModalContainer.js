import React from 'react';
import { connect } from 'react-redux';

import updateSection from 'actions/superAdmin/templateBuilder/sync/updateSection';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateSectionFormModal from '../presentational/TemplateSectionFormModal';

class EditTemplateSectionModalContainer extends React.Component {
    state = {
        name: ''
    };
    render() {
        return (
            <TemplateSectionFormModal
                action="Edit"
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
        const { section } = this.props;
        const { name } = this.state;
        this.props.updateSection({ ...section, name });
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
)(EditTemplateSectionModalContainer);
