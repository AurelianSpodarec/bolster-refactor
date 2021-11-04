import fetchDocumentLibraryStorageInfo from 'actions/companyAdmin/documentLibrary/async/fetchDocumentLibraryStorageInfo';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectDocumentLibraryFetchError,
    selectDocumentLibraryIsFetching,
    selectDocumentLibraryStorageInformation,
} from 'selectors/documentLibrary';

const useDocumentLibraryStorageInformation = () => {
    const dispatch = useDispatch();

    const storageInformation = useSelector(selectDocumentLibraryStorageInformation);
    const isFetching = useSelector(selectDocumentLibraryIsFetching);
    const fetchError = useSelector(selectDocumentLibraryFetchError);

    useEffect(() => {
        dispatch(fetchDocumentLibraryStorageInfo());
    }, [dispatch]);

    return { isFetching, fetchError, storageInformation };
};

export default useDocumentLibraryStorageInformation;
