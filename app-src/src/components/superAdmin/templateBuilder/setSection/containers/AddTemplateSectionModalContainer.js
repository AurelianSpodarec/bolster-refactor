import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import setSection from 'actions/superAdmin/templateBuilder/sync/setSection';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

import TemplateSectionFormModal from '../presentational/TemplateSectionFormModal';

class AddTemplateSectionModalContainer extends React.Component {
    state = {
        name: '',
        isAfterLabel: false
    };

    render() {
        return (
            <TemplateSectionFormModal
                action="Add"
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

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { name, isAfterLabel } = this.state;
        const { sections, templateUUID } = this.props;

        const sort = Math.max(0, ...[...sections].map(s => s.sort)) + 1;
        this.props.setSection({
            name,
            uuid: uuid(),
            sort,
            templateUUID,
            isAfterLabel
        });
    };
}

const mapStateToProps = (
    { superAdmin: { templateSectionsReducer } },
    { templateUUID }
) => ({
    sections: Object.values(templateSectionsReducer.sections).filter(
        sec => templateUUID === sec.templateUUID
    )
});

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    setSection: newSection => {
        dispatch(setSection(newSection));
        dispatch(hideModal());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTemplateSectionModalContainer);
