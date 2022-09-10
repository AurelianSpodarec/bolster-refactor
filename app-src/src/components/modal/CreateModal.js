import React from 'react';
import * as ReactDOM from 'react-dom';

import useModal from './../../../src/context/useModal';
import ModalConfirm from './variations/ModalConfirm';
import ModdalSave from './variations/ModalSave';

const doc = document.getElementById('root');

function CreateModal() {
    const modalContext = useModal();
    const modalData = modalContext.data;

    const modalOptions = {
        modalConfirm: <ModalConfirm config={modalData} />,
        modalSave: <ModdalSave config={modalData} />,
    };

    if (!doc) return <></>;
    if (!modalContext.isOpen) return <></>;
    return ReactDOM.createPortal(
        <aside role="dialog" className={`modal ${modalContext.isOpen ? 'is-open' : 'hidden'} `}>
            <div className="m-auto top-1/2 translateY-[-50%] modal__inner">
                {modalOptions[modalData.type]}
            </div>
        </aside>,
        doc,
    );
}

export default CreateModal;
