const FIGMA_WIDTH = 375;
const FIGMA_HEIGHT = 812;

const getHeightRatio = (height: number) =>
  Math.floor((height / 812) * FIGMA_HEIGHT) + '%';

const getWidthRatio = (width: number) =>
  Math.floor((width / FIGMA_WIDTH) * 100) + '%';

export {getHeightRatio, getWidthRatio};
