import React, { createContext, useState } from 'react';
import useForm from 'hooks/useForm';

export const ModalContext = createContext(undefined);

function ModalProvider({ children }) {
    // @ts-ignore
    const formState = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
        id: undefined,
        type: 'createProperty',
        option: undefined,
        action: undefined,
        title: undefined,
        description: undefined,
        onAction: undefined,
        fields: [],
    });

    function setModalOpen() {
        setIsOpen(true);
    }

    function setModalClose() {
        setIsOpen(false);
    }

    function onValueChange(e) {
        formState.handleChange(e);
    }

    const readValues = {
        data: config,
        isOpen,
        setConfig,
        close: setModalClose,
        open: setModalOpen,
        onValueChange,
        formState,
    };

    return (
        // @ts-ignore
        <ModalContext.Provider value={readValues}>{children}</ModalContext.Provider>
    );
}

export default ModalProvider;
