import React, { useState, useRef, useEffect, CSSProperties } from "react";
import "./styles.css"; // Создайте этот файл для стилей
import { Minus, Plus } from "lucide-react";

const VolumeSlider = ({
  handleDbChange,
  hz,
}: {
  handleDbChange: (volume: number) => void;
  hz;
}) => {
  const [value, setValue] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const MIN = 2;
  const MAX = 8;
  const STEP = 1;

  const calculateNewValue = (clientX: number) => {
    if (!trackRef.current || !thumbRef.current) return value;

    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbWidth = thumbRef.current.offsetWidth;
    let newX = clientX - trackRect.left - thumbWidth / 2;

    newX = Math.max(0, Math.min(newX, trackRect.width - thumbWidth));
    const percent = newX / (trackRect.width - thumbWidth);
    return Math.round(percent * (MAX - MIN) + MIN);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | any) => {
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent | any) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const newValue = calculateNewValue(x);
    setValue(newValue);
    handleDbChange(newValue * 10);
  };

  const handleMouseClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const newValue = calculateNewValue(e.clientX);
    if (newValue < 1 || newValue > 10) return;
    setValue(newValue);

    handleDbChange(newValue * 10);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDecrease = () => {
    setValue((prev) => Math.max(MIN, prev - STEP));
    if (value < 2) return;
    handleDbChange((value - 1) * 10);
  };

  const handleIncrease = () => {
    setValue((prev) => Math.min(MAX, prev + STEP));
    if (value > 7) return;
    handleDbChange((value + 1) * 10);
  };

  useEffect(() => {
    setValue(2);
  }, [hz]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const thumbPosition: CSSProperties = {
    left: `calc(${((value - MIN) / (MAX - MIN)) * 100}% `,
  };

  return (
    <div className="volume-slider gap-[20px] lg:gap-[25px]">
      <button
        className="slider-button p-[5px] lg:p-[10px]"
        onClick={(e) => {
          e.stopPropagation();
          handleDecrease();
        }}
      >
        <Minus />
      </button>

      <div className="slider-container" ref={trackRef}>
        <div className="slider-track" onClick={handleMouseClick}>
          <div
            style={{ width: thumbPosition.left }}
            className="absolute left-0 top-0 h-full bg-primary rounded-[6px]"
          ></div>
          <div
            className="slider-thumb flex items-center justify-center w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]"
            ref={thumbRef}
            style={thumbPosition}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {value - 1}
          </div>
        </div>
        {new Array(7).fill(1).map((_, index, array) => (
          <div
            key={index}
            className="absolute w-[2px] h-full bg-[#ccc] slider-step"
            style={{
              left: `${(100 / 6) * index}%`,
              display: [array.length - 1, 0].includes(index) ? "none" : "block",
            }}
          ></div>
        ))}
      </div>

      <button
        className="slider-button p-[5px] lg:p-[10px]"
        onClick={(e) => {
          e.stopPropagation();
          handleIncrease();
        }}
      >
        <Plus />
      </button>
    </div>
  );
};

export default VolumeSlider;
