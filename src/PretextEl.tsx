// NOTE: this component can be written in a cleaner way but I don't have enough time to refactor it
// So have fun, the main idea is still very clear and easy to understand

// The pretext stuff
import {
  prepareWithSegments, // NOTE: Measures and calculates the font metrics
  layoutNextLineRange, // NOTE:  layout a width with segments from the prev function
  materializeLineRange, // NOTE:  Gets the actual text and position after the layout is calculated
} from "@chenglou/pretext";

// Other imports
import { useEffect, useMemo, useState } from "react";

// CONSTANTS
const H_MARGIN = 56;
const MIN_SLOT_WIDTH = 120;
const HOLE_PADDING = 28;

export function PretextEl({
  content,
  object,
  enabled = true,
  textWidth = 960,
  fontSize = 24,
}) {
  const { width, height } = useViewportSize();
  const font = `400 ${fontSize}px "Metamorphous", serif`;
  const lineHeight = Math.round(fontSize * 1.5);

  // STEP 1: prepare the content with the font metrics
  const prepared = useMemo(
    () => prepareWithSegments(content, font),
    [content, font],
  );

  // STEP 2: layout the text into lines
  const lines = useMemo(() => {
    if (!enabled) return [];

    // text width with some margin
    const pWidth = Math.max(0, Math.min(textWidth, width - H_MARGIN * 2));
    const pLeft = Math.max(H_MARGIN, (width - pWidth) / 2);
    const pRight = pLeft + pWidth;

    const layoutLines = (verticalOffset) => {
      const nextLines = [];
      let cursor = { segmentIndex: 0, graphemeIndex: 0 };
      let currentY = 0;

      const addSlot = (w, x, lineTop) => {
        // NOTE: theoretically this function is all the pretext does
        // Handling that it doesn't collide with the objects is my job it's not handled by pretext
        // So it's not magic after all
        if (w < MIN_SLOT_WIDTH) return true;

        // STEP 2.1: given a w, and cursor give me the range of next words
        const range = layoutNextLineRange(prepared, cursor, w);

        if (!range) return false;

        // STEPP 2.2: gets the text from the prev range and spits the real text and the position to put it
        nextLines.push({
          text: materializeLineRange(prepared, range).text,
          x,
          y: lineTop,
        });

        cursor = range.end;

        return true;
      };

      // NOTE: the main rendering loop
      while (true) {
        const check = layoutNextLineRange(prepared, cursor, pWidth);
        if (!check) break;

        const lineTop = currentY + verticalOffset;
        const lineCenter = lineTop + lineHeight / 2;

        if (
          object &&
          lineCenter >= object.top - HOLE_PADDING &&
          lineCenter <= object.bottom + HOLE_PADDING
        ) // If the line is in the object
        {
          let objLeft = object.left;
          let objRight = object.right;

          // NOTE: we there is object we add 2 segments one tell it's left edge and one from it's right edge to the end
          const b = object.bandSize;
          const bandY = Math.floor(lineCenter / b) * b;
          const band =
            object.bands[bandY] ||
            object.bands[bandY - b] ||
            object.bands[bandY + b];

          if (band) {
            objLeft = Math.max(objLeft, band.left);
            objRight = Math.min(objRight, band.right);
          }

          addSlot(objLeft - HOLE_PADDING - pLeft, pLeft, lineTop);
          addSlot(
            pRight - (objRight + HOLE_PADDING),
            objRight + HOLE_PADDING,
            lineTop,
          );
        } else {
          // NOTE: if the line is not in the object we just add it normally
          if (!addSlot(pWidth, pLeft, lineTop)) break;
        }

        currentY += lineHeight;
        if (currentY > height + 1000) break;
      }

      return {
        lines: nextLines,
        blockHeight: Math.max(0, currentY - lineHeight),
      };
    };

    // NOTE: here we do the layout in 2 passes,
    // The first path I get the height that the we will have for the textarea
    // Second pass I use this height to center it to the page
    const firstPass = layoutLines(0);
    const centerOffset = Math.round((height - firstPass.blockHeight) / 2);
    const secondPass = layoutLines(centerOffset);
    return secondPass.lines;
  }, [enabled, prepared, textWidth, width, height, object, lineHeight]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        color: "rgba(243, 237, 224, 0.96)",
        fontSize: `${fontSize}px`,
        lineHeight: `${lineHeight}px`,
        fontFamily: '"Metamorphous", serif',
        pointerEvents: "none",
      }}
    >
      {lines.map((line, index) => (
        <div
          key={`line-${index}-${line.y}`}
          style={{
            position: "absolute",
            left: `${line.x}px`,
            top: `${line.y}px`,
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

function useViewportSize() {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
