import React, { useState } from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import { useDispatch } from 'react-redux';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import Field from '../../form/presentational/Field';
import Select from '../../form/presentational/Select';
import { LAYOUT_OPTIONS_TEXT } from 'constants/companyAdmin/enums';
import updateReportLayoutForAllVersions from 'actions/superAdmin/templateBuilder/async/updateReportLayoutForAllVersions';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL } from 'constants/shared/modalTypes';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';

const UpdateReportLayoutModal = ({ template }) => {
    const reportOptions = Object.entries(LAYOUT_OPTIONS_TEXT).map(([value, label]) => ({
        value: +value,
        label,
    }));
    const dispatch = useDispatch();
    const [reportLayout, setLayout] = useState(template.reportLayout);
    const handleSubmit = () => {
        dispatch(updateReportLayoutForAllVersions(template.uuid, { reportLayout }))
            .then(() => {
                dispatch(fetchTemplate(template.uuid));
                dispatch(hideModal());
            })
            .catch(() => dispatch(showModal(ERROR_MODAL)));
    };
    return (
        <ModalOuterContainer>
            <BlockHeading title="Select Size of Pins" />

            <Field styles={{ marginBottom: '5em' }} name="Report layout" required>
                <Select
                    name="reportLayout"
                    placeholder="-- select layout option --"
                    onChange={(_, value) => setLayout(value)}
                    options={reportOptions}
                    value={reportLayout}
                    required
                />
            </Field>
            <BlockButtonWrapper>
                <button onClick={() => dispatch(hideModal())} className="button">
                    Close
                </button>
                <button onClick={handleSubmit} className="button green">
                    <i className="fa fa-file" />
                    Update
                </button>
            </BlockButtonWrapper>
        </ModalOuterContainer>
    );
};

export default UpdateReportLayoutModal;
