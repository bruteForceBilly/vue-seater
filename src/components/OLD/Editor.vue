<template>
  <div @mousedown="isDragging = true" @mousemove="toggle($event)">
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';

const APP_WIDTH = 1000; 
const APP_HEIGHT = 1000;
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
    },
    "white": {
        "fill": 0xffffff,
        "line": 0xF0F3F9
    },
}

export default {
    name: "Editor",
    data() {
        return {
            isErasing: false,
            isDragging: false,
            app: null,
            grid: [],
            appContainer: null,
            sectionContainer: null,
            seatContainer: null,
            selectedSeatSprites: [],
            selectedSeatVertices: []
        }
    },
    methods: {
        getSelectedVertex(vertex) {
            let [x1, y1] = vertex;
            return this.selectedSeatVertices.reduce((acc, cv) => {
                let [x2, y2] = cv;
                if(x1 == x2 && y1 == y2) acc = cv
                return acc
            }, null)
        },  
        setSeatInGrid(x,y){
            let copyGrid = [...this.grid]
            copyGrid[x][y] = copyGrid[x][y] ? 0 : 1;
            return this.grid = Object.freeze(copyGrid);
        },
        drawSeat(x,y, color = colors.white){
            const seat = PIXI.Sprite.from(this.drawSquareTexture(color));
            seat.x = x;
            seat.y = y;
            return seat;
        },
        toggle: function(e) {
            const { pageX, pageY } = e;
            if(!this.isDragging || ( pageX < 0 || pageY < 0 )) return;            
            let floor = (n) => Math.floor(n / 10);             
            let floorToTen = (n) => Math.floor(n / 10) * 10;

            let x = floor(pageX);
            let y = floor(pageY);
            let xTen = floorToTen(pageX);
            let yTen = floorToTen(pageY);

            let seat = this.drawSeat(xTen, yTen);
            
            if(this.isErasing) {
                //eraseSeat
                
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
            } else if(!this.isErasing && !this.getSelectedVertex([x,y])) {
                // drawSeat
                this.setSeatInGrid(x, y)
                // hasVertex ?              
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
        drawTilingSprite(w, h, color){
            return new PIXI.TilingSprite(
                        this.drawSquareTexture(color),
                        w,
                        h,
            );      
        },
    },
    created(){
        let x = new Array(COLS);

        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(ROWS).fill(0);
        }
        this.grid = Object.freeze(x);

        window.addEventListener('mouseup', () => {
            return this.isDragging = false
        });

        window.addEventListener('keydown', (e) => {
            if (e.key == 'e') {
                this.isErasing = !this.isErasing;
                console.log('is erasing: ', this.isErasing)
            }
        });

    },
    mounted(){
        let that = this;
        
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
        this.appContainer.addChild(this.drawTilingSprite(this.app.screen.width, this.app.screen.height, colors.white));
        this.app.stage.addChild(this.appContainer);


        // add some green tiles to that layer            
        // create a layer for green tiles

        // [[0,0],[24,0],[0,19],[24,19]]  
        

        // Section A
        const makeSideSection = function(x, y){
            const sectionContainer = new PIXI.Container();
            sectionContainer.addChild(that.drawTilingSprite(200, 250, colors.gray));
            sectionContainer.x = x;
            sectionContainer.y = y;
            sectionContainer.z = 1;    
            let edges = [[19,0],[0,0],[19,24],[0,24],[18,24],[1,24],[18,0],[1,0]];
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
        }

        const makeMidSection = function(x, y){
            const sectionContainer = new PIXI.Container();
            sectionContainer.addChild(that.drawTilingSprite(360, 230, colors.gray));
            sectionContainer.x = x;
            sectionContainer.y = y;
            sectionContainer.z = 1;
            sectionContainer.cacheAsBitmap = true;
            return sectionContainer
        }

        //console.log("make", makeSection(100, 100))

        this.app.stage.addChild(makeSideSection(100, 100));
        this.app.stage.addChild(makeSideSection(100, 380));

        this.app.stage.addChild(makeMidSection(320, 100));
        this.app.stage.addChild(makeMidSection(320, 380));

        this.app.stage.addChild(makeSideSection(700, 100));
        this.app.stage.addChild(makeSideSection(700, 380));



        //this.app.stage.addChild();



        // this.sectionContainer = new PIXI.Container();
        // this.sectionContainer.addChild(this.drawTilingSprite(200, 250, colors.gray));
        // this.sectionContainer.x = 150;
        // this.sectionContainer.y = 100;
        // this.sectionContainer.z = 1; 

        // let edges = [[19,0],[0,0],[19,24],[0,24],[18,24],[1,24],[18,0],[1,0]]

        // this.seatContainer = new PIXI.Container();
        // this.seatContainer.x = 0;
        // this.seatContainer.y = 0;
        // this.seatContainer.z = 2;   
        // this.sectionContainer.addChild(this.seatContainer);
       
        // edges.forEach(e => {
        //     this.seatContainer.addChild(this.drawSeat(e[0] * 10, e[1] * 10));
        // })
        
        // this.seatContainer.cacheAsBitmap = true;

        
    
        // Initialize all seats as green
        // for(let i = 0; i < COLS; i++) {
        //     for (let j = 0;  j < ROWS; j++) {
        //         let floor = (n) => Math.floor(n / 10); 
        //         let x = floor(i);
        //         let y = floor(j)

        //         this.setSeatInGrid(x, y)
        //         this.selectedSeatVertices.push([x, y])

        //         let seat = this.drawSeat(i * 10, j * 10);
        //         this.selectedSeatSprites.push(seat)
        //         this.seatContainer.addChild(seat);
        //     }
        // } 

      
    },
    beforeDestroy(){
         window.removeEventListener('mouseup', () => {
            return this.isDragging = false
        });

        window.removeEventListener('keydown', (e) => {
            if (e.key == 'e') {
                this.isErasing = !this.isErasing;
                console.log('is erasing: ', this.isErasing)
                this.seatContainer.cacheAsBitmap = !this.seatContainer.cacheAsBitmap;
                console.log('seatContainer cache bitmap: ', this.seatContainer.cacheAsBitmap)
            }
        });
    },
}
</script>

