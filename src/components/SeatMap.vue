<script>
import * as PIXI from 'pixi.js';

let app = new PIXI.Application({width: 256, height: 256});

console.log("app", app.view)


export default {
  name: 'seatMap',
  render: function (createElement) {
        return createElement(app.view)
    }
};
</script>





