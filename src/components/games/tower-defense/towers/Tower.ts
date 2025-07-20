import type { TowerConfig } from './types';
import { Enemy } from '../enemies/Enemy';
import { Projectile } from './projectiles/Projectile';

export class Tower {
  id: string;
  x: number;
  y: number;

  range: number;
  damage: number;
  fireRate: number;
  radius: number;
  color: string;
  archetype: string;

  fireCooldown: number;

  constructor(config: TowerConfig, x: number, y: number) {
    this.id = config.id;
    this.x = x;
    this.y = y;

    this.range = config.range;
    this.damage = config.damage;
    this.fireRate = config.fireRate;
    this.radius = config.radius;
    this.color = config.color;
    this.archetype = config.archetype;

    this.fireCooldown = 0;
  }

  update(dt: number, enemies: Enemy[]): Projectile | null {
    this.fireCooldown -= dt;
    if (this.fireCooldown < 0) this.fireCooldown = 0;

    if (this.fireCooldown === 0) {
      const target = this.acquireTarget(enemies);
      if (target) {
        this.fireCooldown = 1 / this.fireRate;

        return new Projectile(
          this.x,
          this.y,
          target,
          300, // projectile speed
          this.damage
        );
      }
    }

    return null;
  }

  private acquireTarget(enemies: Enemy[]): Enemy | null {
    for (const enemy of enemies) {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= this.range) {
        return enemy; // First in range
      }
    }
    return null;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Tower base
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    // Draw range
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
