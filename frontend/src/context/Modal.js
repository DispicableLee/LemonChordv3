import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <span className="close-button" onClick={onClose}>
          &times;
        </span> */}
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Make sure you have a div with this ID in your HTML file
  );
};

export default Modal;