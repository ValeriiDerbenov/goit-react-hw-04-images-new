import { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPhoto, onFetchError } from './api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export const paramsForNotify = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '24px',
};
const perPage = 12;

export const App = () => {

  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  useEffect(() => {
    if(!search) return;

    const loadImages = async () => {
      setLoading(true);
      try {
        const response = await fetchPhoto(search, page)
        
          const { totalHits, hits } = response;
          const totalPage = Math.ceil(totalHits / perPage);
          if (totalHits === 0) {
            return Notify.info(
              'There are no images matching your search query. Please try again',
              paramsForNotify
            );}

            const arrPhotos = hits.map(({ id, webformatURL, largeImageURL, tags }) => (
              { id, webformatURL, largeImageURL, tags }
            ));
  
          setPhotos(prevState=> [...prevState, ...arrPhotos]); 
  
          if (totalPage > page) {
            setBtnLoadMore(true);
          } else {
            Notify.info(
              "You've reached the end of search results",
              paramsForNotify
            );
            setBtnLoadMore(false);
          }}
      
      catch(error) {
        onFetchError(error)
      }
      finally {
        setLoading(false);
      };  
    };
    
      loadImages();
      setBtnLoadMore(false);
  }, [search, page]);

  const loadMorePhoto = () => {
    setPage(page + 1);
    setLoading(true)  
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }
  
  const onOpenModal = (largeImageURL) => {   
    console.log(largeImageURL);  
    setShowModal(true);
    setSelectedPhoto({largeImageURL});
  };

  const handleSubmit = (searchValue) => {
  setSearch(searchValue)
  setPage(1)
  setPhotos([]);
};

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}      
      <div className={css.container}>
      { photos && <ImageGallery photos={photos} openModal={onOpenModal}/>}
      
      {photos.length !== 0 && btnLoadMore && (
        <Button onClickRender={loadMorePhoto} />
      )}
      {showModal && <Modal selectedPhoto={selectedPhoto} onClose={toggleModal}>
          </Modal>}
      </div>
    </div>
  );
}
