import { usePrevious } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';
import { convertArrToObj } from 'helpers/generic';
import { useDebounce } from 'helpers/hooks';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';

const useLibraryDocuments = prefix => {
    console.log('useLibraryDocuments');
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
        libraryView,
        libraryFilter,
        librarySearchTerm,
    } = useSelector(mapStateToProps);

    const prevProps = usePrevious({
        prefix,
        postSuccess,
        isPosting,
        isDeleting,
        deleteSuccess,
        libraryView,
        libraryFilter,
        librarySearchTerm,
    });

    const searchAction = () => {
        dispatch(
            searchAllLibraryDocuments(
                prefix ? `${prefix}/${librarySearchTerm}` : librarySearchTerm,
                libraryFilter === 'isArchived' ? true : false,
            ),
        );
        setSelectedItems([]);
    };

    useDebounce(searchAction, [], 100); // Fetch on mount, regardless

    useEffect(() => {
        if (libraryFilter !== prevProps.libraryFilter || libraryView !== prevProps.libraryView) {
            searchAction();
        }
    }, [dispatch, prefix, libraryFilter, libraryView, prevProps]); // Fetch on changes to page, filter & view

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

        const folders = filteredLibrary.filter(item => item.type === DOCUMENT_LIBRARY_TYPES.FOLDER);
        const files = filteredLibrary.filter(item => item.type === DOCUMENT_LIBRARY_TYPES.FILE);

        return [...folders, ...files];
    };

    return {
        documentLibrary: filterDocuments(),
        isFetching,
        fetchError,
        prevProps,
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
    libraryView,
    libraryFilter,
    librarySearchTerm,
});

export default useLibraryDocuments;
