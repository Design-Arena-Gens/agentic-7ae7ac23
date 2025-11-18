'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let carX = -300;
    let animationId: number;

    const buildings = [
      { x: 50, width: 120, height: 200, color: '#8B7355' },
      { x: 200, width: 100, height: 250, color: '#A0826D' },
      { x: 330, width: 140, height: 180, color: '#9C7A5D' },
      { x: 500, width: 90, height: 220, color: '#8B6F47' },
      { x: 620, width: 110, height: 190, color: '#A58968' },
      { x: 760, width: 130, height: 240, color: '#967A5A' },
      { x: 920, width: 100, height: 200, color: '#8D7152' },
      { x: 1050, width: 120, height: 230, color: '#9E8164' },
    ];

    const trees = [
      { x: 170, y: 380 },
      { x: 470, y: 380 },
      { x: 590, y: 380 },
      { x: 890, y: 380 },
      { x: 1020, y: 380 },
    ];

    function drawCar(x: number, y: number) {
      if (!ctx) return;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x - 5, y + 45, 170, 10);

      // Car body
      ctx.fillStyle = '#F8F8FF';
      ctx.fillRect(x + 20, y + 10, 130, 30);
      ctx.fillRect(x, y + 25, 160, 20);

      // Windows
      ctx.fillStyle = '#4A4A4A';
      ctx.fillRect(x + 30, y + 12, 35, 20);
      ctx.fillRect(x + 75, y + 12, 35, 20);
      ctx.fillRect(x + 120, y + 12, 25, 20);

      // Wheels
      ctx.fillStyle = '#2C2C2C';
      ctx.beginPath();
      ctx.arc(x + 30, y + 45, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 130, y + 45, 12, 0, Math.PI * 2);
      ctx.fill();

      // Wheel rims
      ctx.fillStyle = '#SILVER';
      ctx.beginPath();
      ctx.arc(x + 30, y + 45, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 130, y + 45, 6, 0, Math.PI * 2);
      ctx.fill();

      // Headlights
      ctx.fillStyle = '#FFD700';
      ctx.fillRect(x + 155, y + 30, 5, 8);

      // BMW grille
      ctx.fillStyle = '#1C1C1C';
      ctx.fillRect(x + 145, y + 32, 10, 6);

      // M5 Badge
      ctx.fillStyle = '#1E90FF';
      ctx.font = 'bold 8px Arial';
      ctx.fillText('M5', x + 135, y + 23);

      // Details
      ctx.strokeStyle = '#E0E0E0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 70, y + 12);
      ctx.lineTo(x + 70, y + 32);
      ctx.stroke();
    }

    function drawBuilding(b: typeof buildings[0]) {
      if (!ctx) return;

      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, 400 - b.height, b.width, b.height);

      // Windows
      ctx.fillStyle = '#FFE4B5';
      const rows = Math.floor(b.height / 30);
      const cols = Math.floor(b.width / 25);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.fillRect(
            b.x + 10 + col * 25,
            400 - b.height + 20 + row * 30,
            12,
            15
          );
        }
      }
    }

    function drawTree(x: number, y: number) {
      if (!ctx) return;

      // Trunk
      ctx.fillStyle = '#654321';
      ctx.fillRect(x - 5, y, 10, 20);

      // Foliage
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.arc(x, y - 5, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - 12, y + 5, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 12, y + 5, 15, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(900, 80, 40, 0, Math.PI * 2);
      ctx.fill();

      // Buildings
      buildings.forEach(drawBuilding);

      // Road
      ctx.fillStyle = '#404040';
      ctx.fillRect(0, 400, canvas.width, 200);

      // Road markings
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < canvas.width; i += 60) {
        ctx.fillRect(i, 450, 40, 4);
      }

      // Sidewalk
      ctx.fillStyle = '#A9A9A9';
      ctx.fillRect(0, 400, canvas.width, 10);

      // Trees
      trees.forEach(t => drawTree(t.x, t.y));

      // Sign "ЛОБНЯ"
      ctx.fillStyle = '#2E8B57';
      ctx.fillRect(700, 330, 120, 60);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('ЛОБНЯ', 715, 365);

      // Draw car
      drawCar(carX, 360);

      // Move car
      carX += 3;

      // Reset position when off screen
      if (carX > canvas.width + 100) {
        carX = -300;
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      padding: '20px',
    }}>
      <h1 style={{
        color: '#fff',
        fontSize: '2.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}>
        BMW M5 в городе Лобня
      </h1>
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        style={{
          border: '3px solid #333',
          borderRadius: '10px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <p style={{
        color: '#aaa',
        marginTop: '20px',
        fontSize: '1.1rem',
        textAlign: 'center',
      }}>
        Белый BMW M5 едет по улицам Лобни
      </p>
    </main>
  );
}
