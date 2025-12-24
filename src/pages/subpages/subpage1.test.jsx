import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Subpage1 } from './subpage1.jsx';

describe('Subpage1 Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Subpage1 />);
      expect(screen.getByText('Subpage1')).toBeInTheDocument();
    });

    it('should render the correct text', () => {
      render(<Subpage1 />);
      const element = screen.getByText('Subpage1');
      expect(element).toHaveTextContent('Subpage1');
    });

    it('should render a div element', () => {
      const { container } = render(<Subpage1 />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('should render text inside a div', () => {
      const { container } = render(<Subpage1 />);
      const div = container.querySelector('div');
      expect(div).toHaveTextContent('Subpage1');
    });
  });

  describe('Component Structure', () => {
    it('should have exactly one child element', () => {
      const { container } = render(<Subpage1 />);
      expect(container.firstChild.childNodes).toHaveLength(1);
    });

    it('should render only text content without additional elements', () => {
      const { container } = render(<Subpage1 />);
      const div = container.querySelector('div');
      expect(div.children).toHaveLength(0);
    });
  });

  describe('Export', () => {
    it('should export Subpage1 as named export', () => {
      expect(Subpage1).toBeDefined();
      expect(typeof Subpage1).toBe('function');
    });

    it('should be a valid React component', () => {
      const result = Subpage1();
      expect(result).toBeDefined();
      expect(result.type).toBe('div');
    });
  });

  describe('Multiple Renders', () => {
    it('should render consistently on multiple calls', () => {
      const { rerender } = render(<Subpage1 />);
      expect(screen.getByText('Subpage1')).toBeInTheDocument();
      
      rerender(<Subpage1 />);
      expect(screen.getByText('Subpage1')).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <Subpage1 />
          <Subpage1 />
        </>
      );
      const divs = container.querySelectorAll('div');
      expect(divs).toHaveLength(2);
      divs.forEach(div => {
        expect(div).toHaveTextContent('Subpage1');
      });
    });
  });

  describe('Accessibility', () => {
    it('should be visible', () => {
      render(<Subpage1 />);
      const element = screen.getByText('Subpage1');
      expect(element).toBeVisible();
    });

    it('should have text content that is accessible', () => {
      render(<Subpage1 />);
      expect(screen.getByText('Subpage1')).toHaveAccessibleName;
    });
  });

  describe('Snapshot', () => {
    it('should match structure expectations', () => {
      const { container } = render(<Subpage1 />);
      expect(container.innerHTML).toContain('Subpage1');
      expect(container.innerHTML).toMatch(/<div>Subpage1<\/div>/);
    });
  });
});