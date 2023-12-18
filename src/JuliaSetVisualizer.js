import React, { useEffect } from "react";
import * as math from "mathjs";

const JuliaSetVisualizer = () => {
  const MAX_ITERATIONS = 30;
  const INITIAL_CONSTANT = [-0.99, 0.3];
  const TEMP_SIZE = 350;

  let constant, tempCanvas, tempCtx, canvas, ctx, size;
  let mouseX = 0,
    mouseY = 0;
  let width;

  const lerp = (value, [min1, max1], [min2, max2]) => {
    return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
  };

  const julia = (z, i = 0) => {
    z = z.mul(z);
    z = z.add(constant);
    if (math.abs(z) > 2 || i === MAX_ITERATIONS) return i;
    return julia(z, i + 1);
  };

  const resizeCanvas = () => {
    if (window.innerWidth < 1080.98) {
      canvas.height = canvas.width = size = window.innerWidth;
    } else canvas.width = canvas.height = size = window.innerHeight;
    width = window.innerWidth;
    tempCanvas.width = tempCanvas.height = TEMP_SIZE;
  };

  const pixelToPoint = (x, y) => {
    let zx = (x / TEMP_SIZE) * 2 - 1;
    let zy = 1 - (y / TEMP_SIZE) * 2;
    return math.complex(zx, zy);
  };

  const pointToColor = (point) => {
    let iterations = julia(point);
    let percentage = iterations / MAX_ITERATIONS;
    return `rgb(${percentage * 255}, ${percentage}, ${percentage})`;
  };

  const drawPixel = (x, y, color) => {
    tempCtx.fillStyle = color;
    tempCtx.fillRect(x, y, 1, 1);
  };

  const draw = () => {
    for (let y = 0; y < TEMP_SIZE; y += 2) {
      for (let x = 0; x < TEMP_SIZE; x += 2) {
        let point = pixelToPoint(x, y);
        let color = pointToColor(point);
        drawPixel(x, y, color);
        drawPixel(x + 1, y + 1, color);
      }
    }
  };

  const update = () => {
    tempCtx.fillStyle = "white";
    tempCtx.fillRect(0, 0, TEMP_SIZE, TEMP_SIZE);
    draw();
    let image = new Image();
    image.src = tempCanvas.toDataURL();
    image.onload = function () {
      ctx.drawImage(image, 0, 0, TEMP_SIZE, TEMP_SIZE, 0, 0, size, size);
    };
  };

  useEffect(() => {
    constant = math.complex(...INITIAL_CONSTANT);
    tempCanvas = document.createElement("canvas");
    tempCanvas.width = tempCanvas.height = TEMP_SIZE;
    tempCtx = tempCanvas.getContext("2d");
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");

    resizeCanvas();
    update();

    const handlePointerMove = (event) => {
      mouseX = event.clientX - document.body.offsetLeft;
      mouseY = event.clientY - document.body.offsetTop;
      console.log(mouseX, mouseY);
      mouseX = lerp(mouseX, [0, size], [0, TEMP_SIZE]);
      mouseY = lerp(mouseY, [0, size], [0, TEMP_SIZE]);
      constant = pixelToPoint(mouseX, mouseY);
      constant.re = math.round(constant.re * 100) / 100;
      constant.im = math.round(constant.im * 100) / 100;
      update();
    };

    document.body.addEventListener("pointermove", handlePointerMove);

    const handleResize = () => {
      if (window.innerWidth !== width) {
        resizeCanvas();
        update();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ width: "85vh", height: "100vh" }}>
      <canvas style={{ width: "100%", height: "100%" }}></canvas>
      <p id="date"></p>
    </div>
  );
};

export default JuliaSetVisualizer;
