import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const ExpiringDrawingsModal = ({ drawings }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const closeModal = () => {
        dispatch(hideModal());
    };

    const handleDrawingClick = (e, drawingID) => {
        e.preventDefault();

        history.push(`/company/drawings/${drawingID}`);
        closeModal();
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title="Drawing Expiry" />

            {drawings.map(({ id, siteName, buildingName, floorName, name, expiresOn }) => (
                <div key={id} className="mc-drawing-expiry">
                    <button onClick={e => handleDrawingClick(e, id)}>
                        {`${siteName} / ${buildingName} / ${floorName} / ${name} - `}
                        <span className={moment(expiresOn).isAfter(Date.now()) ? 'green' : 'red'}>
                            <strong>Expiry Date </strong>
                            {moment(expiresOn).format('DD/MM/YYYY')}
                        </span>
                    </button>
                </div>
            ))}
        </ModalOuterContainer>
    );
};

export default ExpiringDrawingsModal;
