<template>
  <div>
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

const APP_WIDTH = 1280; 
const APP_HEIGHT = 1280;
const TILE_HEIGHT = 10; 
const TILE_WIDTH = 10;

const colors = {
    "gray": {
        "fill": 0xf0f3f9,
        "line": 0x79848d
    },
    "green": {
        "fill": 0X00d3a0,
        "line": 0x00A37A
    }
}

export default {
    name: "TileMap",
    data() {
        return {
            app: null,
            appContainer: null,
            seatContainer: null,
        }
    },
    methods: {
        drawSquareTexture(color = colors.gray, w = TILE_WIDTH,h = TILE_HEIGHT, x = 0,y = 0){
            let graphics = new PIXI.Graphics();
            graphics.lineStyle({
                width: 1,
                color: color.line,
                alignment: 0, 
            });
            graphics.beginFill(color.fill, 1);
            graphics.drawRect(x,y,w,h);
            graphics.endFill();
            return this.app.renderer.generateTexture(graphics);;
        },
        drawTilingSprite(){
            return new PIXI.TilingSprite(
                        this.drawSquareTexture(colors.gray),
                        this.app.screen.width,
                        this.app.screen.height,
            );      
        },
    },
    mounted(){
        const renderCanvas = this.$refs.renderCanvas;

        this.app = new PIXI.Application({
            view: renderCanvas,
            width: APP_WIDTH, 
            height: APP_HEIGHT, 
            backgroundColor: 0xffffff, 
            resolution: 1,
        });

        this.appContainer = new PIXI.Container();
        this.appContainer.x = 0;
        this.appContainer.y = 0;
        this.appContainer.addChild(this.drawTilingSprite());
        this.app.stage.addChild(this.appContainer);


        // add some green tiles to that layer            

              // create a layer for green tiles

        this.seatContainer = new PIXI.Container();
        this.seatContainer.x = 0;
        this.seatContainer.y = 0;
        this.seatContainer.z = 1;

        let greenSeat = PIXI.Sprite.from(this.drawSquareTexture(colors.green));

        greenSeat.x = 100;
        greenSeat.y = 100;

        this.seatContainer.addChild(greenSeat);

        this.app.stage.addChild(this.seatContainer);
        
    },
}
</script>

