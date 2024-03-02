import React from 'react';
import Generator from '@/components/Genarator'

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 z-10 overflow-y-auto">
        <div className="modal-content">
            <Generator  onClose= {onClose}/>
        </div>
    </div>
  );
};

export default Modal;
