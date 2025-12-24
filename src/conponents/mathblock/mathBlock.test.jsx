import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MathBlock } from './mathBlock.jsx';
import * as utils from '../../utils/utils.js';

vi.mock('../../utils/utils.js');

describe('MathBlock Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with the provided action as heading', () => {
      render(<MathBlock action="+" />);
      expect(screen.getByRole('heading', { name: '+' })).toBeInTheDocument();
    });

    it('should render with subtraction action', () => {
      render(<MathBlock action="-" />);
      expect(screen.getByRole('heading', { name: '-' })).toBeInTheDocument();
    });

    it('should render with multiplication action', () => {
      render(<MathBlock action="*" />);
      expect(screen.getByRole('heading', { name: '*' })).toBeInTheDocument();
    });

    it('should render with division action', () => {
      render(<MathBlock action="/" />);
      expect(screen.getByRole('heading', { name: '/' })).toBeInTheDocument();
    });

    it('should render two number inputs', () => {
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs).toHaveLength(2);
    });

    it('should render a Start button', () => {
      render(<MathBlock action="+" />);
      expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    });

    it('should not render result initially', () => {
      render(<MathBlock action="+" />);
      expect(screen.queryByText(/Result:/)).not.toBeInTheDocument();
    });

    it('should initialize inputs with value 0', () => {
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      expect(inputs[0]).toHaveValue(0);
      expect(inputs[1]).toHaveValue(0);
    });
  });

  describe('User Interactions - Input Changes', () => {
    it('should update first input value when user types', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');
      
      expect(inputs[0]).toHaveValue(5);
    });

    it('should update second input value when user types', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[1]);
      await user.type(inputs[1], '3');
      
      expect(inputs[1]).toHaveValue(3);
    });

    it('should handle negative numbers', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '-5');
      
      expect(inputs[0]).toHaveValue(-5);
    });

    it('should handle decimal numbers', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '3.14');
      
      expect(inputs[0]).toHaveValue(3.14);
    });

    it('should handle clearing input', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');
      await user.clear(inputs[0]);
      
      expect(inputs[0]).toHaveValue(null);
    });

    it('should handle rapid input changes', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '123');
      
      expect(inputs[0]).toHaveValue(123);
    });

    it('should maintain independent state for both inputs', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '20');
      
      expect(inputs[0]).toHaveValue(10);
      expect(inputs[1]).toHaveValue(20);
    });
  });

  describe('User Interactions - Button Click', () => {
    it('should call handleMath when Start button is clicked', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalled();
    });

    it('should call handleMath with correct parameters for addition', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '5');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '3');
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledWith('5', '3', '+', expect.any(Function));
    });

    it('should call handleMath with correct parameters for subtraction', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="-" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '10');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '7');
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledWith('10', '7', '-', expect.any(Function));
    });

    it('should call handleMath with correct parameters for multiplication', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="*" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '4');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '6');
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledWith('4', '6', '*', expect.any(Function));
    });

    it('should handle multiple button clicks', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      await user.click(button);
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledTimes(3);
    });
  });

  describe('Result Display', () => {
    it('should display result after calculation', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(8);
      });
      
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 8')).toBeInTheDocument();
      });
    });

    it('should display zero result', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(0);
      });
      
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 0')).toBeInTheDocument();
      });
    });

    it('should display negative result', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(-5);
      });
      
      render(<MathBlock action="-" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: -5')).toBeInTheDocument();
      });
    });

    it('should display decimal result', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(3.14);
      });
      
      render(<MathBlock action="/" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 3.14')).toBeInTheDocument();
      });
    });

    it('should update result when calculation is performed again', async () => {
      const user = userEvent.setup();
      let callCount = 0;
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        callCount++;
        setResult(callCount === 1 ? 10 : 20);
      });
      
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByText('Result: 10')).toBeInTheDocument();
      });
      
      await user.click(button);
      await waitFor(() => {
        expect(screen.getByText('Result: 20')).toBeInTheDocument();
      });
    });
  });

  describe('Integration with different actions', () => {
    it('should handle complete addition workflow', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(Number(a) + Number(b));
      });
      
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '15');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '25');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 40')).toBeInTheDocument();
      });
    });

    it('should handle complete subtraction workflow', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(Number(a) - Number(b));
      });
      
      render(<MathBlock action="-" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '50');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '30');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 20')).toBeInTheDocument();
      });
    });

    it('should handle complete multiplication workflow', async () => {
      const user = userEvent.setup();
      utils.handleMath.mockImplementation((a, b, action, setResult) => {
        setResult(Number(a) * Number(b));
      });
      
      render(<MathBlock action="*" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '7');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '8');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Result: 56')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle clicking Start with default values', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledWith(0, 0, '+', expect.any(Function));
    });

    it('should handle empty string in inputs', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalled();
    });

    it('should handle very large numbers', async () => {
      const user = userEvent.setup();
      render(<MathBlock action="*" />);
      const inputs = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button', { name: 'Start' });
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '999999999');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '999999999');
      await user.click(button);
      
      expect(utils.handleMath).toHaveBeenCalledWith('999999999', '999999999', '*', expect.any(Function));
    });

    it('should maintain state across re-renders', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      await user.clear(inputs[0]);
      await user.type(inputs[0], '42');
      
      rerender(<MathBlock action="+" />);
      
      const updatedInputs = screen.getAllByRole('spinbutton');
      expect(updatedInputs[0]).toHaveValue(42);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible number inputs', () => {
      render(<MathBlock action="+" />);
      const inputs = screen.getAllByRole('spinbutton');
      
      expect(inputs[0]).toHaveAttribute('type', 'number');
      expect(inputs[1]).toHaveAttribute('type', 'number');
    });

    it('should have accessible button', () => {
      render(<MathBlock action="+" />);
      const button = screen.getByRole('button', { name: 'Start' });
      
      expect(button).toBeInTheDocument();
      expect(button).toBeEnabled();
    });

    it('should have proper heading structure', () => {
      render(<MathBlock action="+" />);
      const heading = screen.getByRole('heading', { level: 3 });
      
      expect(heading).toHaveTextContent('+');
    });
  });
});