import React from 'react';
import ZIP from '_content/images/icons/output_icons/ZIP_Only.svg';
import Arrow from '_content/images/icons/output_icons/Arrow.svg';
import { IMAGE_VISUAL_POSITION } from 'constants/companyAdmin/enums';
import { filteredImage, isTherePDF } from 'helpers/outputVisuals';

const ImageVisualMultiple = ({ filterArr }) => {
    return (
        <div className={`image-visual multiple ${isTherePDF(filterArr)}`}>
            <div className="image-visual-center">
                <img src={ZIP} alt="Icon" />
            </div>
            {filterArr.map((item, index) => (
                <div key={index} className={`image-visual-${IMAGE_VISUAL_POSITION[index]}`}>
                    <img src={filteredImage(item)} alt={`${item}${index}`} />
                    <img className="arrow" src={Arrow} alt="Arrow" />
                </div>
            ))}
        </div>
    );
};

export default ImageVisualMultiple;
