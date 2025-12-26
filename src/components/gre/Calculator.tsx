"use client";

import { useState } from 'react';
import { Button } from '@/design-system/components/ui/button';
import { X } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
}

export function Calculator({ onClose }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 w-72 z-50">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-900">Calculator</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClose}
          className="h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="bg-gray-100 p-3 rounded text-right font-mono text-xl mb-3 min-h-[2.5rem] flex items-center justify-end text-gray-900">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="outline"
          onClick={clear}
          className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          Clear
        </Button>
        <Button
          variant="outline"
          onClick={() => performOperation('/')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          ÷
        </Button>
        <Button
          variant="outline"
          onClick={() => performOperation('*')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          ×
        </Button>
        {['7', '8', '9'].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => inputNumber(num)}
            className="bg-white hover:bg-gray-100 text-gray-900"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => performOperation('-')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          −
        </Button>
        {['4', '5', '6'].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => inputNumber(num)}
            className="bg-white hover:bg-gray-100 text-gray-900"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={() => performOperation('+')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900"
        >
          +
        </Button>
        {['1', '2', '3'].map((num) => (
          <Button
            key={num}
            variant="outline"
            onClick={() => inputNumber(num)}
            className="bg-white hover:bg-gray-100 text-gray-900"
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          onClick={handleEquals}
          className="bg-blue-600 hover:bg-blue-700 text-white row-span-2"
        >
          =
        </Button>
        <Button
          variant="outline"
          onClick={() => inputNumber('0')}
          className="bg-white hover:bg-gray-100 text-gray-900 col-span-2"
        >
          0
        </Button>
        <Button
          variant="outline"
          onClick={inputDecimal}
          className="bg-white hover:bg-gray-100 text-gray-900"
        >
          .
        </Button>
      </div>
    </div>
  );
}

