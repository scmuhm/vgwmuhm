import { useEffect, useState } from 'react';
import { calculateLetterWidth } from '../calculateLetterWidth';

// result of calculateWidthInPixel('Tournaments'.length)
const DEFAULT_THUMBNAIL_WIDTH = 145;

export const useThumbnailMaxWidthCalculation = (articles: string[]) => {
  const [thumbnailMaxWidth, setThumbnailMaxWidth] = useState(DEFAULT_THUMBNAIL_WIDTH);

  useEffect(() => {
    //canvas api is available only on client
    const thumbnailWidths =
      articles?.map((article) => getFirstWordLength(article)) ?? DEFAULT_THUMBNAIL_WIDTH;
    const maxThumbnailWidth = calculateLetterWidth(Math.max(...thumbnailWidths));

    setThumbnailMaxWidth(maxThumbnailWidth);
  }, []);

  return { thumbnailMaxWidth };
};

const getFirstWordLength = (text: string | undefined) =>
  typeof text === 'string' ? text.split(' ')[0].length : 0;
