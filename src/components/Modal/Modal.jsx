import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({selectedPhoto, onClose}) => {
  const {largeImageURL, tag} = selectedPhoto;
  console.log(selectedPhoto);

  useEffect(() => {
    const onEscapeCloseModal = (event) => {
        if (event.code === 'Escape') {
        onClose();
        }
    };
    window.addEventListener('keydown', onEscapeCloseModal);

    return () => window.removeEventListener('keydown', onEscapeCloseModal);
    }, [onClose]);
  
  const onClickOverlay = (event) => {
    if (event.target === event.currentTarget) {
        onClose()
    };
}

    return (
      <div className={css.overlay} onClick={onClickOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tag} />
        </div>
      </div>
    );
}

Modal.propTypes = {
  selectedPhoto: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

