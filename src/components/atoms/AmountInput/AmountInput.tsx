import React from 'react';
import styles from './AmountInput.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const AmountInput: React.FC<AmountInputProps> = ({ value, onChange, min = 0, max = 99 }) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.button} 
        onClick={handleDecrement} 
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <FaMinus size={10} />
      </button>
      <input 
        type="number" 
        className={styles.input} 
        value={value} 
        onChange={handleChange}
        min={min}
        max={max}
      />
      <button 
        className={styles.button} 
        onClick={handleIncrement} 
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <FaPlus size={10} />
      </button>
    </div>
  );
};

export default AmountInput;
