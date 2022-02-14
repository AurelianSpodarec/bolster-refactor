import { usePrevious } from 'helpers/hooks';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchAllLibraryDocuments from 'actions/companyAdmin/documentLibrary/async/searchAllLibraryDocuments';
import { useDebounce } from 'helpers/hooks';
import { DOCUMENT_LIBRARY_TYPES } from 'constants/companyAdmin/enums';
import { isEmpty } from 'helpers/generic';

const useLibraryDocuments = prefix => {
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

    const isRoot = isEmpty(Object.values(documentLibrary).find(doc => doc.isCurrentFolder));

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

    useEffect(() => {
        searchAction();
    }, []);

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

        const folders = filteredLibrary
            .filter(item => !item.isCurrentFolder && item.type === DOCUMENT_LIBRARY_TYPES.FOLDER)
            .sort(alphabeticalSort);

        const filesByType = {};
        filteredLibrary
            .filter(item => item.type === DOCUMENT_LIBRARY_TYPES.FILE)
            .forEach(item => {
                if (!filesByType[item.mimeType]) filesByType[item.mimeType] = [];
                filesByType[item.mimeType].push(item);
            });
        const files = [].concat.apply(
            [],
            Object.values(filesByType).map(arr => arr.sort(alphabeticalSort)),
        );

        return [...folders, ...files];
    };

    return {
        documentLibrary: filterDocuments(),
        isFetching,
        fetchError,
        prevProps,
        selectedItems,
        setSelectedItems,
        toggleItemSelect,
        isRoot,
    };
};

const alphabeticalSort = (a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    return 0;
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
