import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PreviewSectionList from '../presentational/PreviewSectionList';
import fetchTemplate from 'actions/superAdmin/templateBuilder/async/fetchTemplate';
import { isEmpty } from 'helpers/generic';

let PreviewSectionListContainer = ({
    sections,
    questionBySection,
    fetchTemplate,
    templateUUID,
    template,
    labelFields
}) => {
    useEffect(() => {
        if (isEmpty(labelFields)) fetchTemplate(templateUUID);
    }, []);
    return (
        <PreviewSectionList
            template={template}
            sections={sections}
            questionBySection={questionBySection}
        />
    );
};

const mapStateToProps = (
    {
        superAdmin: {
            templateSectionsReducer: { sections },
            templateQuestionsReducer: { questions },
            templatesReducer: { templates },
            templateLabelFieldsReducer: { labelFields }
        }
    },
    {
        match: {
            params: { uuid }
        }
    }
) => {
    const secs = Object.values(sections)
        .filter(section => section.templateUUID === uuid)
        .sort((a, b) => a.sort - b.sort);

    const secIDs = secs.map(s => s.uuid);
    const questionBySection = Object.values(questions)
        .filter(ques => secIDs.includes(ques.sectionUUID))
        .reduce((acc, ques) => {
            acc[ques.sectionUUID] = [...acc[ques.sectionUUID], ques];

            return acc;
        }, secIDs.reduce((acc, id) => ({ ...acc, [id]: [] }), {}));
    return {
        templateUUID: uuid,
        sections: secs,
        questionBySection,
        template: templates[uuid] || {},
        labelFields: Object.values(labelFields).filter(
            ({ templateUUID }) => String(templateUUID) === uuid
        )
    };
};

const mapDispatchToProps = { fetchTemplate };

PreviewSectionListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PreviewSectionListContainer);
export default withRouter(PreviewSectionListContainer);
