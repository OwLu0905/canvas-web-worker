"use strict";
class Particle {
  x?: number;
  y?: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  constructor(
    mouse: Record<"x" | "y", number | undefined>,
    position: Record<"width" | "height", number>,
    hue: number
  ) {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * position.width;
    // this.y = Math.random() * position.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    if (!this.x || !this.y) return;
    // if (this.x <= 0 || this.x >= window.innerWidth) {
    //   this.speedX = -this.speedX;
    // }
    // if (this.y <= 0 || this.y >= window.innerHeight) {
    //   this.speedY = -this.speedY;
    // }
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) {
      this.size -= 0.1;
    }
  }
  draw(ctx: CanvasRenderingContext2D | null, hue: number = 0) {
    if (!ctx) return;
    if (!this.x || !this.y) return;
    ctx.fillStyle = this.color;
    // ctx.strokeStyle = "black";
    // ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
  }
}

export default Particle;
