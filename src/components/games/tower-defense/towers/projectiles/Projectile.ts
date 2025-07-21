import type { Enemy } from '../../enemies/Enemy';

export class Projectile {
    x: number;
    y: number;
    radius: number = 3;
    speed: number;
    damage: number;
    target: Enemy;

    constructor(x: number, y: number, target: Enemy, speed: number, damage: number) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.speed = speed;
        this.damage = damage;
    }

    update(dt: number): boolean {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.radius + this.target.width / 2) {
            this.target.health -= this.damage;
            return true;
        }

        const dirX = dx / dist;
        const dirY = dy / dist;
        this.x += dirX * this.speed * dt;
        this.y += dirY * this.speed * dt;

        return false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }
}
