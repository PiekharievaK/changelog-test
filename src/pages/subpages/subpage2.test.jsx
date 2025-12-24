import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Subpage2 } from './subpage2.jsx';

describe('Subpage2 Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Subpage2 />);
      expect(screen.getByText('Subpage2')).toBeInTheDocument();
    });

    it('should render the correct text', () => {
      render(<Subpage2 />);
      const element = screen.getByText('Subpage2');
      expect(element).toHaveTextContent('Subpage2');
    });

    it('should render a div element', () => {
      const { container } = render(<Subpage2 />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('should render text inside a div', () => {
      const { container } = render(<Subpage2 />);
      const div = container.querySelector('div');
      expect(div).toHaveTextContent('Subpage2');
    });
  });

  describe('Component Structure', () => {
    it('should have exactly one child element', () => {
      const { container } = render(<Subpage2 />);
      expect(container.firstChild.childNodes).toHaveLength(1);
    });

    it('should render only text content without additional elements', () => {
      const { container } = render(<Subpage2 />);
      const div = container.querySelector('div');
      expect(div.children).toHaveLength(0);
    });
  });

  describe('Export', () => {
    it('should export Subpage2 as named export', () => {
      expect(Subpage2).toBeDefined();
      expect(typeof Subpage2).toBe('function');
    });

    it('should be a valid React component', () => {
      const result = Subpage2();
      expect(result).toBeDefined();
      expect(result.type).toBe('div');
    });
  });

  describe('Multiple Renders', () => {
    it('should render consistently on multiple calls', () => {
      const { rerender } = render(<Subpage2 />);
      expect(screen.getByText('Subpage2')).toBeInTheDocument();
      
      rerender(<Subpage2 />);
      expect(screen.getByText('Subpage2')).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <Subpage2 />
          <Subpage2 />
        </>
      );
      const divs = container.querySelectorAll('div');
      expect(divs).toHaveLength(2);
      divs.forEach(div => {
        expect(div).toHaveTextContent('Subpage2');
      });
    });
  });

  describe('Accessibility', () => {
    it('should be visible', () => {
      render(<Subpage2 />);
      const element = screen.getByText('Subpage2');
      expect(element).toBeVisible();
    });

    it('should have text content that is accessible', () => {
      render(<Subpage2 />);
      expect(screen.getByText('Subpage2')).toHaveAccessibleName;
    });
  });

  describe('Snapshot', () => {
    it('should match structure expectations', () => {
      const { container } = render(<Subpage2 />);
      expect(container.innerHTML).toContain('Subpage2');
      expect(container.innerHTML).toMatch(/<div>Subpage2<\/div>/);
    });
  });

  describe('Comparison with Subpage1', () => {
    it('should render different text than Subpage1', () => {
      render(<Subpage2 />);
      expect(screen.getByText('Subpage2')).toBeInTheDocument();
      expect(screen.queryByText('Subpage1')).not.toBeInTheDocument();
    });
  });
});