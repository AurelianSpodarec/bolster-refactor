import React from 'react';

import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const TemplateBuilderHeader = ({
    name = '',
    showTemplateForm,
    serviceName,
    isExisting,
    showAddSectionModal,
    templateUUID,
    companyID
}) => (
    <PageHeading
        title={`Template builder : ${name} ${
            serviceName ? `(${serviceName})` : ''
        }`}
    >
        <div className="button-holder">
            <BackButtonContainer />
            <button className="button yellow" onClick={showTemplateForm}>
                <i className="far fa-pencil" /> {name.length ? 'Edit' : 'Add'}{' '}
                template
            </button>
            {isExisting && (
                <>
                    <button
                        onClick={showAddSectionModal}
                        className="button blue"
                    >
                        <i className="fa fa-plus" /> Add Section
                    </button>
                    <ButtonContainer
                        to={`/admin/companies/${companyID}/template/${templateUUID}/label-example`}
                    >
                        Label Example
                    </ButtonContainer>
                </>
            )}
        </div>
    </PageHeading>
);

export default TemplateBuilderHeader;
