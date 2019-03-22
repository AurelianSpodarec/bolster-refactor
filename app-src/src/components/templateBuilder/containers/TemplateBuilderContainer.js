import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    ADD_TEMPLATE_SECTION,
    ADD_TEMPLATE_QUESTION
} from 'constants/modalTypes';

import showModal from 'actions/generic/modals/sync/showModal';

import TemplateBuilder from '../presentational/TemplateBuilder';

class TemplateBuilderContainer extends Component {
    render() {
        return <TemplateBuilder addSection={this.addSection} />;
    }

    addSection = e => {
        const { showModal } = this.props;

        e.preventDefault();

        showModal(ADD_TEMPLATE_SECTION);
    };

    addField = e => {
        const { showModal } = this.props;

        e.preventDefault();

        showModal(ADD_TEMPLATE_QUESTION);
    };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderContainer);
