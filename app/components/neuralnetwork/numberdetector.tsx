import Point from "@/miscs/point";
import { useEffect, useRef, useState } from "react";
import NeuralNetwork from "./neuralnetwork";


export default function NumberDetector() {

    const [predictionDigit, setPredictionDigit] = useState("-");
    const [predictionRate, setPredictionRate] = useState("-");
    const [nn, setNN] = useState<NeuralNetwork | null>(null);
    const runRf = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    let drawing = false;

    const handleOnRunClick = () => {
        if (nn) return;
        runRf.current!.style.display = "none";
        setNN(new NeuralNetwork());

    }

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.height, canvas.width);
    };

    const preporcessCanvas = (
        canvas: HTMLCanvasElement,
        size = 28,
    ): number[][] => {

        // 1. Temporary Canvas (28x28)
        const tmp = document.createElement("canvas");
        tmp.width = size;
        tmp.height = size;
        const tctx = tmp.getContext("2d")!;

        // 2. Background with white color
        tctx.fillStyle = "white";
        tctx.fillRect(0, 0, size, size);
        tctx.drawImage(canvas, 0, 0, size, size);

        const imgPreData = tctx.getImageData(0, 0, size, size);
        const prePixels = imgPreData.data;

        // 3. Make all non-white pixels black
        for (let i = 0; i < prePixels.length; i += 4) {
            const r = prePixels[i];
            const g = prePixels[i + 1];
            const b = prePixels[i + 2];

            if (r < 255 && r != 0) prePixels[i] = 0;
            if (g < 255 && g != 0) prePixels[i + 1] = 0;
            if (b < 255 && b != 0) prePixels[i + 2] = 0;
        }
        tctx.putImageData(imgPreData, 0, 0);

        // 4. Set Blur
        tctx.filter = "blur(1.5px)";
        tctx.drawImage(tmp, 0, 0, size, size);

        // 5. Get pixels
        const imgData = tctx.getImageData(0, 0, size, size);
        const pixels = imgData.data;

        // 6. Grayscale & Normalization
        const gray: number[] = [];
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Standard luminance weighting (as in OpenCV)
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

            // Normalization [0, 255] → [0, 1]
            const value = luminance / 255;
            gray.push(value);
        }

        // flat to vector (784×1)
        const columnVector = gray.map((v) => [v]);

        return columnVector;
    }

    const showGrayOnCanvas = (columnVector: number[][], displayCanvas: HTMLCanvasElement) => {
        const size = 28;
        const gray: number[][] = [];

        for (let y = 0; y < size; y++) {
            gray[y] = [];
            for (let x = 0; x < size; x++) {
                gray[y][x] = columnVector[y * size + x][0]; // 784×1 => 28×28
            }
        }

        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = size;
        tmpCanvas.height = size;
        const tmpCtx = tmpCanvas.getContext("2d")!;

        // Create image data and draw image to matrix
        const imageData = tmpCtx.createImageData(size, size);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const i = (y * size + x) * 4;
                const v = Math.floor(gray[y][x] * 255);
                imageData.data[i + 0] = v;
                imageData.data[i + 1] = v;
                imageData.data[i + 2] = v;
                imageData.data[i + 3] = 255;
            }
        }
        tmpCtx.putImageData(imageData, 0, 0);

        // Upscale
        const scale = 7;
        displayCanvas.width = size * scale;
        displayCanvas.height = size * scale;
        const ctx = displayCanvas.getContext("2d")!;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tmpCanvas, 0, 0, displayCanvas.width, displayCanvas.height);
    };

    const handlePredictClick = () => {
        if (!nn) return;
        const canvas = canvasRef.current!;
        const inputVector: number[][] = preporcessCanvas(canvas);

        // Draw small image to preview canvas
        showGrayOnCanvas(inputVector.map(row => [row[0]]), previewCanvasRef.current!);

        // Get error and predict image
        const { Z, A } = nn.forward(inputVector);
        const prediction = A.at(-1)!;

        //  Index des größten Wertes = vorhergesagte Zahl
        const predictedDigit = prediction.reduce(
            (maxIdx, val, i, arr) => (val[0] > arr[maxIdx][0] ? i : maxIdx),
            0
        );

        // console.log("Predicted digit:", predictedDigit);
        setPredictionDigit(`${predictedDigit}`);
        setPredictionRate(`${parseFloat((prediction[predictedDigit][0]).toFixed(7))}`)
    }

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.lineWidth = 38;
        ctx.lineCap = "round";
        const rootStyles = getComputedStyle(document.documentElement);
        const color = rootStyles.getPropertyValue('--font-color-p').trim();
        ctx.strokeStyle = color;
        // ctx.strokeStyle = "black";
        ctxRef.current = ctx;

        const canvas = canvasRef.current;

        const getPos = (e: MouseEvent) => {
            const rect = canvasRef.current!.getBoundingClientRect();
            return new Point (
                e.clientX - rect.left,
                e.clientY - rect.top
            );
        };

        const onMouseDown = (e: MouseEvent) => {
            drawing = true;
            const point = getPos(e);
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!drawing) return;
            const point = getPos(e);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
        };

        // const onTouchStart  = (e: Event): void => {
        //     e.preventDefault();
        //     drawing = true;
        //     const point = getPos(e.touches);
        //     ctx.beginPath();
        //     ctx.moveTo(point.x, point.y);
        // };

        // const onTouchMove = (e: Event) => {
        //     if (!drawing) return;
        //     const point = getPos(e);
        //     ctx.lineTo(point.x, point.y);
        //     ctx.stroke();
        // };

        const onMouseUp = () => (drawing = false);
        const onLeave = () => (drawing = false);

        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseleave", onMouseUp);
        // canvas.addEventListener("touchstart", onTouchStart);
        // canvas.addEventListener("touchmove", onTouchMove);
        // canvas.addEventListener("mouseup", onMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", onMouseDown);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mouseup", onMouseUp);
            canvas.removeEventListener("mouseleave", onMouseUp);
            // canvas.removeEventListener("touchstart", onTouchStart);
            // canvas.removeEventListener("touchmove", onTouchMove);
            // canvas.removeEventListener("touchstart", onTouchStart);
            // canvas.removeEventListener("touchstart", onTouchStart);
        };
    });

    return(
        <div className="number_detector">
            <div ref={runRf} className="number_detector_run_wrapper">
                <div className="number_detector_run_container">
                    <div className="number_detector_run_header_container">
                        <span className="number_detector_run_header">
                            Run Test Programm
                        </span>
                    </div>
                    <div className="number_detector_run_action_container" onClick={handleOnRunClick}>
                        <span className="number_detector_run_action">
                            Enable
                        </span>
                    </div>
                </div>
            </div>
            <div className="number_detector_wrapper">
                <div className="number_detector_input_wrapper">
                    <div className="number_detector_header_container">
                        <span className="number_detector_header">
                            Test Programm
                        </span>
                    </div>
                    <div className="number_detector_canvas_container">
                        <canvas ref={canvasRef} width={400} height={400} className="number_detector_canvas">

                        </canvas>
                    </div>
                    <div className="number_detector_actions_container">
                        <button className="number_detector_action_predict">
                            <span className="number_detector_action_predict_text" onClick={handlePredictClick}>
                                Predict
                            </span>
                        </button>
                        <button className="number_detector_action_predict" onClick={clearCanvas}>
                            <span className="number_detector_action_predict_text">
                                Clear
                            </span>
                        </button>
                    </div>
                </div>
                <div className="number_detector_output_wrapper">
                    <div>
                        <div className="number_detector_header_container">
                            <span className="number_detector_header">
                                Modelview
                            </span>
                        </div>
                        <div className="number_detector_preview_canvas_container">
                            <canvas ref={previewCanvasRef} width={196} height={196} className="number_detector_preview_canvas">

                            </canvas>
                        </div>
                    </div>
                    <div>
                        <div className="number_detector_header_container">
                            <span className="number_detector_header">
                                Prediction
                            </span>
                        </div>
                        <div className="number_detector_predict_wrapper">
                            <div className="number_detector_predict_container">
                                <span className="number_detector_predict">
                                    {predictionDigit}
                                </span>
                                <br />
                                <span className="number_detector_predict_rate_title">
                                    Probability
                                </span>
                                <br />
                                <span className="number_detector_predict_rate">
                                    [{predictionRate}]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}