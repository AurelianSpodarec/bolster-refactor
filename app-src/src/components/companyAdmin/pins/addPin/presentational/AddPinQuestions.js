import React from 'react';
import Field from 'components/shared/generic/form/presentational/Field';

const AddPinQuestions = ({ sections, questions }) =>
    [...sections]
        .sort((a, b) => a.sort - b.sort)
        .map(section => (
            <div key={section.value} className="size-lg-12">
                <h3>{section.text}</h3>
                {[...questions]
                    .filter(
                        question => question.templateSectionID === section.value
                    )
                    .sort((a, b) => a.sort - b.sort)
                    .map(question => (
                        <Field
                            key={question.id}
                            name={question.name}
                            sizeClasses="size-lg-6"
                        >
                            <p>...</p>
                        </Field>
                    ))}
            </div>
        ));

export default AddPinQuestions;
