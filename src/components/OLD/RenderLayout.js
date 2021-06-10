import * as PIXI from "pixi.js";

const APP_WIDTH = 1000;
const APP_HEIGHT = 1000;
const TILE_HEIGHT = 10;
const TILE_WIDTH = 10;
const COLS = APP_WIDTH / TILE_WIDTH;
const ROWS = APP_HEIGHT / TILE_HEIGHT;

const colors = {
  gray: {
    fill: 0xf0f3f9,
    line: 0x79848d,
  },
  green: {
    fill: 0x00d3a0,
    line: 0x00a37a,
  },
  white: {
    fill: 0xffffff,
    line: 0xf0f3f9,
  },
};

const drawSeat = (x, y, color = colors.white) => {
  const seat = PIXI.Sprite.from(this.drawSquareTexture(color));
  seat.x = x;
  seat.y = y;
  return seat;
};

const drawSquareTexture = (
  color = colors.gray,
  w = TILE_WIDTH,
  h = TILE_HEIGHT,
  x = 0,
  y = 0
) => {
  let graphics = new PIXI.Graphics();

  graphics.lineStyle({
    width: 1,
    color: color.line,
    alignment: 0,
  });
  graphics.beginFill(color.fill, 1);
  graphics.drawRect(x, y, w, h);
  graphics.endFill();

  return this.app.renderer.generateTexture(graphics);
};

const drawTilingSprite = (w, h, color) => {
  return new PIXI.TilingSprite(this.drawSquareTexture(color), w, h);
};

const makeSideSection = (x, y) => {
  const sectionContainer = new PIXI.Container();
  sectionContainer.addChild(that.drawTilingSprite(200, 250, colors.gray));
  sectionContainer.x = x;
  sectionContainer.y = y;
  sectionContainer.z = 1;
  let edges = [
    [19, 0],
    [0, 0],
    [19, 24],
    [0, 24],
    [18, 24],
    [1, 24],
    [18, 0],
    [1, 0],
  ];
  const seatContainer = new PIXI.Container();
  seatContainer.x = 0;
  seatContainer.y = 0;
  seatContainer.z = 2;
  sectionContainer.addChild(seatContainer);
  edges.forEach((e) => {
    seatContainer.addChild(that.drawSeat(e[0] * 10, e[1] * 10));
  });
  seatContainer.cacheAsBitmap = true;
  return sectionContainer;
};
