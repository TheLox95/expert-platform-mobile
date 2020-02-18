import React from 'react';
// @ts-ignore
import GallerySwiper from "react-native-gallery-swiper";
import { Photo } from 'src/models';
import { useNavigationParam } from 'react-navigation-hooks';

const ImageGallery: React.FunctionComponent = () => {
    const photos: Photo[] = useNavigationParam('photos');

    return (
        <GallerySwiper images={photos.map(p => ({ url: `http://localhost:1337/${p.url}`}) )} />
    );
}

export default ImageGallery;