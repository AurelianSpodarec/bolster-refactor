import fetchAllPrelims from 'actions/companyAdmin/prelims/async/fetchAllPrelims';
import { PRELIMS_ENUM } from 'constants/companyAdmin/enums';
import { convertArrToObj, convertEnumToDropdownOptions } from 'helpers/generic';
import { useForm } from 'helpers/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPrelimsArr } from 'selectors/companyAdmin/prelims';

const useAddExistingPrelim = () => {
    const dispatch = useDispatch();

    const formatArrForDropdown = arr => {
        const options = arr
            .filter(val => val)
            .map(({ name, id, type, value }) => ({
                value: id,
                text: `${name}(${PRELIMS_ENUM[type] === 'Percent' ? value + '%' : '£' + value})`,
            }));

        return convertArrToObj(options, 'value');
    };

    const allPrelims = useSelector(selectPrelimsArr);
    const prelimsOptions = formatArrForDropdown(allPrelims);
    const isPosting = false;
    const [form, handleChange] = useForm({
        prelim: null,
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
        };
    };

    useEffect(() => {
        dispatch(fetchAllPrelims());
    }, [dispatch]);

    return {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        prelimsOptions,
    };
};

export default useAddExistingPrelim;
