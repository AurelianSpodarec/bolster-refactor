import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const RecentUpdateModal = ({ update: { title, fullDescription, publishDate }, hideModal }) => (
    <ModalOuterContainer>
        <BlockHeading title={title} />
        <FieldOutput title="Description" description={fullDescription} />
        <FieldOutput title="Publish Date">
            <p>
                <DateTimeContainer date={moment.utc(publishDate).format('YYYY-MM-DDTHH:mm:ss')} />
            </p>
        </FieldOutput>
        <BlockButtonWrapper>
            <button className="button" onClick={hideModal}>
                Close
            </button>
        </BlockButtonWrapper>
    </ModalOuterContainer>
);

const mapDispatchToProps = {
    hideModal,
};

export default connect(null, mapDispatchToProps)(RecentUpdateModal);
