import head from 'lodash/head';
import CSV from '_content/images/icons/output_icons/CSV.svg';
import Floorplan from '_content/images/icons/output_icons/Floorplan.svg';
import O_M from '_content/images/icons/output_icons/O_M.svg';
import PDF from '_content/images/icons/output_icons/PDF.svg';
import PDF_Floorplan from '_content/images/icons/output_icons/PDF_Floorplan.svg';
import PDF_Pins from '_content/images/icons/output_icons/PDF_Pins.svg';
import PDF_Floorplan_Pins from '_content/images/icons/output_icons/PDF_Floorplan_Pins.svg';

export const filterOutput = currentState => {
    const {
        isPDFGeneration,
        isCSVGeneration,
        isFloorplanGeneration,
        isOAndMManualGeneration,
    } = currentState;

    const obj = {
        isPDFGeneration,
        isCSVGeneration,
        isFloorplanGeneration,
        isOAndMManualGeneration,
    };

    const filteredState = Object.entries(obj).reduce((result, [key, value]) => {
        if (key === 'isPDFGeneration')
            return value ? [...result, pdfGenImageOutput(currentState)] : result;
        return value ? [...result, key] : result;
    }, []);

    console.log(filteredState);

    return filteredState;
};

export const pdfGenImageOutput = obj => {
    if (obj.includePinLocation && obj.includeFloorplan)
        return 'isPDFFloorplanPinLocationGeneration';

    if (obj.includeFloorplan) return 'isPDFFloorplanGeneration';

    if (obj.includePinLocation) return 'isPDFPinLocationGeneration';

    return 'isPDFGeneration';
};

export const imageToOutput = filteredOption => {
    const filter = head(filteredOption);
    return filteredImage(filter);
};

export const isTherePDF = arr => {
    const conditions = [
        'isPDFGeneration',
        'isPDFFloorplanGeneration',
        'isPDFPinLocationGeneration',
        'isPDFFloorplanPinLocationGeneration',
    ];

    return conditions.some(index => arr.includes(index)) ? 'pdf' : '';
};

export const filteredImage = filter => {
    switch (filter) {
        case 'isPDFGeneration':
            return PDF;
        case 'isCSVGeneration':
            return CSV;
        case 'isFloorplanGeneration':
            return Floorplan;
        case 'isOAndMManualGeneration':
            return O_M;
        case 'isPDFFloorplanGeneration':
            return PDF_Floorplan;
        case 'isPDFPinLocationGeneration':
            return PDF_Pins;
        case 'isPDFFloorplanPinLocationGeneration':
            return PDF_Floorplan_Pins;
        default:
            return null;
    }
};
