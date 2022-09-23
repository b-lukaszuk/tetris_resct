import { ReactElement, useEffect, useRef } from 'react';

import drawGrid from './draw/drawGrid';
import setCanvasDefaults from './setCanvasDefaults';
import getRandomTetromino from '../tetrominos/getRandomTetromino';
import Tetromino from '../tetrominos/Tetromino';

import './Canvas.css';

const Canvas: React.FC = (): ReactElement<HTMLElement> => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tetrominoRef = useRef<Tetromino | null>(null);

  const moveDown = (canvas: HTMLCanvasElement | null, tetromino: Tetromino | null) => {
    if (tetromino && canvas) {
      tetromino.moveDown();
      drawGrid(canvas);
    } else {
      console.log('cannot move down');
    }
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas === null) {
      return undefined;
    }
    setCanvasDefaults(canvas);
    tetrominoRef.current = getRandomTetromino(canvas, 3, 3);

    tetrominoRef.current.drawFigure();

    drawGrid(canvas);
  }, []);

  return (
    <div>
      <canvas width="500" height="1000" ref={canvasRef} className="canvas" />
      <button onClick={() => moveDown(canvasRef.current, tetrominoRef.current)}>Move down</button>
    </div>
  );
};

export default Canvas;
