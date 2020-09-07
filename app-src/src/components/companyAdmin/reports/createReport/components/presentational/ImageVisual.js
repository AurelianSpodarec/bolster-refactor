import React from 'react';
import CSV from '_content/images/icons/output_icons/CSV.svg';
import Floorplan from '_content/images/icons/output_icons/Floorplan.svg';
import O_M from '_content/images/icons/output_icons/O_M.svg';
import PDF from '_content/images/icons/output_icons/PDF.svg';
import PDF_Floorplan from '_content/images/icons/output_icons/PDF_Floorplan.svg';
import PDF_Pins from '_content/images/icons/output_icons/PDF_Pins.svg';
import PDF_Floorplan_Pins from '_content/images/icons/output_icons/PDF_Floorplan_Pins.svg';
import ZIP from '_content/images/icons/output_icons/ZIP_Only.svg';

const ImageVisual = () => {
    return (
        <div className="image-visual">
            <img src={CSV} alt="Icon" />
        </div>
    );
};

export default ImageVisual;
