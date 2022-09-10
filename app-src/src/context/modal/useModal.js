import React, { createContext, useContext } from 'react';
import { ModalContext } from './modalContext';

function useModal() {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

export default useModal;
