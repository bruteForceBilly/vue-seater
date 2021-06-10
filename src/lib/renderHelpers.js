import * as PIXI from 'pixi.js';
import CONS from '../common/constants.js'


const drawSquareTexture = (color = CONS.COLORS.gray, w = CONS.TILE_WIDTH,h = CONS.TILE_HEIGHT, x = 0,y = 0) => {
    let graphics = new PIXI.Graphics();
    
    graphics.lineStyle({
        width: 1,
        color: color.line,
        alignment: 0, 
    });
    graphics.beginFill(color.fill, 1);
    graphics.drawRect(x,y,w,h);
    graphics.endFill();

    let renderer = PIXI.autoDetectRenderer();

    return renderer.generateTexture(graphics);
}

const drawSeat = (x,y, color = CONS.COLORS.white) => {
    const seat = PIXI.Sprite.from(drawSquareTexture(color));
    seat.x = x;
    seat.y = y;
    return seat;
}

const drawTilingSprite = (w, h, color) => {
    return new PIXI.TilingSprite(
        drawSquareTexture(color),
        w,
        h,
    );      
}


export {drawSeat, drawSquareTexture, drawTilingSprite};