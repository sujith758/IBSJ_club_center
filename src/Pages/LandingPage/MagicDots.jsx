// WaterDropGrid.jsx
import anime from "animejs";
import "./MagicDots.css";

const MagicDots = () => {
  return (
    <div className="water-drop-container">
      <DotGrid />
    </div>
  );
};

const GRID_WIDTH = 35;
const GRID_HEIGHT = 9;

const DotGrid = () => {
  const handleDotClick = (e) => {
    anime({
      targets: ".custom-dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 150 },
        { value: 1, easing: "easeInOutQuad", duration: 200 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 150 },
        { value: 0, easing: "easeInOutQuad", duration: 200 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 150 },
        { value: 0.5, easing: "easeInOutQuad", duration: 200 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="custom-dot-group"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="custom-dot-point"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      onClick={handleDotClick}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="custom-dot-grid"
    >
      {dots}
    </div>
  );
};

export default MagicDots;
