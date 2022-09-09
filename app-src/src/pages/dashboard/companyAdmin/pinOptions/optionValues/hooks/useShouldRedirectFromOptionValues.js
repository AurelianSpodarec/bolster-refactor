import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectPinOptionSets } from 'selectors/companyAdmin/pinOptionSets';
import { selectPinOptionTypesArr } from 'selectors/companyAdmin/pinOptionTypes';

const useShouldRedirectFromOptionValues = hasFetched => {
    const { setID, type } = useParams();
    const pinOptionTypesArr = useSelector(selectPinOptionTypesArr);
    const pinOptionSets = useSelector(selectPinOptionSets);

    const specificType = pinOptionTypesArr.find(curType => curType.slug === type);
    const specificSet = pinOptionSets[setID];

    const checkRedirectToPinOptions = () => {
        if (!hasFetched) return false;

        if (!specificType || !specificSet) {
            return true;
        }

        if (specificSet && specificSet.pinOptionTypeID !== specificType.id) {
            return true;
        }

        return false;
    };

    const shouldRedirect = checkRedirectToPinOptions();

    return shouldRedirect;
};

export default useShouldRedirectFromOptionValues;
