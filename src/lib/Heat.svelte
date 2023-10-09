<script lang="ts">
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

<canvas id="heatmapCanvas" width="200" height="200" />
<label>
  <input type="number" bind:value={time} min="0.01" max="0.5" step="0.01" />
  <input type="range" bind:value={time} min="0.01" max="0.5" step="0.01" />
</label>

<style>
  #heatmapCanvas {
    background-color: black;
  }
</style>
