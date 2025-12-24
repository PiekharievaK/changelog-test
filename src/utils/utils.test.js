import { describe, it, expect, vi } from 'vitest';
import { handleMath } from './utils.js';

describe('handleMath', () => {
  describe('Addition operations', () => {
    it('should add two positive numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(5, 3, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(8);
    });

    it('should add two negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(-5, -3, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(-8);
    });

    it('should add positive and negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(10, -3, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(7);
    });

    it('should handle zero in addition', () => {
      const setResult = vi.fn();
      handleMath(0, 5, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });

    it('should handle decimal numbers in addition', () => {
      const setResult = vi.fn();
      handleMath(1.5, 2.3, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(3.8);
    });

    it('should handle string numbers in addition', () => {
      const setResult = vi.fn();
      handleMath('5', '3', '+', setResult);
      expect(setResult).toHaveBeenCalledWith(8);
    });

    it('should handle large numbers in addition', () => {
      const setResult = vi.fn();
      handleMath(999999999, 1, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(1000000000);
    });
  });

  describe('Subtraction operations', () => {
    it('should subtract two positive numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(10, 3, '-', setResult);
      expect(setResult).toHaveBeenCalledWith(7);
    });

    it('should subtract two negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(-5, -3, '-', setResult);
      expect(setResult).toHaveBeenCalledWith(-2);
    });

    it('should handle subtraction resulting in negative', () => {
      const setResult = vi.fn();
      handleMath(3, 10, '-', setResult);
      expect(setResult).toHaveBeenCalledWith(-7);
    });

    it('should handle zero in subtraction', () => {
      const setResult = vi.fn();
      handleMath(5, 0, '-', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });

    it('should handle decimal numbers in subtraction', () => {
      const setResult = vi.fn();
      handleMath(5.5, 2.2, '-', setResult);
      expect(setResult).toBeCloseTo(3.3, 10);
    });

    it('should handle string numbers in subtraction', () => {
      const setResult = vi.fn();
      handleMath('10', '3', '-', setResult);
      expect(setResult).toHaveBeenCalledWith(7);
    });
  });

  describe('Multiplication operations', () => {
    it('should multiply two positive numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(5, 3, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(15);
    });

    it('should multiply two negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(-5, -3, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(15);
    });

    it('should multiply positive and negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(5, -3, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(-15);
    });

    it('should handle multiplication by zero', () => {
      const setResult = vi.fn();
      handleMath(5, 0, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(0);
    });

    it('should handle multiplication by one', () => {
      const setResult = vi.fn();
      handleMath(5, 1, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });

    it('should handle decimal numbers in multiplication', () => {
      const setResult = vi.fn();
      handleMath(2.5, 4, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(10);
    });

    it('should handle string numbers in multiplication', () => {
      const setResult = vi.fn();
      handleMath('5', '3', '*', setResult);
      expect(setResult).toHaveBeenCalledWith(15);
    });

    it('should handle large number multiplication', () => {
      const setResult = vi.fn();
      handleMath(1000, 1000, '*', setResult);
      expect(setResult).toHaveBeenCalledWith(1000000);
    });
  });

  describe('Division operations', () => {
    it('should divide two positive numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(10, 2, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });

    it('should divide two negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(-10, -2, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });

    it('should divide positive and negative numbers correctly', () => {
      const setResult = vi.fn();
      handleMath(10, -2, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(-5);
    });

    it('should handle division by one', () => {
      const setResult = vi.fn();
      handleMath(10, 1, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(10);
    });

    it('should handle division resulting in decimal', () => {
      const setResult = vi.fn();
      handleMath(10, 3, '/', setResult);
      expect(setResult).toBeCloseTo(3.333333, 5);
    });

    it('should handle division by zero (returns Infinity)', () => {
      const setResult = vi.fn();
      handleMath(10, 0, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(Infinity);
    });

    it('should handle zero divided by number', () => {
      const setResult = vi.fn();
      handleMath(0, 5, '/', setResult);
      expect(setResult).toHaveBeenCalledWith(0);
    });

    it('should handle string numbers in division', () => {
      const setResult = vi.fn();
      handleMath('10', '2', '/', setResult);
      expect(setResult).toHaveBeenCalledWith(5);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle very small decimal numbers', () => {
      const setResult = vi.fn();
      handleMath(0.1, 0.2, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(0.30000000000000004); // JavaScript floating point precision
    });

    it('should handle negative zero', () => {
      const setResult = vi.fn();
      handleMath(0, -0, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(0);
    });

    it('should call setResult exactly once', () => {
      const setResult = vi.fn();
      handleMath(5, 3, '+', setResult);
      expect(setResult).toHaveBeenCalledTimes(1);
    });

    it('should handle modulo operation', () => {
      const setResult = vi.fn();
      handleMath(10, 3, '%', setResult);
      expect(setResult).toHaveBeenCalledWith(1);
    });

    it('should handle exponentiation operation', () => {
      const setResult = vi.fn();
      handleMath(2, 3, '**', setResult);
      expect(setResult).toHaveBeenCalledWith(8);
    });

    it('should handle scientific notation', () => {
      const setResult = vi.fn();
      handleMath(1e10, 1e5, '+', setResult);
      expect(setResult).toHaveBeenCalledWith(10000100000);
    });
  });
});