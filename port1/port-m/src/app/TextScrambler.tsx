// components/TextScrambler.tsx
import React, { useEffect, useState } from "react";

const CHARS = "AHEllllllllllloXYZabcdefghijklmnopqrstuvwxyz0123456789";

type Props = {
  text: string;
  speed?: number;
  duration?: number;
  delay?: number;
  className?: string;
};

const TextScrambler: React.FC<Props> = ({
  text,
  speed = 9,
  duration = 1500,
  className,
}) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.ceil(duration / speed);
    const scramble = () => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (frame >= totalFrames * (i / text.length)) {
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayed(output);
      frame++;
      if (frame <= totalFrames) {
        requestAnimationFrame(scramble);
      }
    };
    scramble();
  }, [text, duration, speed]);

  return <span className={className}>{displayed}</span>;
};

export default TextScrambler;
