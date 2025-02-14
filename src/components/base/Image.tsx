import React, { useEffect, useState } from 'react';
import { ImageProps, ImageRequireSource, Image as OriginalImage } from 'react-native';

import Images from 'assets/images';

interface TokensImageProps extends ImageProps {
    uri: string;
    defaultSource?: ImageRequireSource;
}

const Image = (props: TokensImageProps) => {
    const { uri, defaultSource = Images.TOKEN_DEFAULT } = props;

    const source = uri ? { uri } : defaultSource;

    const [sourceImg, setSourceImg] = useState(source);

    const imageProps: ImageProps = {
        ...props,
        source: sourceImg,
    };

    useEffect(() => {
        setSourceImg(source);
    }, [uri]);

    const setDefaultImage = () => setSourceImg(defaultSource);

    return (
        <OriginalImage
            {...imageProps}
            onError={setDefaultImage}
        />
    );
};

export default Image;
