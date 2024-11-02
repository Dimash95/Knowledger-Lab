import { useRef } from "react";
import { Stage, Layer, Image, Circle } from "react-konva";
import useImage from "use-image";
import "./App.css";

function App() {
  const [image] = useImage("../public/img/monkey.png");
  const imageRef = useRef(null);

  const allowedPoints = [
    { x: 995, y: 964 },
    { x: 838, y: 880 },
    { x: 869, y: 676 },
    { x: 1027, y: 564 },
    { x: 876, y: 453 },
    { x: 955, y: 388 },
    { x: 998, y: 229 },
  ];

  const getClosestPoint = (clickX, clickY) => {
    return allowedPoints.find(point => {
      const distance = Math.sqrt(
        (clickX - point.x) ** 2 + (clickY - point.y) ** 2,
      );
      return distance <= 50;
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
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
      >
        <Layer>
          {allowedPoints.map((point, index) => (
            <Circle key={index} x={point.x} y={point.y} radius={5} fill="red" />
          ))}

          <Image
            image={image}
            x={allowedPoints[0].x - 20}
            y={allowedPoints[0].y - 20}
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
