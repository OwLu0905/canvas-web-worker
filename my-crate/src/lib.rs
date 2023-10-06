extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

use std::f64;

static mut TIME: f64 = 0.0; // Static variable to store time

#[wasm_bindgen]
pub fn generate_heatmap(width: u32, height: u32) -> Vec<u8> {
    // Create a vector to store heatmap data (e.g., grayscale values)
    let mut heatmap_data = vec![0u8; (width * height) as usize];

    // Generate random heatmap data for demonstration
    // for pixel in &mut heatmap_data {
    //     *pixel = rand::random();
    // }
    //
    unsafe {
        TIME += 1.0; // Adjust the rate of change as needed
    }

    for y in 0..height {
        for x in 0..width {
            let value = ((x as f64 / width as f64) * f64::consts::PI * 2.0).sin() * 128.0 + 128.0;

            // Add a time-dependent offset to the sine wave
            let offset =
                ((y as f64 / height as f64) * f64::consts::PI * 2.0 + unsafe { TIME }).sin() * 64.0;

            let pixel = &mut heatmap_data[(y * width + x) as usize];
            *pixel = (value + offset) as u8;
        }
    }

    heatmap_data
}
