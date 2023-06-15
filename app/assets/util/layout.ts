const FIGMA_WIDTH = 375;
const FIGMA_HEIGHT = 812;

const getHeightRatio = (height: number) =>
  Math.floor((height / FIGMA_HEIGHT) * 100) + '%';

const getWidthRatio = (width: number) =>
  Math.floor((width / FIGMA_WIDTH) * 100) + '%';

export { getHeightRatio, getWidthRatio };
