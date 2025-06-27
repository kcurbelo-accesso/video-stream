import { useEffect } from 'react';
import { useMovieCollectionData } from '../../../context/MovieCollectionContext';
import { selectContentById } from '../../../selectors/contentSelector';
import { Modal } from '../../ui/Modal';

export const TileModal = ({ contentId, onClose }: { contentId: string; onClose: () => void }) => {
  const state = useMovieCollectionData();
  const content = selectContentById(state, contentId);

  /**
   * Added this in case I needed to fetch data
   */
  //   useEffect(() => {
  //     console.log(contentId);
  //     const fetch = async () => {
  //       try {
  //         const { data } = await API.get(`https://cd-static.bamgrid.com/dp-117731241344/sets/${contentId}.json`);
  //         setData(data);
  //       } catch (err) {
  //         console.error('Failed to fetch modal content', err);
  //       }
  //     };
  //     fetch();
  //   }, [contentId]);

  useEffect(() => {
    console.log(`content from ${contentId}`, content);
  }, [contentId]);

  if (!content) return null;

  const title = content?.title ?? 'Untitled';
  const videoSrc = content?.videoArt?.[0]?.mediaMetadata?.urls[0]?.url;
  const imgSrc = content?.imageUrl;
  const tvRating = content?.ratings?.[0]?.value ?? 'Unknown Rating';

  return (
    <Modal onClose={onClose}>
      <div className="modal-content-inner">
        <div className="modal-video-wrapper">
          {/* <video controls autoPlay muted className="modal-video" src={videoSrc} /> */}
          {videoSrc ? (
            <video autoPlay muted loop playsInline className="modal-background-video" src={videoSrc} />
          ) : (
            <img className="modal-background-video" src={imgSrc} />
          )}
        </div>
        <div className="modal-details">
          <h2>{title}</h2>
          <p>More info about this title...</p>
          <p>{tvRating}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export default TileModal;
