import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    // Native modal dialogs provide focus management and Escape-key handling.
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
}

export default Modal;
