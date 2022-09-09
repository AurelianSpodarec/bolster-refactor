import React from 'react';
import { FILE_STORAGE_URL } from 'config';

const TrustedBy = ({ data }) => {
    return (
        <div className="trusted-by-settings-container">
            <div className="trusted-by-grid">
                {data.map((item, index) => (
                    <div key={index} className="trusted-by-grid-item-container">
                        <div
                            className="trusted-by-grid-item"
                            style={{ backgroundImage: `url(${item ? item.s3Key : ''})` }}
                        >
                            {!item ? (
                                'N/A'
                            ) : (
                                <img src={`${FILE_STORAGE_URL}/${item.s3Key}`} alt={item.name} />
                            )}
                        </div>
                        <p>{!item ? 'N/A' : item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustedBy;
