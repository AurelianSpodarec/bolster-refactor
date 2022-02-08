import fetchDocumentLibraryStorageInfo from 'actions/companyAdmin/documentLibrary/async/fetchDocumentLibraryStorageInfo';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectDocumentLibraryFetchError,
    selectDocumentLibraryIsFetching,
    selectDocumentLibraryStorageInformation,
} from 'selectors/documentLibrary';

const useDocumentLibraryStorageInformation = items => {
    const dispatch = useDispatch();

    const storageInformation = useSelector(selectDocumentLibraryStorageInformation);
    const {
        totalStorageRemaining,
        totalStorageSizeForDownSync,
        totalStorageUsed,
    } = storageInformation;
    const isFetching = useSelector(selectDocumentLibraryIsFetching);
    const fetchError = useSelector(selectDocumentLibraryFetchError);

    useEffect(() => {
        dispatch(fetchDocumentLibraryStorageInfo());
    }, [dispatch]);

    const folderSize = items?.reduce((acc, { contentLength }) => acc + contentLength, 0);
    return {
        isFetching,
        fetchError,
        totalStorageRemaining,
        totalStorageSizeForDownSync,
        totalStorageUsed,
        folderSize,
    };
};

export default useDocumentLibraryStorageInformation;
