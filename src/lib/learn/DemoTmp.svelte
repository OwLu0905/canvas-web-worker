<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const canvas = document.getElementById(
      "exercise-canvas"
    ) as HTMLCanvasElement;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    window.addEventListener("resize", function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const mouse: Record<"x" | "y", undefined | number> = {
      x: undefined,
      y: undefined,
    };

    window.addEventListener("click", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle();
    });

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle();
    });

    function drawCircle() {
      if (!ctx) return;
      if (!mouse.x || !mouse.y) return;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    function animate() {
      // TODO: clear canvas
      // ctx?.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle();
      requestAnimationFrame(animate);
    }
    animate();
  });
</script>

<canvas id="exercise-canvas" />

<style>
  #exercise-canvas {
    position: absolute;
    background: black;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
