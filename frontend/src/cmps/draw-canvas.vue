<template>
  <div>
    <h4>Draw your word here</h4>
    <form @submit.prevent="sendDrawing">
      <canvas
        ref="draw-canvas"
        class="draw-canvas"
        width="300"
        height="400"
        @touchstart="beginDrawing"
        @touchmove="keepDrawing"
        @touchend="stopDrawing"
      ></canvas>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      can: null,
      canvas: null,
      x: 0,
      y: 0,
      isDraw: false,
      isEmpty: true,
    };
  },
  mounted() {
    this.can = this.$refs["draw-canvas"];
    this.canvas = this.can.getContext("2d");
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      if (this.isEmpty) this.isEmpty = false;
      var rect = e.target.getBoundingClientRect();
      this.x = e.touches[0].clientX - rect.left;
      this.y = e.touches[0].clientY - rect.top;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        var rect = e.target.getBoundingClientRect();
        this.drawLine(
          this.x,
          this.y,
          e.touches[0].clientX - rect.left,
          e.touches[0].clientY - rect.top
        );
        this.x = e.touches[0].clientX - rect.left;
        this.y = e.touches[0].clientY - rect.top;
      }
    },
    stopDrawing(e) {
      this.isDrawing = false;
    },
    sendDrawing() {
      if (!this.isEmpty) {
        var canvasImg = this.can.toDataURL("image/png");
        this.$emit("submit", canvasImg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.draw-canvas {
  border: 1px solid black;
}
</style>
