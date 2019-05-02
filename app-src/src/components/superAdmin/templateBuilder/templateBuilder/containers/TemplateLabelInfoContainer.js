import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import TemplateLabelInfo from '../presentational/TemplateLabelInfo';
import { SET_LABEL_FIELDS } from 'constants/shared/modalTypes';

class TemplateLabelInfoContainer extends Component {
    render() {
        const { template, labelFields } = this.props;

        console.log(labelFields);
        console.log(labelFields);
        console.log(labelFields);
        console.log(labelFields);
        if (!template) return null;
        return (
            <TemplateLabelInfo
                showSetLabelsModal={this.showSetLabelsModal}
                fields={labelFields}
            />
        );
    }

    showSetLabelsModal = () => {
        const { showModal, template } = this.props;
        showModal(SET_LABEL_FIELDS, { template });
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates },
            templateLabelFieldsReducer: { labelFields }
        }
    },
    {
        match: {
            params: { uuid }
        }
    }
) => ({
    template: templates[uuid],
    labelFields: Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID === uuid
    )
});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps))
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateLabelInfoContainer);

export default withRouter(WithConnect);
