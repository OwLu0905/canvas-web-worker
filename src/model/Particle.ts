"use strict";
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  constructor(mouse: Record<"x" | "y", number | undefined>) {
    this.x = mouse.x ?? 0;
    this.y = mouse.y ?? 0;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Particle;
