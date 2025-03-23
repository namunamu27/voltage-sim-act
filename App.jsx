import { useState, useEffect } from "react";

export default function App() {
  const [angle, setAngle] = useState(15);
  const [resistance, setResistance] = useState(1);
  const [carsPassed, setCarsPassed] = useState(0);

  const current = (angle / 45) * (1 / resistance);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarsPassed((prev) => prev + Math.round(current * 5));
    }, 1000);
    return () => clearInterval(interval);
  }, [angle, resistance]);

  return (
    <div style={{ padding: 20 }}>
      <h2>🚗 전압과 전류 시뮬레이션</h2>

      <div>
        <label>⚡ 경사도(전압): {angle}°</label><br />
        <input type="range" min="0" max="60" value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
      </div>

      <div>
        <label>🛑 저항: {resistance.toFixed(1)}</label><br />
        <input type="range" min="1" max="5" step="0.1" value={resistance} onChange={(e) => setResistance(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 20 }}>
        <p>📊 전류 세기(상대값): {current.toFixed(2)}</p>
        <p>🚙 누적 차량 수: {carsPassed}대</p>
      </div>

      <div style={{
        height: 30, background: "#d0e6ff", marginTop: 20, position: "relative"
      }}>
        <div style={{
          width: `${Math.min(current * 100, 100)}%`,
          background: "#3b82f6", height: "100%"
        }} />
        <span style={{
          position: "absolute", top: 5, left: "40%", color: "white", fontWeight: "bold"
        }}>전류 흐름 시각화</span>
      </div>
    </div>
  );
}
