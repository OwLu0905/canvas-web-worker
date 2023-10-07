import init, { generate_heatmap } from "my-crate";
// heatmap-worker.ts

self.addEventListener("message", async (e) => {
  const { width, height, time } = e.data;

  // Initialize the Rust Wasm module
  await init();

  // Generate the heatmap using Rust Wasm
  const heatmapData = generate_heatmap(width, height, time);

  // Send the heatmap data back to the main thread
  self.postMessage(heatmapData);
});
