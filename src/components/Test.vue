<template>
  <div @click="togglePos($event)">
    <canvas ref="renderCanvas"></canvas>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js';
export default {
    name: "test",
    data() {
        return {
            pos: [],
            app: null,
            container: null,
            selectedSeats: []
        }
    },
    methods: {
        togglePos(e){
            const { pageX, pageY } = e;
            let mF = (n) => Math.floor(n / 10);
            
            let x = mF(pageX)
            let y = mF(pageY)

            let copyPos = [...this.pos]

            copyPos[x][y] = copyPos[x][y] ? 0 : 1;

            return this.pos = Object.freeze(copyPos);
        },
        getSeat(seat) {
            let [x1, y1] = seat;
            return this.selectedSeats.reduce((acc, cv) => {
                let [x2, y2] = cv;
                if(x1 == x2 && y1 == y2) acc = cv
                return acc
            }, null)
        },
        updateSelectedSeats(seat){
            let [x1, y1] = seat;        
            
            if(this.getSeat(seat)){
              return this.selectedSeats = this.selectedSeats.reduce((acc, cv) => {
                let [x2, y2] = cv;
                 if (x1 == x2 && y1 == y2){
                     // 
                } else {
                    acc.push(cv)
                }   
                return acc
                }, [])  
            } else {
                return this.selectedSeats.push(seat)
            }
        },

        drawGrid() {

        // refactor to sideLength
        
        const height = 10;
        const width = 10;
        // const rows = 32;
        // const cols = 32;
        // const total = rows * cols;
        // let i = 0;

        const makeSquare = (w,h) => {
            let graphics = new PIXI.Graphics();
            graphics.lineStyle({
                width: 1,
                color: 0x79848d,
                alignment: 0, 
            });
            graphics.beginFill(0xf0f3f9, 1);
            graphics.drawRect(0,0,w,h);
            graphics.endFill();
            return graphics;
        }

        const texture = this.app.renderer.generateTexture(makeSquare(width, height));

        const tilingSprite = new PIXI.TilingSprite(
            texture,
            this.app.screen.width,
            this.app.screen.height,
        );

        this.app.stage.addChild(tilingSprite);




                // while(i<total)  {
                //     let graphics = new PIXI.Graphics();

                //     // ((Math.floor(i/256)) * 8) + 32
                //     // (Math.floor(i/rows) * height) + margin
                    
                //     let posX = Math.floor(i/rows) * height;
                //     let posY = (i % rows) * width;                              
                    
                //     graphics.lineStyle(1, 0x79848d, 1);
                    
                //     // if target && posX and posY == posX, posY then color 
                //     if(this.getSeat([ posX, posY ])){
                //         graphics.beginFill(0x00d3a0, 1);
                //     } else {
                //         graphics.beginFill(0xf0f3f9, 1); 
                //     }
                    
                //     // x y w h r
                //     graphics.drawRoundedRect(posX, posY, width, height, 2);
                //     graphics.endFill();

                //     const texture = this.app.renderer.generateTexture(graphics);
                //     const sprite = new PIXI.Sprite(texture);

                //     sprite.x = posX;
                //     sprite.y = posY;
                    
                //     sprite.interactive = true;
                //     sprite.buttonMode = true;
        
                //     sprite.on('pointerdown', () => {
                //         this.$emit('selection', [ posX, posY ])
                //     });

                //     //graphics.clear();

                //     this.app.stage.addChild(sprite);
                
                //     i++;
                
                // }


        }
    },
    created(){
        // Init Pos
        var x = new Array(128);
        for (var i = 0; i < x.length; i++) {
            x[i] = new Array(128).fill(0);
        }
        
        this.pos = Object.freeze(x)
    },
    mounted(){
        // Determine the width and height of the renderer wrapper element.
        const renderCanvas = this.$refs.renderCanvas;        

        this.$on('selection', (seat) => {
            return this.updateSelectedSeats(seat)
        })      

        this.app = new PIXI.Application({
            view: renderCanvas,
            width: 1280, 
            height: 1280, 
            backgroundColor: 0xffffff, 
            resolution: 1,
        });

        this.container = new PIXI.Container();
        this.container.x = 0;
        this.container.y = 0;
        
        this.app.stage.addChild(this.container);

        this.drawGrid();

    },
    watch: {
        selectedSeats: {
            handler: function() {
                this.drawGrid();
            }
        }
    }
     
}
</script>

