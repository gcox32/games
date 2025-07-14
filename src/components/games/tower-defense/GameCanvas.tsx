'use client';

import { useRef, useEffect } from 'react';

interface GameCanvasInterface {
    height: number,
    width: number,
    className: string
}

export default const GameCanvas: GameCanvasInterface = (height, width, className) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastTime = performance.now();

        const gameLoop = (now: number) => {
            const deltaTime = now - lastTime;
            lastTime = now;

            update(deltaTime);
            render(ctx);

            animationFrameId = requestAnimationFrame(gameLoop)
        };

        const update = (delta: number) => {
            // no logic yet
        }

        const render = (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

        }

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(animationFrameId)

    }, []);

    return <canvas 
        ref =       {canvasRef}
        height =    {height}
        width =     {width}
        className = {className}
        />
}