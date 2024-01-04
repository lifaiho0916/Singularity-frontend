// src/components/DraggableModal.tsx

import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { DraggableModalProps } from './DraggableModal.types';


const DraggableModal: React.FC<DraggableModalProps> = ({ isOpen, onRequestClose, children }) => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const offsetX = e.clientX - position.left;
    const offsetY = e.clientY - position.top;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          top: e.clientY - offsetY,
          left: e.clientX - offsetX,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Disable this to prevent a11y warning
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          top: `${position.top}px`,
          left: `${position.left}px`,
          right: 'auto',
          bottom: 'auto',
          transform: 'none',
        },
      }}
    >
      <div
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    </ReactModal>
  );
};

export default DraggableModal;
