import React from 'react';
import newUUID from 'uuid/v1';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADD_TEMPLATE, EDIT_TEMPLATE } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import TemplateBuilderHeader from '../presentational/TemplateBuilderHeader';
import postTemplate from 'actions/superAdmin/templateBuilder/async/postTemplate';

const TemplateBuilderHeaderContainer = ({
    showAddTemplateForm,
    showEditTemplateForm,
    uuid,
    companyID,
    template,
    isExisting,
    showAddSectionModal,
    serviceName,
    templateSections,
    labelFields,
    templateSectionQuestions,
    postTemplate
}) => {
    return (
        <TemplateBuilderHeader
            showTemplateForm={showTemplateForm}
            name={template.name}
            serviceName={serviceName}
            addTemplateFromExisting={addTemplateFromExisting}
            showAddSectionModal={showAddSectionModal}
            isExisting={isExisting}
        />
    );

    function showTemplateForm() {
        !template.uuid
            ? showAddTemplateForm(uuid, companyID)
            : showEditTemplateForm(template, companyID);
    }

    function addTemplateFromExisting() {
        const newTemplateUUID = newUUID();
        const newTemplate = {
            ...template,
            name: `${template.name}(copy)`,
            uuid: newTemplateUUID
        };
        const newSections = [];
        const newQuestions = [];

        templateSections.forEach(template => {
            const newSectionUUID = newUUID();
            newSections.push({
                ...template,
                uuid: newSectionUUID,
                newTemplateUUID
            });

            templateSectionQuestions.forEach(({ sectionUUID, ...question }) => {
                if (sectionUUID === template.uuid) {
                    const newQuestionUUID = newUUID();
                    newQuestions.push({
                        ...question,
                        sectionUUID: newSectionUUID,
                        uuid: newQuestionUUID
                    });
                }
            });
        });

        const newLabelFields = labelFields.map(lField => ({
            ...lField,
            templateUUID: newTemplateUUID,
            uuid: newUUID()
        }));

        const postBody = {
            template: newTemplate,
            sections: newSections,
            questions: newQuestions,
            labelFields: newLabelFields
        };
        postTemplate(postBody);
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            templatesReducer: { templates },
            templateSectionsReducer: { sections },
            templateQuestionsReducer: { questions },
            templateLabelFieldsReducer: { labelFields },
            adminServicesReducer: { adminServices: services }
        }
    },
    {
        match: {
            params: { uuid, companyID }
        }
    }
) => {
    const template = templates[uuid] || { serviceID: '' };
    const templateSections = Object.values(sections).filter(
        ({ templateUUID }) => templateUUID === uuid
    );
    const sectionIDs = templateSections.map(({ uuid }) => uuid);
    const templateSectionQuestions = Object.values(questions).filter(
        ({ sectionUUID }) => sectionIDs.includes(sectionUUID)
    );
    const templatelabelFields = Object.values(labelFields).filter(
        ({ templateUUID }) => templateUUID === uuid
    );
    const service = services[template.serviceID] || {};
    return {
        template,
        templateSections,
        templateSectionQuestions,
        labelFields: templatelabelFields,
        uuid,
        companyID,
        serviceName: services && template ? service.name : ''
    };
};

const mapDispatchToProps = dispatch => ({
    showAddTemplateForm: (uuid, companyID) => {
        dispatch(showModal(ADD_TEMPLATE, { uuid, companyID }));
    },
    showEditTemplateForm: (template, companyID) => {
        dispatch(showModal(EDIT_TEMPLATE, { template, companyID }));
    },
    postTemplate: postBody => dispatch(postTemplate(postBody))
});

const HeaderWithConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateBuilderHeaderContainer);

export default withRouter(HeaderWithConnect);
