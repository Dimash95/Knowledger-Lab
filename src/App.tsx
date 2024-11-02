import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Circle } from "react-konva";
import useImage from "use-image";
import "./App.css";

function App() {
  const [image] = useImage("../public/img/monkey.png");
  const imageRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = event => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    console.log(mousePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mousePosition]);

  const allowedPoints = [
    { x: 995, y: 954 },
    { x: 838, y: 860 },
    { x: 869, y: 660 },
    { x: 1027, y: 550 },
    { x: 875, y: 436 },
    { x: 956, y: 370 },
    { x: 998, y: 212 },
  ];

  const getClosestPoint = (clickX, clickY) => {
    return allowedPoints.find(point => {
      const distance = Math.sqrt(
        (clickX - point.x) ** 2 + (clickY - point.y) ** 2,
      );
      return distance <= 20;
    });
  };

  const handleStageClick = e => {
    const clickX = e.evt.clientX;
    const clickY = e.evt.clientY;
    const closestPoint = getClosestPoint(clickX, clickY);

    if (closestPoint) {
      imageRef.current.to({
        x: closestPoint.x - 20,
        y: closestPoint.y - 20,
        duration: 0.3,
      });
    }
  };

  return (
    <div className="background">
      <p>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </p>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
        style={{ border: "2px solid black" }}
      >
        <Layer>
          {allowedPoints.map((point, index) => (
            <Circle key={index} x={point.x} y={point.y} radius={5} fill="red" />
          ))}

          <Image
            image={image}
            x={allowedPoints[0].x}
            y={allowedPoints[0].y}
            width={40}
            height={40}
            ref={imageRef}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
