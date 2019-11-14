import React from 'react';
import { RAW_S3_STORAGE_URL } from 'config';


const StaticImage = ({ question }) => (
    <img
        style={{ maxWidth: '100%' }}
        alt={question.name}
        src={`${RAW_S3_STORAGE_URL}/${question.file}`}
    />
);

export default StaticImage;