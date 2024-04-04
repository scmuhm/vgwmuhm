const fonts = {
  weightBold: 700,
  weightMedium: 500,
  weightNormal: 400,
  s: '12px',
  m: '12.7px',
  l: '16px',
  xl: '20px',
  xxl: '40px',
  regular: 'Montserrat-Regular',
};
const cache: Record<string, number> = {};

const getCacheKey = (fontWeight: number, fontSize: string, fontFace: string) =>
  `${fontWeight}${fontSize}${fontFace}`;

export const calculateLetterWidth = (length: number, fontSize = fonts.m) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const fontWeight = fonts.weightNormal;
  const fontFace = fonts.regular;

  const cacheKey = getCacheKey(fontWeight, fontSize, fontFace);
  const cached = cache[cacheKey];
  if (cached) {
    return cached * length;
  }

  let width = 8.0; // fallback value
  if (context) {
    context.font = `normal normal ${fontWeight} ${fontSize} ${fontFace}`;
    const textMetrics = context.measureText('W');
    width = textMetrics.width;
  }

  cache[cacheKey] = width;
  return cache[cacheKey] * length;
};

export const calculateWidthInPixel = (length: number, fontSize?: string) =>
  Math.floor(calculateLetterWidth(length, fontSize));
