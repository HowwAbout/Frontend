import React, { useEffect } from "react";
import "./EditPlanModal.css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.getElementById("editplan_modal-content");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="editplan_modal-overlay">
      <div className="editplan_modal-content" id="editplan_modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
