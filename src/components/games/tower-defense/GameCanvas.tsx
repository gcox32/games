'use client';

import { useRef, useEffect } from 'react';
import { Route } from './maps/types';
import { Enemy } from './enemies/Enemy';
import { spawnEnemy } from './enemies/spawnEnemy';
import { EnemyExtensions } from './enemies/extensions';
import { Tower } from './towers/Tower';
import { TowerTypes } from './towers/extensions';
import { Projectile } from './towers/projectiles/Projectile';

interface GameCanvasInterface {
    height: number,
    width: number,
    className: string,
    route: Route,
    gameState: 'idle' | 'running' | 'paused',
    setCurrentWave: (wave: number) => void,
    selectedTowerId: string
    setSelectedTowerId: (id: string) => void;
}

export default function GameCanvas({
    height,
    width,
    className,
    route,
    gameState,
    setCurrentWave,
    selectedTowerId,
    setSelectedTowerId
}: GameCanvasInterface) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gameStateRef = useRef({
        enemies: [] as Enemy[],
        towers: [] as Tower[],
        projectiles: [] as Projectile[],
        currentWaveIndex: 0,
        elapsedWaveTime: 0,
        spawnedInWave: new Set<number>()
    });
    const mouse = useRef({ x: 0, y: 0, visible: false });
    const placingTower = useRef(true);
    const selectedTower = useRef<Tower | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        // --- Fix 1: Copy mouse.current for cleanup ---
        const mouseRefForCleanup = mouse.current;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                placingTower.current = false;
                mouse.current.visible = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const handleCanvasClick = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Check if clicking on an existing tower first
            const clickedTower = gameStateRef.current.towers.find(tower => {
                const dx = tower.x - x;
                const dy = tower.y - y;
                const dist = Math.hypot(dx, dy);
                return dist <= tower.radius;
            });

            if (clickedTower) {
                selectedTower.current = clickedTower;
                return;
            } else {
                selectedTower.current = null; // click away clears selection
            }

            // If placing a tower, handle tower placement
            if (placingTower.current) {
                const config = TowerTypes[selectedTowerId];
                if (!config) return;

                const valid = isValidPlacement(x, y, config.radius);
                if (!valid) return;

                const tower = new Tower(config, x, y);
                gameStateRef.current.towers.push(tower);

                // Unselect tower
                placingTower.current = false;
                mouse.current.visible = false;
                setSelectedTowerId('');
            }
        }

        canvas.addEventListener('click', handleCanvasClick);

        function handleMouseMove(event: MouseEvent) {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            mouse.current.x = x;
            mouse.current.y = y;
            mouse.current.visible = true;
          
            // Cursor style: pointer if over a tower
            const overTower = gameStateRef.current.towers.some(tower => {
              const dx = tower.x - x;
              const dy = tower.y - y;
              const dist = Math.hypot(dx, dy);
              return dist <= tower.radius;
            });
          
            canvas.style.cursor = overTower ? 'pointer' : 'default';
        }

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', () => (mouse.current.visible = false));

        function isValidPlacement(x: number, y: number, radius: number): boolean {
            return !gameStateRef.current.towers.some(tower => {
                const dx = tower.x - x;
                const dy = tower.y - y;
                const dist = Math.hypot(dx, dy);
                return dist < tower.radius + radius + 10; // 10px buffer
            });
        }


        const loop = (now: number) => {
            const deltaTime = (now - lastTime) / 1000;
            lastTime = now;

            if (gameState === 'running') {
                update(deltaTime);
            }

            render(ctx);

            animationFrameId = requestAnimationFrame(loop);
        };

        const update = (dt: number) => {
            const currentWave = route.waves[gameStateRef.current.currentWaveIndex];
            if (currentWave) {
                gameStateRef.current.elapsedWaveTime += dt;

                currentWave.forEach((instruction, index) => {
                    if (
                        gameStateRef.current.elapsedWaveTime >= instruction.delay &&
                        !gameStateRef.current.spawnedInWave.has(index)
                    ) {
                        const enemyDef = EnemyExtensions[instruction.enemy];
                        if (!enemyDef) return;

                        const enemy = spawnEnemy(enemyDef, route.path.points);
                        gameStateRef.current.enemies.push(enemy);
                        gameStateRef.current.spawnedInWave.add(index);
                    }
                });

                // Check if the whole wave is spawned
                if (gameStateRef.current.spawnedInWave.size === currentWave.length && gameStateRef.current.enemies.length === 0) {
                    // Wave finished, go to next
                    gameStateRef.current.currentWaveIndex++;
                    setCurrentWave(gameStateRef.current.currentWaveIndex);
                    gameStateRef.current.elapsedWaveTime = 0;
                    gameStateRef.current.spawnedInWave.clear();
                }
            }

            // Move each enemy along the path
            gameStateRef.current.enemies = gameStateRef.current.enemies.filter(
                (enemy) => !enemy.update(dt)
            );

            gameStateRef.current.towers.forEach((tower) => {
                const projectile = tower.update(dt, gameStateRef.current.enemies);
                if (projectile) {
                    gameStateRef.current.projectiles.push(projectile);
                }
            });

            gameStateRef.current.projectiles = gameStateRef.current.projectiles.filter(
                (p) => !p.update(dt)
            );


            // Remove KO'd enemies
            gameStateRef.current.enemies = gameStateRef.current.enemies.filter(
                (enemy) => enemy.health > 0
            );

        };

        const render = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = route.backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw path with dirt-like appearance
            ctx.lineWidth = 32;
            ctx.strokeStyle = route.pathColor; // Saddle brown for base dirt color
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            route.path.points.forEach((pt, i) => {
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            });
            ctx.stroke();

            // Add a lighter center stripe to simulate worn path
            ctx.lineWidth = 20;
            ctx.strokeStyle = '#D2B48C'; // Tan color for worn center
            ctx.beginPath();
            route.path.points.forEach((pt, i) => {
                if (i === 0) ctx.moveTo(pt.x, pt.y);
                else ctx.lineTo(pt.x, pt.y);
            });
            ctx.stroke();

            // Draw enemies
            for (const enemy of gameStateRef.current.enemies) {
                enemy.draw(ctx);
            }

            gameStateRef.current.towers.forEach((tower) => {
                tower.draw(ctx, false);
                if (selectedTower.current === tower) {
                    ctx.beginPath();
                    ctx.arc(tower.x, tower.y, tower.radius + 4, 0, Math.PI * 2);
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                  }
            });

            if (mouse.current.visible && placingTower.current) {
                const config = TowerTypes[selectedTowerId];
                if (config) {
                    const valid = isValidPlacement(mouse.current.x, mouse.current.y, config.radius);
                    const ghostTower = new Tower(config, mouse.current.x, mouse.current.y);
                    ghostTower.draw(ctx, true);

                    // Optionally: outline in red if invalid
                    if (!valid) {
                        ctx.beginPath();
                        ctx.arc(mouse.current.x, mouse.current.y, config.radius + 2, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
            }

            gameStateRef.current.projectiles.forEach((p) => p.draw(ctx));

        };

        animationFrameId = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('click', handleCanvasClick);
            canvas.removeEventListener('mousemove', handleMouseMove);
            // Use the copied ref for cleanup
            canvas.removeEventListener('mouseleave', () => (mouseRefForCleanup.visible = false));
            window.removeEventListener('keydown', handleKeyDown);
        };

    // --- Fix 2: Add missing dependencies ---
    }, [route, gameState, selectedTowerId, setCurrentWave, setSelectedTowerId]);

    useEffect(() => {
        if (selectedTowerId) {
            placingTower.current = true;
        }
    }, [selectedTowerId]);


    return <canvas ref={canvasRef} width={width} height={height} className={className} />;
}

