import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import TemplateLabelInfo from '../presentational/TemplateLabelInfo';
import { SET_LABEL_FIELDS } from 'constants/shared/modalTypes';

class TemplateLabelInfoContainer extends Component {
    render() {
        const { template } = this.props;
        if (!template) return null;
        return <TemplateLabelInfo />;
    }

    showSetLabelsModal = () => {
        const { showModal } = this.props;
        showModal(SET_LABEL_FIELDS);
    };
}

const mapStateToProps = (
    { superAdmin: { templatesReducer } },
    {
        match: {
            params: { uuid }
        }
    }
) => ({ template: templatesReducer[uuid] });

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) =>
        dispatch(showModal(modalType, modalProps))
});

const WithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateLabelInfoContainer);

export default withRouter(WithConnect);
