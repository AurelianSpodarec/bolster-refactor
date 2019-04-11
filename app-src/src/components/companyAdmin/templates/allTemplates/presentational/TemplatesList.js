import React from 'react';
import TemplateListItem from './TemplateListItem';

const TemplatesList = ({ templates }) => {
    return templates.map(template => (
        <TemplateListItem key={template.id} template={template} />
    ));
};

export default TemplatesList;
