import { usePrevious } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';
import switchDocumentLibraryPage from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPage';
import switchDocumentLibraryPageSize from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPageSize';
import { convertArrToObj } from 'helpers/generic';

const useLibraryDocuments = s3Key => {
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([]);
    const {
        documentLibrary,
        isFetching,
        fetchError,
        isPosting,
        postSuccess,
        isDeleting,
        deleteSuccess,
        libraryPage: currentPage,
        libraryPageSize: limit,
    } = useSelector(mapStateToProps);

    // const documentLibrary = dummyData;

    const prevProps = usePrevious({
        s3Key,
        currentPage,
        postSuccess,
        isPosting,
        isDeleting,
        deleteSuccess,
    });

    useEffect(() => {
        dispatch(searchAllLibraryDocuments(currentPage, limit, s3Key));
    }, []);

    useEffect(() => {
        console.log({ currentPage, prevPage: prevProps.currentPage });
        if (currentPage !== prevProps.currentPage) {
            dispatch(searchAllLibraryDocuments(currentPage, limit, s3Key));
        }
    }, [dispatch, s3Key, currentPage]);

    const setCurrentPage = page => {
        dispatch(switchDocumentLibraryPage(page));
    };

    const setPageSize = limit => {
        dispatch(switchDocumentLibraryPageSize(limit));
    };

    const toggleItemSelect = id => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(i => i !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const folders = Object.values(documentLibrary).filter(d => !d.fileExtension);
    const files = Object.values(documentLibrary).filter(d => d.fileExtension);

    return {
        documentLibrary: convertArrToObj([...folders, ...files]),
        isFetching,
        fetchError,
        currentPage,
        setCurrentPage,
        prevProps,
        setPageSize,
        limit,
        selectedItems,
        toggleItemSelect,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: {
            documentLibrary,
            isFetching,
            fetchError,
            isPosting,
            postSuccess,
            deleteSuccess,
            isDeleting,
            libraryPage,
            libraryPageSize,
        },
    },
}) => ({
    documentLibrary,
    isFetching,
    fetchError,
    isPosting,
    postSuccess,
    isDeleting,
    deleteSuccess,
    libraryPage,
    libraryPageSize,
});

export default useLibraryDocuments;

export const dummyData = {
    1: {
        id: 1,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy Folder 1',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    2: {
        id: 2,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy Folder 2',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    3: {
        id: 3,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy File 1',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        s3Key: '',
        contentLength: 1000000000,
        MIMEType: 'application/pdf',
        fileExtension: 'pdf',
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
    4: {
        id: 4,
        companyID: 51,
        documentLibraryFolderID: null,
        name: 'Dummy File 2',
        uploadedBy: 8572,
        uploadDate: new Date().toISOString(),
        s3Key: '',
        contentLength: 1000000000,
        MIMEType: 'application/pdf',
        fileExtension: 'pdf',
        isViewApp: true,
        isAttachPins: true,
        isSoftDeleted: false,
        softDeletedByCompanyUserID: null,
        softDeletedOn: null,
        isHardDeleted: false,
        hardDeletedByCompanyUserID: null,
        hardDeletedOn: null,
    },
};
