import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { NativeTypes } from 'react-dnd-html5-backend';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { UPLOAD_LIBRARY_DOCUMENT } from 'constants/shared/modalTypes';

const useOpenCreateDocumentModal = () => {
    const dispatch = useDispatch();
    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: [NativeTypes.FILE],
        drop: handleDrop,
        collect: handleCollect,
    });

    function handleDrop(_, monitor) {
        if (monitor) {
            const initialFiles = [...monitor.getItem().files];
            showCreateModal(initialFiles);
        }
    }

    function handleCollect(monitor) {
        return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        };
    }

    function showCreateModal(initialFiles = []) {
        dispatch(showModal(UPLOAD_LIBRARY_DOCUMENT, { initialFiles }));
    }

    return {
        canDrop,
        isOver,
        dropRef,
        showCreateModal,
    };
};

export default useOpenCreateDocumentModal;
