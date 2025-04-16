import React, { useEffect, useRef, useState } from "react";
import CanvasImages from "./CanvasImages";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = CanvasImages[index.value];
    img.onload = () => {
      canvas.width = img.naturalWidth * scale; // Set the width of the canvas
      canvas.height = img.naturalHeight * scale; // Set the height of the canvas
      ctx.drawImage(img, 0, 0);
    };
  }, [index]);
  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(1)}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.6}px`,
        height: `${size * 1.6}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
        // border: "1px solid black",
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
