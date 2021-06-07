<template>
  <div @click="toggle($event)">
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

const APP_WIDTH = 1280; 
const APP_HEIGHT = 1280;
const TILE_HEIGHT = 10; 
const TILE_WIDTH = 10;
const COLS = APP_WIDTH / TILE_WIDTH;
const ROWS = APP_HEIGHT / TILE_HEIGHT;

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
            grid: [],
            appContainer: null,
            seatContainer: null,
            selectedSeatSprites: [],
            selectedSeatVertices: []
        }
    },
    methods: {
        setSeatInGrid(x,y){
            let copyGrid = [...this.grid]
            copyGrid[x][y] = copyGrid[x][y] ? 0 : 1;
            return this.grid = Object.freeze(copyGrid);
        },
        drawSeat(x,y){
            const greenSeat = PIXI.Sprite.from(this.drawSquareTexture(colors.green));
            greenSeat.x = x;
            greenSeat.y = y;
            return greenSeat;
        },
        vertexIsSelected(x1, y1){
            return this.selectedSeatVertices.reduce((acc, cv) => {
                let [x2, y2] = cv;
                if(x1 == x2 && y1 == y2) acc = cv
                return acc
            }, null)
        },
        toggle(e){

            const { pageX, pageY } = e;
            let floor = (n) => Math.floor(n / 10);             
            let floorToTen = (n) => Math.floor(n / 10) * 10;

            let x = floor(pageX);
            let y = floor(pageY);
            let xTen = floorToTen(pageX);
            let yTen = floorToTen(pageY);

            let seat = this.drawSeat(xTen, yTen);            

            if(this.vertexIsSelected(x,y)) {
                //Toggle Seat in Grid
                this.setSeatInGrid(x,y)
                
                // Delete Sprite from Container
                let spriteElement = this.selectedSeatSprites.find(s => s.x === xTen && s.y === yTen)
                this.seatContainer.removeChild(spriteElement);  

                // Delete Sprite from selected sprites
                let spriteIndex = this.selectedSeatSprites.findIndex(s => s.x === xTen && s.y === yTen);
                this.$delete(this.selectedSeatSprites, spriteIndex);

                // Delete Vertex from selected
                let vertexIndex = this.selectedSeatVertices.findIndex(v => v[0] === x && v[1] === y);
                this.$delete(this.selectedSeatVertices, vertexIndex);

            } else {
                this.setSeatInGrid(x, y)
                this.selectedSeatVertices.push([x, y])
                this.selectedSeatSprites.push(seat)
                this.seatContainer.addChild(seat);
            }           
        },
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
    created(){
        let x = new Array(COLS);
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(ROWS).fill(0);
        }
        this.grid = Object.freeze(x)
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
        this.app.stage.addChild(this.seatContainer);
        
    },
}
</script>

