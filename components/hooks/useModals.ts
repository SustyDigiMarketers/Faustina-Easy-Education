import { useState } from 'react';

export const useModals = () => {
    const [isAdmissionFormOpen, setAdmissionFormOpen] = useState(false);

    const handleAdmissionClick = () => setAdmissionFormOpen(true);
    const handleCloseAdmissionForm = () => setAdmissionFormOpen(false);

    return {
        isAdmissionFormOpen,
        modalHandlers: {
            handleAdmissionClick,
            handleCloseAdmissionForm,
        }
    };
};
