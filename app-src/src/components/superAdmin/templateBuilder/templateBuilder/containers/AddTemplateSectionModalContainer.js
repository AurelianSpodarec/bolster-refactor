import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import addSection from 'actions/superAdmin/templateBuilder/sync/addSection';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateSectionFormModal from '../presentational/TemplateSectionFormModal';

class AddTemplateSectionModalContainer extends React.Component {
    state = {
        name: ''
    };

    render() {
        return (
            <TemplateSectionFormModal
                action="Add"
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
        const { name } = this.state;
        const { sections, templateUuid } = this.props;

        const sort = Math.max(0, ...[...sections].map(s => s.sort)) + 1;
        this.props.addSection({ name, uuid: uuid(), sort, templateUuid });
    };
}

const mapStateToProps = ({ superAdmin: { templateSectionsReducer } }) => ({
    sections: Object.values(templateSectionsReducer.sections)
});

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
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateSectionModalContainer);
