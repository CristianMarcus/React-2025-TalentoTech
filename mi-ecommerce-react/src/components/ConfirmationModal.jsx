// src/components/ConfirmationModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Puedes importar el Modal de React-Bootstrap si quieres usar su JS para control,
// pero si framer-motion ya maneja el estado, no es estrictamente necesario aquí.
// import { Modal, Button } from 'react-bootstrap'; 

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1, 
      transition: { delay: 0.1, type: "spring", stiffness: 120 } 
    },
    exit: { y: "100vh", opacity: 0 }
  };

  // IDs únicos para los atributos ARIA
  const modalTitleId = "confirmModalTitle";
  const modalDescriptionId = "confirmModalDescription";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop fade show d-flex align-items-center justify-content-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{ position: 'fixed', inset: 0, zIndex: 1050 }}
        >
          <motion.div
            className="modal-content text-center p-4 rounded shadow-lg"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ maxWidth: '400px', width: '100%' }}
            // Atributos ARIA para el Diálogo:
            role="dialog"                 // Indica que este elemento es un diálogo
            aria-modal="true"             // Informa a las tecnologías de asistencia que el contenido exterior está inactivo
            aria-labelledby={modalTitleId} // Vincula al título del diálogo
            aria-describedby={modalDescriptionId} // Vincula al texto descriptivo del diálogo
          >
            <div className="modal-header d-block border-0 pb-0">
              {/* Asegura que el título tenga el ID referenciado por aria-labelledby */}
              <h5 className="modal-title fw-bold text-dark mb-0" id={modalTitleId}>Confirmar Eliminación</h5>
              {/* Mantén btn-close por semántica, aria-label es importante si está visible */}
              <button type="button" className="btn-close d-none" aria-label="Cerrar ventana de confirmación" onClick={onClose}></button>
            </div>
            <div className="modal-body py-4">
              {/* Asegura que el párrafo del mensaje tenga el ID referenciado por aria-describedby */}
              <p className="text-secondary" id={modalDescriptionId}>{message}</p>
            </div>
            <div className="modal-footer d-flex justify-content-center border-0 pt-0">
              <button
                onClick={onConfirm}
                className="btn btn-danger me-2 shadow-sm"
                aria-label="Confirmar eliminación" // Etiqueta ARIA explícita para mayor claridad
              >
                Eliminar
              </button>
              <button
                onClick={onClose}
                className="btn btn-secondary ms-2 shadow-sm"
                aria-label="Cancelar eliminación" // Etiqueta ARIA explícita para mayor claridad
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;