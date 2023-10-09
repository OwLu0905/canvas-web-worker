<script lang="ts">
  import { onMount } from "svelte";
  import Particle from "../../model/Particle";

  const AMOUNT = 100;
  const particlesArray: Particle[] = [];
  let hue = 0;
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

      for (let j = 0; j < 3; j++) {
        particlesArray.push(
          new Particle(
            mouse,
            {
              width: canvas.width,
              height: canvas.height,
            },
            hue
          )
        );
      }
    });

    canvas.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle(ctx, mouse.x, mouse.y);

      for (let j = 0; j < 3; j++) {
        particlesArray.push(
          new Particle(
            mouse,
            {
              width: canvas.width,
              height: canvas.height,
            },
            hue
          )
        );
      }
    });

    function init() {
      for (let i = 0; i < AMOUNT; i++) {
        particlesArray.push(
          new Particle(
            mouse,
            {
              width: canvas.width,
              height: canvas.height,
            },
            hue
          )
        );
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
      // ctx.fillStyle = "rgba(0,0,0,0.02)";
      // ctx.fillRect(0, 0, width, height);
      handleParticles(ctx);
      hue += 0.5;
      if (hue > 360) {
        hue = 0;
      }
      requestAnimationFrame(function () {
        animate(ctx, width, height, mouse);
      });
    }
  }

  function handleParticles(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw(ctx, hue);
      for (let j = i; j < particlesArray.length; j++) {
        if (particlesArray[i].x && particlesArray[i].y) {
          const dx = particlesArray[i].x! - particlesArray[j].x!;
          const dy = particlesArray[i].y! - particlesArray[j].y!;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particlesArray[i].color;
            ctx.lineWidth = particlesArray[i].size * 0.2;
            ctx.moveTo(particlesArray[i].x!, particlesArray[i].y!);
            ctx.lineTo(particlesArray[j].x!, particlesArray[j].y!);
            ctx.stroke();
          }
        }
      }
      if (particlesArray[i].size <= 0.3) {
        particlesArray.splice(i, 1);
        // NOTE: due to mutate array length -> we need to adjust the index
        i--;
      }
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
