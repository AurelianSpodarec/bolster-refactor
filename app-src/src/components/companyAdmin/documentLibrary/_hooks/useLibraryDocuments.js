import { usePrevious } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';
import { convertArrToObj } from 'helpers/generic';
import { useDebounce } from 'helpers/hooks';

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
        libraryView,
        libraryFilter,
        librarySearchTerm,
    } = useSelector(mapStateToProps);

    const prevProps = usePrevious({
        s3Key,
        currentPage,
        postSuccess,
        isPosting,
        isDeleting,
        deleteSuccess,
        libraryView,
        libraryFilter,
        librarySearchTerm,
    });

    const searchAction = () =>
        dispatch(
            searchAllLibraryDocuments(
                currentPage,
                limit,
                librarySearchTerm ? librarySearchTerm : s3Key,
                libraryFilter === 'isArchived' ? true : false,
            ),
        );

    useEffect(searchAction, []); // Fetch on mount, regardless

    useEffect(() => {
        if (
            currentPage !== prevProps.currentPage ||
            libraryFilter !== prevProps.libraryFilter ||
            libraryView !== prevProps.libraryView
        ) {
            searchAction();
        }
    }, [dispatch, s3Key, currentPage, libraryFilter, libraryView, prevProps]); // Fetch on changes to page, filter & view

    useDebounce(
        () => {
            if (librarySearchTerm !== prevProps.librarySearchTerm) searchAction();
        },
        [dispatch, librarySearchTerm, prevProps],
        500,
    ); // Fetch with debounce as user types a search query

    const toggleItemSelect = id => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(i => i !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const filterDocuments = () => {
        let filteredLibrary = Object.values(documentLibrary);
        switch (libraryFilter) {
            case null:
                break;
            case 'allFolders':
                filteredLibrary = filteredLibrary.filter(({ type }) => type === 100);
                break;
            case 'allFiles':
                filteredLibrary = filteredLibrary.filter(({ type }) => type === 200);
                break;
            case 'isViewApp':
                filteredLibrary = filteredLibrary.filter(({ isViewApp }) => !!isViewApp);
                break;
            case 'isAttachPins':
                filteredLibrary = filteredLibrary.filter(({ isAttachPins }) => !!isAttachPins);
                break;
            default:
                break;
        }

        return convertArrToObj(filteredLibrary);
    };

    return {
        documentLibrary: filterDocuments(),
        isFetching,
        fetchError,
        currentPage,
        prevProps,
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
            libraryView,
            libraryFilter,
            librarySearchTerm,
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
    libraryView,
    libraryFilter,
    librarySearchTerm,
});

export default useLibraryDocuments;
