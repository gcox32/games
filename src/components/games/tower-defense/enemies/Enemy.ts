import type { PathPoint } from '../maps/types';
import { EnemyInstanceConfig } from './types';

export class Enemy {
  id: string;
  health: number;
  type: string;
  typeTwo?: string;
  imageRef?: string;

  speed: number;
  radius: number;
  color: string;
  archetype: string;

  x: number;
  y: number;
  path: PathPoint[];
  pathIndex: number;
  maxHealth: number;

  constructor(config: EnemyInstanceConfig, path: PathPoint[]) {
    this.id = config.id;
    this.health = config.health;
    this.maxHealth = config.health;
    this.type = config.type;
    this.typeTwo = config.typeTwo;
    this.imageRef = config.imageRef;

    this.speed = config.speed;
    this.radius = config.radius;
    this.color = config.color;
    this.archetype = config.archetype;

    this.path = path;
    this.pathIndex = 0;
    this.x = path[0].x;
    this.y = path[0].y;
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

    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Enemy body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Health bar
    const barWidth = this.radius * 2;
    const barHeight = 4;
    const healthRatio = this.health / this.maxHealth;

    ctx.fillStyle = 'black';
    ctx.fillRect(this.x - this.radius, this.y - this.radius - 8, barWidth, barHeight);

    ctx.fillStyle = 'lime';
    ctx.fillRect(this.x - this.radius, this.y - this.radius - 8, barWidth * healthRatio, barHeight);

    // Label
    // ctx.fillStyle = 'white';
    // ctx.font = '10px sans-serif';
    // ctx.textAlign = 'center';
    // ctx.fillText(this.id, this.x, this.y + this.radius + 12);
  }
}