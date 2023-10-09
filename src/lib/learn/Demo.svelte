<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    const canvas = document.getElementById("demo") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", function () {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      // drawRec(ctx);
    });

    const mouse: Record<"x" | "y", number | undefined> = {
      x: undefined,
      y: undefined,
    };

    canvas.addEventListener("click", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      drawCircle(ctx, mouse.x, mouse.y);
    });

    canvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      drawCircle(ctx, mouse.x, mouse.y);
    });

    animate(ctx, canvas.width, canvas.height, mouse);
  });

  // NOTE: function
  function drawCircle(
    ctx: CanvasRenderingContext2D | null,
    x?: number,
    y?: number
  ) {
    if (ctx) {
      // NOTE: start a new shape
      ctx.fillStyle = "white";
      // ctx.strokeStyle = "red";
      // ctx.lineWidth = 5;
      ctx.beginPath();
      if (x && y) {
        ctx.arc(x, y, 50, 0, Math.PI * 2);
      }

      // NOTE: finished
      ctx.fill();
      // ctx.stroke();
    }
  }

  function drawRec(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(10, 20, 150, 50);
    }
  }

  function animate(
    ctx: CanvasRenderingContext2D | null,
    width: number,
    height: number,
    mouse: Record<"x" | "y", number | undefined>
  ) {
    // console.log("fdefe");
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      drawCircle(ctx, mouse.x, mouse.y);
      requestAnimationFrame(function () {
        animate(ctx, width, height, mouse);
      });
    }
  }
</script>

<canvas id="demo" />

<style>
  #demo {
    position: absolute;
    background: black;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
