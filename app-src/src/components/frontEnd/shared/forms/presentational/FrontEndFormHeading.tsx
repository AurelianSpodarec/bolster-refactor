import React from 'react';

const FrontEndFormHeading = ({ title, subtitle = '', classes = '' }: FrontEndFormHeadingProps) => {
    return (
        <div className={`auth-form-heading ${classes}`}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
};

interface FrontEndFormHeadingProps {
    title: string;
    subtitle?: string;
    classes?: string;
}

export default FrontEndFormHeading;
