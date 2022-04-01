import React from 'react';
import ZIP from '_content/images/icons/output_icons/ZIP_Only.svg';
import Arrow from '_content/images/icons/output_icons/Arrow.svg';
import { IMAGE_VISUAL_POSITION } from 'constants/companyAdmin/enums';
import { filteredImage, isTherePDF } from 'helpers/outputVisuals';
import useColourTheme from 'hooks/useColourTheme';

const ImageVisualMultiple = ({ filterArr }) => {
    const colourTheme = useColourTheme();
    return (
        <div className={`image-visual multiple ${isTherePDF(filterArr)}`}>
            <div className="image-visual-center">
                <img
                    src={ZIP}
                    alt="Icon"
                    style={
                        colourTheme === 'dark'
                            ? {
                                  webkitFilter: 'invert(0.8)',
                                  filter: 'invert(0.8)',
                              }
                            : {}
                    }
                />
            </div>
            {filterArr.map((item, index) => (
                <div key={index} className={`image-visual-${IMAGE_VISUAL_POSITION[index]}`}>
                    <img
                        src={filteredImage(item)}
                        alt={`${item}${index}`}
                        style={
                            colourTheme === 'dark'
                                ? {
                                      webkitFilter: 'invert(0.8)',
                                      filter: 'invert(0.8)',
                                  }
                                : {}
                        }
                    />
                    <img
                        className="arrow"
                        src={Arrow}
                        alt="Arrow"
                        style={
                            colourTheme === 'dark'
                                ? {
                                      webkitFilter: 'invert(0.8)',
                                      filter: 'invert(0.8)',
                                  }
                                : {}
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default ImageVisualMultiple;
