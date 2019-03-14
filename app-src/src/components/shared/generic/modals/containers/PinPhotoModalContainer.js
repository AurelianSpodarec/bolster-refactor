import React from 'react';
import { connect } from 'react-redux';

import hideModal from 'actions/generic/modals/sync/hideModal';

import PinPhotoModal from '../presentational/PinPhotoModal';

const PinPhotoModalContainer = () => (
    <PinPhotoModal hideModal={() => this.props.dispatch(hideModal())} />
);

export default connect()(PinPhotoModalContainer);
