import * as PIXI from "pixi.js";
import CONS from "../common/constants.js";
import { drawTilingSprite } from "./renderHelpers.js";

const createAppContainer = (function () {
  let appContainer = new PIXI.Container();
  appContainer.x = 0;
  appContainer.y = 0;
  appContainer.addChild(
    drawTilingSprite(CONS.APP_WIDTH, CONS.APP_HEIGHT, CONS.COLORS.white)
  );
  return createAppContainer;
})();

export { createAppContainer };
