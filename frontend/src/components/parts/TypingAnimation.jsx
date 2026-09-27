import React from "react";
import { TypeAnimation } from "react-type-animation";
const TypingAnimation = () => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <TypeAnimation
        sequence={[
          "Discover delicious recipes 🍳",
          1800,
          "Share your favorite dishes ❤️",
          1800,
          "Cook. Create. Inspire. ✨",
          1800,
          "Turn ingredients into memories 🍲",
          1800,
        ]}
        wrapper="span"
        speed={50}
        style={{
          /* Scales dynamically between 1.1rem (mobile) and 2rem (desktop) */
          fontSize: "clamp(1.1rem, 4.5vw, 2rem)",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingAnimation;
