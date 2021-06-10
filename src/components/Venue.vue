<template>
    <div>
        <canvas ref="renderCanvas"></canvas>
    </div>
</template>

<script>
import * as PIXI from 'pixi.js';
import CONS from '@/common/constants.js';
import vertices from '@/lib/data/vertices.js'
import sections from '@/lib/data/sections.js'
import seatMapper from '@/lib/seatMapper.js'

export default {
    name: "Venue",
    data() {
        return {
            app: null,
            map: null
        }
    },
    methods: {
         drawSeat(x,y, color = CONS.COLORS.white){
            const seat = PIXI.Sprite.from(this.drawSquareTexture(color));
            seat.x = x;
            seat.y = y;
            return seat;
        },
          drawSquareTexture(color = CONS.COLORS.gray, w = CONS.TILE_WIDTH,h = CONS.TILE_HEIGHT, x = 0,y = 0){
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
        drawTilingSprite(w, h, color){
            return new PIXI.TilingSprite(
                        this.drawSquareTexture(color),
                        w,
                        h,
            );      
        },
    },
    created () {
        this.map = seatMapper(sections['main-hall'], vertices.square);
    },
    mounted() {
        //let that = this;
        const renderCanvas = this.$refs.renderCanvas;
        
        this.app = new PIXI.Application({
            view: renderCanvas,
            width: CONS.APP_WIDTH, 
            height: CONS.APP_HEIGHT, 
            backgroundColor: 0xFFFFFF, 
            resolution: 1,
        });

        this.appContainer = new PIXI.Container();
        this.appContainer.x = 0;
        this.appContainer.y = 0;
        this.appContainer.addChild(this.drawTilingSprite(this.app.screen.width, this.app.screen.height, CONS.COLORS.white));
        this.app.stage.addChild(this.appContainer);

        /*
        const drawSection = function(x, y){
            const sectionContainer = new PIXI.Container();
            sectionContainer.addChild(that.drawTilingSprite(60, 30, CONS.COLORS.gray));
            sectionContainer.x = x;
            sectionContainer.y = y;
            sectionContainer.z = 1;    
            let edges = [[0,0], [5,0]];
            const seatContainer = new PIXI.Container();
            seatContainer.x = 0;
            seatContainer.y = 0;
            seatContainer.z = 2;   
            sectionContainer.addChild(seatContainer);
            edges.forEach(e => {
                seatContainer.addChild(that.drawSeat(e[0] * 10, e[1] * 10));
            })
            seatContainer.cacheAsBitmap = true;
            return sectionContainer
        } */

        //this.app.stage.addChild(drawSection(100, 100));

    }        
}
</script>
