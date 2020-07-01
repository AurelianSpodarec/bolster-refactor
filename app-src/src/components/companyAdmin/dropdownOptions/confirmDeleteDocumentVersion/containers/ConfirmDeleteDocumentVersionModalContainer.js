import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import deleteOptionValueDocumentVersion from 'actions/companyAdmin/manufacturers/async/deleteOptionValueDocumentVersion';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ConfirmDeleteDocumentVersionModal from '../presentational/ConfirmDeleteDocumentVersionModal';
import { DATE_TIME_DEFAULTS, DATE_TIME_IDS } from 'constants/companyAdmin/enums';

class ConfirmDeleteDocumentVersionModalContainer extends Component {
    render() {
        const { hideModal, version } = this.props;
        return (
            <ConfirmDeleteDocumentVersionModal
                handleDelete={this.handleDelete}
                hideModal={hideModal}
                version={version}
                message={`Are you sure you want to delete document version dated ${moment(
                    version.createdAt,
                ).format(DATE_TIME_DEFAULTS[DATE_TIME_IDS.DATETIME])}?`}
            />
        );
    }

    handleDelete = () => {
        const {
            deleteOptionValueDocumentVersion,
            optionValueID,
            document,
            version,
            manufacturerID,
        } = this.props;

        if (!version.hasBeenUsed) {
            const isLastVersion = document.versions.length === 1;
            deleteOptionValueDocumentVersion(
                manufacturerID,
                optionValueID,
                document.id,
                version.id,
                isLastVersion,
            );
        }
    };
}

const mapDispatchToProps = { hideModal, deleteOptionValueDocumentVersion };

export default connect(null, mapDispatchToProps)(ConfirmDeleteDocumentVersionModalContainer);
