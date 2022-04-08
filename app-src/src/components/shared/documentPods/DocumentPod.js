import React from 'react';

import MockImage from '_content/images/previews/light-theme-preview.jpg';

const DocumentPod = () => {
    return (
        <a className="document-pod" href="#">
            <div className="image-wrapper">
                <img alt="Document preview" src={MockImage} />
            </div>

            <div className="info-wrapper">
                <p className="title">## Name of document ##</p>
                <p className="last-updated">Updated ## 12/01/2021 - 14:14 ##</p>
            </div>
        </a>
    );
};

export default DocumentPod;
