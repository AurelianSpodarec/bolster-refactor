import { usePrevious } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/fetchAllLibraryDocuments';
import switchDocumentLibraryPage from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPage';
import switchDocumentLibraryPageSize from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPageSize';

const useFetchLibraryDocuments = prefix => {
    const dispatch = useDispatch();

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

    const prevProps = usePrevious({
        prefix,
        currentPage,
        postSuccess,
        isPosting,
        isDeleting,
        deleteSuccess,
    });

    useEffect(() => {
        if (
            currentPage !== prevProps.currentPage ||
            prefix !== prevProps.prefix ||
            (postSuccess && !prevProps.postSuccess) ||
            (deleteSuccess && !prevProps.deleteSuccess)
        )
            dispatch(fetchAllLibraryDocuments(prefix, currentPage, limit));
    }, [dispatch, prefix, currentPage]);

    const setCurrentPage = page => {
        dispatch(switchDocumentLibraryPage(page));
    };

    const setPageSize = limit => {
        dispatch(switchDocumentLibraryPageSize(limit));
    };

    return {
        documentLibrary: dummyData,
        isFetching,
        fetchError,
        currentPage,
        setCurrentPage,
        prevProps,
        setPageSize,
        limit,
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

export default useFetchLibraryDocuments;

const dummyData = {
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
