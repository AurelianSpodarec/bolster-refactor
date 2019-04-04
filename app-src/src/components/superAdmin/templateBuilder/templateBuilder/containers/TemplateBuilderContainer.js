import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Prompt } from 'react-router-dom';

import { ADD_TEMPLATE_SECTION } from 'constants/shared/modalTypes';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilder from '../presentational/TemplateBuilder';

class TemplateBuilderContainer extends Component {
    state = {
        isBlocking: false
    };
    render() {
        const { showAddSectionModal, uuid } = this.props;
        const { isBlocking } = this.state;
        return (
            <Prompt when={isBlocking} message={() => 'are you sure?'}>
                <TemplateBuilder
                    showAddSectionModal={() => showAddSectionModal(uuid)}
                />
            </Prompt>
        );
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleWillLeaveSite);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleWillLeaveSite);
    }

    handleWillLeaveSite = e => {
        if (this.state.isBlocking) {
            e.returnValue = '';
        }
    };

    handleWillLeaveRoute = () => {
        return false;
    };
}

const mapDispatchToProps = dispatch => ({
    showAddSectionModal: templateUuid => {
        dispatch(showModal(ADD_TEMPLATE_SECTION, { templateUuid }));
    }
});

const WithConnect = connect(
    (_, { match }) => ({
        uuid: match.params.uuid
    }),
    mapDispatchToProps
)(TemplateBuilderContainer);

export default withRouter(WithConnect);
