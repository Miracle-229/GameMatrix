import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

interface Props {
  data: {
    image: string;
  }[];
}

const GameScreenshots = ({ data }: Props) => {
  const images = data.map((item) => ({
    original: item.image,
    thumbnail: item.image,
  }));
  return (
    <>
      <ImageGallery
        items={images}
        autoPlay={true}
        showPlayButton={true}
        showFullscreenButton={true}
        slideInterval={5000}
        slideOnThumbnailOver={true}
        showIndex={true}
      />
    </>
  );
};

export default GameScreenshots;
