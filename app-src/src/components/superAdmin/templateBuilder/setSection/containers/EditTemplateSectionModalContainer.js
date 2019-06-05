import React from 'react';
import { connect } from 'react-redux';

import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateSectionFormModal from '../presentational/TemplateSectionFormModal';

class EditTemplateSectionModalContainer extends React.Component {
    state = {
        name: '',
        isAfterLabel: false
    };
    render() {
        return (
            <TemplateSectionFormModal
                action="Edit"
                name={this.state.name}
                isAfterLabel={this.state.isAfterLabel}
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
        const { name, isAfterLabel } = this.props.section;
        this.setState({
            name,
            isAfterLabel
        });
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { section } = this.props;
        const { name, isAfterLabel } = this.state;
        this.props.setSection({ ...section, name, isAfterLabel });
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
