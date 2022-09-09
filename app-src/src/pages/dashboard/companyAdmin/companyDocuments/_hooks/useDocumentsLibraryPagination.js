import { useDispatch, useSelector } from 'react-redux';
import switchDocumentLibraryPage from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPage';
import switchDocumentLibraryPageSize from 'actions/companyAdmin/documentLibrary/sync/switchDocumentLibraryPageSize';

const useDocumentLibraryPagination = () => {
    const dispatch = useDispatch();
    const { libraryPage: currentPage, libraryPageSize: limit } = useSelector(mapStateToProps);

    const setCurrentPage = page => {
        dispatch(switchDocumentLibraryPage(page));
    };

    const setPageSize = limit => {
        dispatch(switchDocumentLibraryPageSize(limit));
    };

    return {
        currentPage,
        setCurrentPage,
        setPageSize,
        limit,
    };
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { libraryPage, libraryPageSize },
    },
}) => ({
    libraryPage,
    libraryPageSize,
});

export default useDocumentLibraryPagination;
