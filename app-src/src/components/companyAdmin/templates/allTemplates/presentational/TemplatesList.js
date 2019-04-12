import React from 'react';
import TemplateListItem from './TemplateListItem';

const TemplatesList = ({ templates }) =>
    templates.map(({ id, ...template }) => (
        <TemplateListItem key={id} template={template} />
    ));

export default TemplatesList;
