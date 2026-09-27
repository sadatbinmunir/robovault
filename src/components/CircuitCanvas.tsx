import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CircuitTrace {
  id: number;
  points: Point[];
  length: number;
  color: string;
  isBus?: boolean;
  busIndex?: number;
  type: 'data' | 'power' | 'clock';
  connectedTraceIds: number[];
}

interface DataPacket {
  traceIndex: number;
  distance: number;
  speed: number;
  size: number;
  color: string;
  glow: number;
  isExtra?: boolean;
}

interface ClickPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

interface ClickSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  life: number;
  color: string;
}

interface ChipPad {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  subLabel: string;
  pins: { x: number; y: number; side: 'left' | 'right' | 'top' | 'bottom' }[];
  ledColor: string;
  ledBlinkRate: number;
}

interface SMDComponent {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label?: string;
  type: 'resistor' | 'capacitor';
}

interface SilkLabel {
  x: number;
  y: number;
  text: string;
  rotation: number;
}

export const CircuitCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let traces: CircuitTrace[] = [];
    let packets: DataPacket[] = [];
    let clickPulses: ClickPulse[] = [];
    let clickSparks: ClickSpark[] = [];
    let chips: ChipPad[] = [];
    let smds: SMDComponent[] = [];
    let silkLabels: SilkLabel[] = [];
    let mousePos = { x: -1000, y: -1000 };

    const resizeAndInit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      generateCircuits();
    };

    const generateCircuits = () => {
      traces = [];
      packets = [];
      chips = [];
      smds = [];
      silkLabels = [];

      const gridSize = Math.max(38, Math.min(56, Math.floor(width / 30)));
      const cols = Math.ceil(width / gridSize) + 3;
      const rows = Math.ceil(height / gridSize) + 3;

      // 1. Generate Microchip IC Silicon Pads (QFP / DIP packages)
      const numChips = Math.max(3, Math.min(8, Math.floor((width * height) / 280000)));
      const chipDefs = [
        { label: 'ESP32-S3', sub: 'WROOM-1', color: '#10b981' },
        { label: 'CLAW-SERVO', sub: 'PWM-CTR', color: '#06b6d4' },
        { label: 'VISION-AI', sub: 'YOLO-NPU', color: '#10b981' },
        { label: 'TB6612FNG', sub: 'DUAL-DRV', color: '#f59e0b' },
        { label: 'ULTRASONIC', sub: 'ECHO-BUS', color: '#06b6d4' },
        { label: 'POWER-BUS', sub: '7.4V-BATT', color: '#10b981' },
        { label: 'ROBOVAULT', sub: 'REV-2.4', color: '#34d399' },
      ];

      for (let ch = 0; ch < numChips; ch++) {
        const cx = Math.floor(2 + Math.random() * (cols - 5)) * gridSize;
        const cy = Math.floor(2 + Math.random() * (rows - 5)) * gridSize;
        const chipW = gridSize * (2 + Math.floor(Math.random() * 2));
        const chipH = gridSize * (2 + Math.floor(Math.random() * 2));

        const def = chipDefs[ch % chipDefs.length];
        const pins: { x: number; y: number; side: 'left' | 'right' | 'top' | 'bottom' }[] = [];
        const pinStep = gridSize / 2;

        for (let px = cx + pinStep; px < cx + chipW; px += pinStep) {
          pins.push({ x: px, y: cy, side: 'top' });
          pins.push({ x: px, y: cy + chipH, side: 'bottom' });
        }
        for (let py = cy + pinStep; py < cy + chipH; py += pinStep) {
          pins.push({ x: cx, y: py, side: 'left' });
          pins.push({ x: cx + chipW, y: py, side: 'right' });
        }

        chips.push({
          x: cx,
          y: cy,
          width: chipW,
          height: chipH,
          label: def.label,
          subLabel: def.sub,
          pins,
          ledColor: def.color,
          ledBlinkRate: 0.04 + Math.random() * 0.05,
        });
      }

      // 2. Generate Parallel Multi-Line Bus Traces (Motherboard high-speed lanes)
      const numBuses = Math.floor(cols / 3.8);
      for (let b = 0; b < numBuses; b++) {
        const startCol = Math.floor(Math.random() * (cols - 4));
        const startRow = Math.floor(Math.random() * (rows - 4));
        const busLines = 3 + Math.floor(Math.random() * 3);
        const busSpacing = 7;
        const busLength = 4 + Math.floor(Math.random() * 6);
        const isHorizontal = Math.random() > 0.5;
        const busType: 'data' | 'power' | 'clock' = Math.random() > 0.65 ? 'power' : 'data';

        for (let line = 0; line < busLines; line++) {
          const offset = (line - busLines / 2) * busSpacing;
          const points: Point[] = [];

          if (isHorizontal) {
            let cx = startCol * gridSize;
            let cy = startRow * gridSize + offset;
            points.push({ x: cx, y: cy });
            cx += busLength * gridSize * 0.55;
            points.push({ x: cx, y: cy });
            cx += gridSize;
            cy += gridSize * (line % 2 === 0 ? 1 : -1);
            points.push({ x: cx, y: cy });
            cx += busLength * gridSize * 0.45;
            points.push({ x: cx, y: cy });
          } else {
            let cx = startCol * gridSize + offset;
            let cy = startRow * gridSize;
            points.push({ x: cx, y: cy });
            cy += busLength * gridSize * 0.55;
            points.push({ x: cx, y: cy });
            cx += gridSize * (line % 2 === 0 ? 1 : -1);
            cy += gridSize;
            points.push({ x: cx, y: cy });
            cy += busLength * gridSize * 0.45;
            points.push({ x: cx, y: cy });
          }

          let len = 0;
          for (let i = 0; i < points.length - 1; i++) {
            len += Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
          }

          traces.push({
            id: traces.length,
            points,
            length: len,
            color: busType === 'power' ? 'rgba(6, 182, 212, 0.22)' : 'rgba(16, 185, 129, 0.22)',
            isBus: true,
            busIndex: line,
            type: busType,
            connectedTraceIds: [],
          });

          // Place tiny SMD capacitor/resistor along the bus lines occasionally
          if (line === 0 && Math.random() > 0.35 && points.length >= 2) {
            const midP = points[1];
            smds.push({
              x: midP.x + (isHorizontal ? -15 : offset),
              y: midP.y + (isHorizontal ? offset : -15),
              width: isHorizontal ? 10 : 5,
              height: isHorizontal ? 5 : 10,
              rotation: isHorizontal ? 0 : 90,
              type: Math.random() > 0.5 ? 'resistor' : 'capacitor',
              label: Math.random() > 0.5 ? '10k' : '100nF',
            });
          }
        }
      }

      // 3. Generate Interconnected Individual Signal & Logic Traces
      for (let r = 0; r < rows; r += 1.4) {
        for (let c = 0; c < cols; c += 1.8) {
          if (Math.random() > 0.6) continue;

          let currentX = Math.round(c * gridSize);
          let currentY = Math.round(r * gridSize);
          const points: Point[] = [{ x: currentX, y: currentY }];
          const segments = 3 + Math.floor(Math.random() * 6);
          const isClock = Math.random() > 0.8;
          const isPower = !isClock && Math.random() > 0.75;

          for (let s = 0; s < segments; s++) {
            const dir = Math.random();
            const step = gridSize * (1 + Math.floor(Math.random() * 2));

            if (dir < 0.38) {
              currentX += step;
            } else if (dir < 0.72) {
              currentY += (Math.random() > 0.5 ? 1 : -1) * step;
            } else {
              // 45-degree trace routing
              const diag = gridSize * 1;
              currentX += diag;
              currentY += (Math.random() > 0.5 ? 1 : -1) * diag;
            }

            points.push({ x: currentX, y: currentY });
          }

          let totalLen = 0;
          for (let i = 0; i < points.length - 1; i++) {
            totalLen += Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
          }

          if (totalLen > 70) {
            traces.push({
              id: traces.length,
              points,
              length: totalLen,
              color: isPower
                ? 'rgba(6, 182, 212, 0.22)'
                : isClock
                ? 'rgba(52, 211, 153, 0.26)'
                : 'rgba(16, 185, 129, 0.2)',
              type: isPower ? 'power' : isClock ? 'clock' : 'data',
              connectedTraceIds: [],
            });

            // Add SMD component along the trace
            if (Math.random() > 0.75 && points.length >= 2) {
              const p = points[1];
              smds.push({
                x: p.x,
                y: p.y,
                width: 9,
                height: 5,
                rotation: 0,
                type: 'resistor',
                label: '4.7k',
              });
            }
          }
        }
      }

      // 4. Calculate Interconnected Trace Network (Nodes where wires meet)
      for (let i = 0; i < traces.length; i++) {
        const t1 = traces[i];
        for (let j = i + 1; j < traces.length; j++) {
          const t2 = traces[j];
          let connected = false;
          for (const p1 of t1.points) {
            for (const p2 of t2.points) {
              if (Math.hypot(p1.x - p2.x, p1.y - p2.y) < 28) {
                t1.connectedTraceIds.push(t2.id);
                t2.connectedTraceIds.push(t1.id);
                connected = true;
                break;
              }
            }
            if (connected) break;
          }
        }
      }

      // 5. Silkscreen Labels
      const silks = [
        'ROBOVAULT // MAINBOARD v2.4',
        'GND',
        'VCC_5V',
        'I2C_SCL',
        'I2C_SDA',
        'UART_TX',
        'UART_RX',
        'PWM_CH01',
        'PWM_CH02',
        'CLAW_SERVO_SIG',
        'CCDS-IUB ROBOTICS',
      ];
      for (let k = 0; k < 12; k++) {
        const rx = Math.floor(Math.random() * (width - 150)) + 60;
        const ry = Math.floor(Math.random() * (height - 100)) + 50;
        silkLabels.push({
          x: rx,
          y: ry,
          text: silks[k % silks.length],
          rotation: Math.random() > 0.8 ? -90 : 0,
        });
      }

      // 6. Populate steady ambient background data packets
      const basePacketCount = Math.min(85, Math.floor(traces.length * 0.95));
      for (let p = 0; p < basePacketCount; p++) {
        const traceIdx = Math.floor(Math.random() * traces.length);
        const tr = traces[traceIdx];
        const isCyan = tr.type === 'power';
        packets.push({
          traceIndex: traceIdx,
          distance: Math.random() * tr.length,
          speed: 1.2 + Math.random() * 2.2,
          size: 2.2 + Math.random() * 1.5,
          color: isCyan ? '#06b6d4' : Math.random() > 0.35 ? '#10b981' : '#34d399',
          glow: 8 + Math.random() * 6,
        });
      }
    };

    // Helper to get coordinates on trace by distance
    const getPointAlongTrace = (trace: CircuitTrace, dist: number): Point => {
      let accumulated = 0;
      for (let i = 0; i < trace.points.length - 1; i++) {
        const p1 = trace.points[i];
        const p2 = trace.points[i + 1];
        const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

        if (accumulated + segDist >= dist) {
          const ratio = (dist - accumulated) / segDist;
          return {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio,
          };
        }
        accumulated += segDist;
      }
      return trace.points[trace.points.length - 1];
    };

    // Helper: Find closest trace to given coordinates
    const findClosestTraces = (x: number, y: number, maxDistance: number = 380) => {
      const candidates: { trace: CircuitTrace; dist: number; nearestPoint: Point }[] = [];
      traces.forEach((tr) => {
        let minDist = Infinity;
        let bestPt: Point = tr.points[0];
        tr.points.forEach((pt) => {
          const d = Math.hypot(pt.x - x, pt.y - y);
          if (d < minDist) {
            minDist = d;
            bestPt = pt;
          }
        });
        if (minDist <= maxDistance) {
          candidates.push({ trace: tr, dist: minDist, nearestPoint: bestPt });
        }
      });
      candidates.sort((a, b) => a.dist - b.dist);
      return candidates;
    };

    // MULTI-BRANCHING ELECTRICAL SURGE ON CLICK
    const triggerSurge = (x: number, y: number) => {
      const nearby = findClosestTraces(x, y, 420);
      if (nearby.length === 0) return;

      // Concentric dual shockwave ring
      clickPulses.push({
        x,
        y,
        radius: 2,
        maxRadius: 65,
        alpha: 0.95,
        color: '#00ffaa',
        lineWidth: 2,
      });

      clickPulses.push({
        x,
        y,
        radius: 1,
        maxRadius: 40,
        alpha: 0.7,
        color: '#06b6d4',
        lineWidth: 1.2,
      });

      // Electric spark burst
      for (let s = 0; s < 7; s++) {
        clickSparks.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4.5,
          vy: (Math.random() - 0.5) * 4.5,
          alpha: 1.0,
          size: 2.0 + Math.random() * 1.5,
          life: 0,
          color: s % 2 === 0 ? '#00ffaa' : '#38bdf8',
        });
      }

      // Send primary surge packets into up to 3 closest traces
      const primaryCount = Math.min(3, nearby.length);
      for (let i = 0; i < primaryCount; i++) {
        const targetTrace = nearby[i].trace;
        packets.push({
          traceIndex: targetTrace.id,
          distance: 0,
          speed: 3.8 + Math.random() * 0.8,
          size: 3.5,
          color: i === 1 ? '#38bdf8' : '#00ffaa',
          glow: 18,
          isExtra: true,
        });

        // Branching: Send daughter pulse down connected adjacent traces
        if (targetTrace.connectedTraceIds.length > 0) {
          const branchTraceId = targetTrace.connectedTraceIds[0];
          packets.push({
            traceIndex: branchTraceId,
            distance: 0,
            speed: 3.2,
            size: 2.8,
            color: '#34d399',
            glow: 14,
            isExtra: true,
          });
        }
      }
    };

    // Pointer click handler
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) {
        return;
      }

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      triggerSurge(clientX, clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      resizeAndInit();
    };

    resizeAndInit();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    // Main Render Loop
    let lastTime = 0;
    const render = (time: number) => {
      const delta = lastTime ? (time - lastTime) / 1000 : 0.016;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Dark Board Background with Substrate Texture
      ctx.fillStyle = '#020503';
      ctx.fillRect(0, 0, width, height);

      // Radial Board Glow
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        120,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, 'rgba(4, 42, 25, 0.55)');
      bgGrad.addColorStop(0.55, 'rgba(3, 19, 12, 0.38)');
      bgGrad.addColorStop(1, 'rgba(2, 5, 3, 0.96)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. PCB Ground Hatch Grid (Subtle technical depth)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.035)';
      ctx.lineWidth = 0.8;
      const gridStep = 44;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridStep) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw Silkscreen Markings
      ctx.fillStyle = 'rgba(52, 211, 153, 0.22)';
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      silkLabels.forEach((label) => {
        ctx.save();
        ctx.translate(label.x, label.y);
        if (label.rotation !== 0) ctx.rotate((label.rotation * Math.PI) / 180);
        ctx.fillText(label.text, 0, 0);
        ctx.restore();
      });

      // 4. Draw Microchip IC Pads with Pulsing Status LEDs
      chips.forEach((chip) => {
        // IC Silicon Body
        ctx.fillStyle = 'rgba(5, 22, 13, 0.9)';
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.roundRect(chip.x, chip.y, chip.width, chip.height, 4);
        ctx.fill();
        ctx.stroke();

        // Pin 1 Indicator dot (top-left notch)
        ctx.beginPath();
        ctx.arc(chip.x + 8, chip.y + 8, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.75)';
        ctx.fill();

        // IC Primary Label & Sub-Label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(chip.label, chip.x + chip.width / 2, chip.y + chip.height / 2 - 4);

        ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
        ctx.font = '7px "JetBrains Mono", monospace';
        ctx.fillText(chip.subLabel, chip.x + chip.width / 2, chip.y + chip.height / 2 + 7);

        // Chip Status LED (Heartbeat pulsation)
        const ledAlpha = 0.35 + Math.sin(time * chip.ledBlinkRate) * 0.45;
        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = chip.ledColor;
        ctx.beginPath();
        ctx.arc(chip.x + chip.width - 9, chip.y + 9, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = chip.ledColor;
        ctx.globalAlpha = Math.max(0.15, ledAlpha);
        ctx.fill();
        ctx.restore();

        // Chip Pins
        chip.pins.forEach((pin) => {
          ctx.beginPath();
          ctx.arc(pin.x, pin.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.65)';
          ctx.fill();
        });
      });

      // 5. Draw SMD Components (Resistors & Capacitors)
      smds.forEach((smd) => {
        ctx.save();
        ctx.translate(smd.x, smd.y);
        if (smd.rotation !== 0) ctx.rotate((smd.rotation * Math.PI) / 180);

        // Ceramic body
        ctx.fillStyle = smd.type === 'resistor' ? '#091c12' : '#142a20';
        ctx.fillRect(-smd.width / 2, -smd.height / 2, smd.width, smd.height);

        // Silver / Tin terminal end-caps
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.fillRect(-smd.width / 2, -smd.height / 2, 2.5, smd.height);
        ctx.fillRect(smd.width / 2 - 2.5, -smd.height / 2, 2.5, smd.height);

        ctx.restore();
      });

      // 6. Draw Circuit Traces & Bus Bundles
      traces.forEach((trace) => {
        ctx.beginPath();
        trace.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });

        ctx.strokeStyle = trace.isBus
          ? trace.type === 'power'
            ? 'rgba(6, 182, 212, 0.2)'
            : 'rgba(16, 185, 129, 0.2)'
          : trace.color;
        ctx.lineWidth = trace.isBus ? 1.0 : trace.type === 'power' ? 1.4 : 1.2;
        ctx.stroke();

        // Solder pads / vias at endpoints and intersections
        trace.points.forEach((pt, pIdx) => {
          if (pIdx === 0 || pIdx === trace.points.length - 1 || pIdx % 2 === 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = trace.type === 'power' ? 'rgba(6, 182, 212, 0.45)' : 'rgba(16, 185, 129, 0.45)';
            ctx.fill();

            // Inner hole
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 0.9, 0, Math.PI * 2);
            ctx.fillStyle = '#020503';
            ctx.fill();
          }
        });
      });

      // 7. Mouse Proximity Aura (Subtle interactive lighting)
      if (mousePos.x > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          180
        );
        mouseGlow.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
        mouseGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)');
        mouseGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(mousePos.x - 180, mousePos.y - 180, 360, 360);
      }

      // 8. Update & Draw Data Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const trace = traces[p.traceIndex];
        if (!trace) {
          packets.splice(i, 1);
          continue;
        }

        p.distance += p.speed;

        if (p.distance >= trace.length) {
          if (p.isExtra) {
            packets.splice(i, 1);
            continue;
          } else {
            p.distance = 0;
            p.traceIndex = Math.floor(Math.random() * traces.length);
          }
        }

        const currentPos = getPointAlongTrace(trace, p.distance);

        // Glowing Comet Tail
        const tailLength = Math.min(p.distance, 26);
        if (tailLength > 2) {
          const tailPos = getPointAlongTrace(trace, Math.max(0, p.distance - tailLength));
          const tailGrad = ctx.createLinearGradient(
            tailPos.x,
            tailPos.y,
            currentPos.x,
            currentPos.y
          );
          tailGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          tailGrad.addColorStop(1, p.color);

          ctx.beginPath();
          ctx.moveTo(tailPos.x, tailPos.y);
          ctx.lineTo(currentPos.x, currentPos.y);
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = p.size;
          ctx.stroke();
        }

        // Packet Head
        ctx.save();
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // 9. Update & Draw Shockwaves
      for (let i = clickPulses.length - 1; i >= 0; i--) {
        const pulse = clickPulses[i];
        pulse.radius += 3.6;
        pulse.alpha *= 0.94;

        if (pulse.radius >= pulse.maxRadius || pulse.alpha < 0.02) {
          clickPulses.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.strokeStyle = pulse.color;
        ctx.lineWidth = Math.max(0.6, pulse.lineWidth * pulse.alpha);
        ctx.shadowBlur = 12;
        ctx.shadowColor = pulse.color;
        ctx.stroke();
        ctx.restore();
      }

      // 10. Update & Draw Electrical Sparks
      for (let i = clickSparks.length - 1; i >= 0; i--) {
        const spark = clickSparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.92;
        spark.vy *= 0.92;
        spark.alpha *= 0.92;
        spark.life += 1;

        if (spark.alpha < 0.03 || spark.life > 45) {
          clickSparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * spark.alpha, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.shadowBlur = 9;
        ctx.shadowColor = spark.color;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity select-none"
      />

      {/* Interactive Helper Badge */}
      <div className="fixed bottom-4 right-4 z-20 pointer-events-none hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md text-[11px] text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.25)]">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="font-mono tracking-wide">
          Interactive PCB · Click anywhere to send circuit surge
        </span>
      </div>
    </>
  );
};
