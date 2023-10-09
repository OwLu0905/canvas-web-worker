<script lang="ts">
  import { onMount } from "svelte";
  import Particle from "../../model/Particle";

  const AMOUNT = 100;
  const particlesArray: Particle[] = [];
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
      // drawCircle(ctx, mouse.x, mouse.y);
    });

    canvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle(ctx, mouse.x, mouse.y);
    });

    function init() {
      for (let i = 0; i < AMOUNT; i++) {
        particlesArray.push(new Particle(mouse));
      }
    }
    init();
    animate(ctx, canvas.width, canvas.height, mouse);
  });

  function animate(
    ctx: CanvasRenderingContext2D | null,
    width: number,
    height: number,
    mouse: Record<"x" | "y", number | undefined>
  ) {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      handleParticles(ctx);
      requestAnimationFrame(function () {
        animate(ctx, width, height, mouse);
      });
    }
  }

  function handleParticles(ctx: CanvasRenderingContext2D | null) {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw(ctx);
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
