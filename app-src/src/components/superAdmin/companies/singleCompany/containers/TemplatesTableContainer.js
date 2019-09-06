import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid/v1';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import TemplatesTable from '../presentational/TemplatesTable';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { ADD_TEMPLATE, COPY_TEMPLATE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

class TemplatesTableContainer extends Component {
    render() {
        const { templates, isFetching, error } = this.props;

        return (
            <BlockContainer>
                <div className="size-lg-6 size-md-12">
                    <BlockHeading title="Templates" />
                </div>

                <BlockButtonWrapper
                    additionalClasses="no-margin"
                    sizeClasses="size-lg-6 size-md-12"
                >
                    <button className="button green" onClick={this.showAddTemplateModal}>
                        <i className="fa fa-plus" /> Add
                    </button>
                    <button className="button green" onClick={this.showCloneTemplateModal}>
                        <i className="fas fa-clone" /> Clone
                    </button>
                </BlockButtonWrapper>

                <TemplatesTable
                    headers={['Name', '']}
                    templates={templates}
                    isFetching={isFetching}
                    error={error}
                />
            </BlockContainer>
        );
    }

    showAddTemplateModal = () => {
        const {
            showModal,
            companyID,
            history,
            location: { pathname }
        } = this.props;
        const newUuid = uuid();

        showModal(ADD_TEMPLATE, { companyID, uuid: newUuid });
        history.push(`${pathname}/template/${newUuid}`);
    };

    showCloneTemplateModal = () => {
        const { showModal, companyID } = this.props;

        showModal(COPY_TEMPLATE, { companyID });
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates, isFetching, error }
        }
    },
    { match: { params } }
) => ({
    companyID: params.id,
    templates: Object.values(templates).filter(
        temp => temp.companyID + '' === params.id + '' && !temp.isDeleted
    ),
    isFetching,
    error
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

const TableWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplatesTableContainer);

export default withRouter(TableWithConnect);
