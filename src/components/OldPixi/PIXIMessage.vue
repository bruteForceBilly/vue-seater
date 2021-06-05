<script>
export default {
  inject: ['EventBus', 'PIXIWrapper'],
  // x, y define the text position in the parent.
  props: ['x', 'y', 'text'],

  render(h) { return h() },

  created() {
    // get text object from oixi lib
    this.message = new this.PIXIWrapper.PIXI.Text(this.text,{fontFamily : 'Arial', fontSize: 24});

    // Set the initial position of text
    this.message.x = this.x || 0;
    this.message.y = this.y || 0;
    this.message.anchor.set(0.5);

    // Opt-in to interactivity.
    this.message.interactive = true;

    // Forward the pointerdown event.
    this.message.on('pointerdown', () => this.$emit('pointerdown', this.message));
    // When the PIXI renderer starts.
    this.EventBus.$on('ready', () => {
      // Add the sprite to the parent container or the root app stage.
      if (this.$parent.container) {
        this.$parent.container.addChild(this.message);
      } else {
        this.PIXIWrapper.PIXIApp.stage.addChild(this.message);
      }

      // Emit an event for this sprite on every tick.
      // Great way to kill performance.
      this.PIXIWrapper.PIXIApp.ticker.add(delta => this.$emit('tick', this.message, delta));
    })
  }
}
</script>