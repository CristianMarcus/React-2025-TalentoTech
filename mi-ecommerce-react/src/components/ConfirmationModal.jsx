
import { motion, AnimatePresence } from 'framer-motion';



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
            role="dialog"                 
            aria-modal="true"            
            aria-labelledby={modalTitleId} 
            aria-describedby={modalDescriptionId} 
          >
            <div className="modal-header d-block border-0 pb-0">
             
              <h5 className="modal-title fw-bold text-dark mb-0" id={modalTitleId}>Confirmar Eliminación</h5>
              
              <button type="button" className="btn-close d-none" aria-label="Cerrar ventana de confirmación" onClick={onClose}></button>
            </div>
            <div className="modal-body py-4">
             
              <p className="text-secondary" id={modalDescriptionId}>{message}</p>
            </div>
            <div className="modal-footer d-flex justify-content-center border-0 pt-0">
              <button
                onClick={onConfirm}
                className="btn btn-danger me-2 shadow-sm"
                aria-label="Confirmar eliminación"
              >
                Eliminar
              </button>
              <button
                onClick={onClose}
                className="btn btn-secondary ms-2 shadow-sm"
                aria-label="Cancelar eliminación" 
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