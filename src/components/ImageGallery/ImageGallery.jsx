import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, openModal }) => (
  <div className={css.ImageGallery}>
    {photos.map(photo => (
        <ImageGalleryItem key={photo.id} item={photo} openModal={openModal} />        
      ))}
  </div>
);
