import React from 'react';
import { connect } from 'react-redux';

import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
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

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { section } = this.props;
        const { name } = this.state;
        this.props.setSection({ ...section, name });
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    setSection: section => {
        dispatch(setSection(section));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditTemplateSectionModalContainer);
