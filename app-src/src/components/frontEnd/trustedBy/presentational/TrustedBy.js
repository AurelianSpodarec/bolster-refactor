import React from 'react';
import Marquee from 'react-marquee-slider';
import Header from 'components/frontEnd/shared/header/presentational/Header';
import { FILE_STORAGE_URL } from 'config';

const TrustedBy = ({ data }) => {
    return (
        <div className="trusted-by-container">
            <Header className="trusted-by-header">
                <h3 className="line">Trusted worldwide by industry leaders</h3>
            </Header>
            {data.length > 5 ? (
                <div className="trusted-by-grid carousel-container">
                    <Marquee velocity={20}>
                        {data.map((item, index) => (
                            <div key={index} className="item">
                                {!item ? (
                                    'N/A'
                                ) : (
                                    <img
                                        src={`${FILE_STORAGE_URL}/${item.s3Key}`}
                                        alt={item.name}
                                    />
                                )}
                            </div>
                        ))}
                    </Marquee>
                </div>
            ) : (
                <div className="trusted-by-grid">
                    {data.map((item, index) => (
                        <div key={index} className="item">
                            {!item ? (
                                'N/A'
                            ) : (
                                <img src={`${FILE_STORAGE_URL}/${item.s3Key}`} alt={item.name} />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrustedBy;
