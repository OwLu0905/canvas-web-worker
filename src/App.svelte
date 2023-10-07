<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import { onMount } from "svelte";

  let time = 0.04;
  onMount(() => {
    const canvas = document.getElementById(
      "heatmapCanvas"
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");

    const worker = new Worker("../src/lib/heatmap-worker.ts", {
      type: "module",
    });

    worker.onmessage = (e) => {
      const heatmapData = e.data;

      // Render the heatmap on the canvas
      if (ctx) {
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        imgData.data.set(heatmapData);
        ctx.putImageData(imgData, 0, 0);
      }
      // Request the next heatmap calculation
      // time += 0.01; // Adjust the rate of change as needed
      worker.postMessage({
        width: canvas.width,
        height: canvas.height,
        time: time,
      });
    };

    // Initial heatmap request
    worker.postMessage({ width: canvas.width, height: canvas.height });
  });
</script>

<main>
  <h1>Draw Map</h1>

  <div class="card">
    <Counter />
  </div>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
  <canvas id="heatmapCanvas" width="400" height="400" />
  <label>
    <input type="number" bind:value={time} min="0.01" max="0.5" step="0.01" />
    <input type="range" bind:value={time} min="0.01" max="0.5" step="0.01" />
  </label>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
  canvas {
    display: block;
    height: fit-content;
    object-fit: scale-down;
  }
</style>
