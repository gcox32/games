import type { PathPoint } from '../maps/types';
import { EnemyInstanceConfig, EnemyType } from './types';

export class Enemy implements EnemyInstanceConfig {
  id!: string;
  health!: number;
  type!: EnemyType;
  typeTwo?: EnemyType;
  imageRef?: string;
  speed!: number;
  width!: number;
  height!: number;
  color!: string;
  frameCount!: number;
  frameRate!: number;

  x: number;
  y: number;
  path: PathPoint[];
  pathIndex: number;
  maxHealth: number;

  private frameIndex: number = 0;
  private frameTimer: number = 0;
  private imgA: HTMLImageElement;
  private imgB: HTMLImageElement;

  constructor(config: EnemyInstanceConfig, path: PathPoint[]) {
    Object.assign(this, config);
    this.maxHealth = config.health;
    this.path = path;
    this.pathIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;
    this.frameIndex = 0;
    this.frameTimer = 0;

    // Preload both images
    this.imgA = new window.Image();
    this.imgB = new window.Image();
    if (this.imageRef) {
      this.imgA.src = this.imageRef;
      // Swap .png/.gif/.jpg with -b.png/-b.gif/-b.jpg
      const extMatch = this.imageRef.match(/\.(png|gif|jpg|jpeg)$/);
      if (extMatch) {
        this.imgB.src = this.imageRef.replace(
          new RegExp(`\\.${extMatch[1]}$`),
          `-b.${extMatch[1]}`
        );
      } else {
        this.imgB.src = this.imageRef + '-b';
      }
    }
  }

  update(dt: number): boolean {
    const nextPoint = this.path[this.pathIndex + 1];
    if (!nextPoint) return true;

    const dx = nextPoint.x - this.x;
    const dy = nextPoint.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 1) {
      this.pathIndex++;
    } else {
      const dirX = dx / dist;
      const dirY = dy / dist;
      this.x += dirX * this.speed * dt;
      this.y += dirY * this.speed * dt;
    }

    // Animation update (just alternate between A and B)
    this.frameTimer += dt;
    if (this.frameTimer >= 1 / this.frameRate) {
      this.frameIndex = (this.frameIndex + 1) % 2;
      this.frameTimer = 0;
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.imageRef && this.imgA.complete && this.imgB.complete) {
      const img = this.frameIndex % 2 === 0 ? this.imgA : this.imgB;
      ctx.save();
      ctx.drawImage(
        img,
        this.x - this.width / 2, this.y - this.height / 2, this.width, this.height
      );
      ctx.restore();
    } else {
      // Fallback: draw a colored rectangle
      ctx.fillStyle = this.color;
      ctx.fillRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
    }

    // Health bar
    const barWidth = this.width;
    const barHeight = 4;
    const healthRatio = this.health / this.maxHealth;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 8, barWidth, barHeight);
    ctx.fillStyle = 'lime';
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2 - 8, barWidth * healthRatio, barHeight);
  }
}