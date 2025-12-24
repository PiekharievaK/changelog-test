import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Subpage3 } from './subpage3.jsx';

describe('Subpage3 Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Subpage3 />);
      expect(screen.getByText('Subpage3')).toBeInTheDocument();
    });

    it('should render the correct text', () => {
      render(<Subpage3 />);
      const element = screen.getByText('Subpage3');
      expect(element).toHaveTextContent('Subpage3');
    });

    it('should render a div element', () => {
      const { container } = render(<Subpage3 />);
      const div = container.querySelector('div');
      expect(div).toBeInTheDocument();
    });

    it('should render text inside a div', () => {
      const { container } = render(<Subpage3 />);
      const div = container.querySelector('div');
      expect(div).toHaveTextContent('Subpage3');
    });
  });

  describe('Component Structure', () => {
    it('should have exactly one child element', () => {
      const { container } = render(<Subpage3 />);
      expect(container.firstChild.childNodes).toHaveLength(1);
    });

    it('should render only text content without additional elements', () => {
      const { container } = render(<Subpage3 />);
      const div = container.querySelector('div');
      expect(div.children).toHaveLength(0);
    });
  });

  describe('Export', () => {
    it('should export Subpage3 as named export', () => {
      expect(Subpage3).toBeDefined();
      expect(typeof Subpage3).toBe('function');
    });

    it('should be a valid React component', () => {
      const result = Subpage3();
      expect(result).toBeDefined();
      expect(result.type).toBe('div');
    });
  });

  describe('Multiple Renders', () => {
    it('should render consistently on multiple calls', () => {
      const { rerender } = render(<Subpage3 />);
      expect(screen.getByText('Subpage3')).toBeInTheDocument();
      
      rerender(<Subpage3 />);
      expect(screen.getByText('Subpage3')).toBeInTheDocument();
    });

    it('should render multiple instances independently', () => {
      const { container } = render(
        <>
          <Subpage3 />
          <Subpage3 />
        </>
      );
      const divs = container.querySelectorAll('div');
      expect(divs).toHaveLength(2);
      divs.forEach(div => {
        expect(div).toHaveTextContent('Subpage3');
      });
    });
  });

  describe('Accessibility', () => {
    it('should be visible', () => {
      render(<Subpage3 />);
      const element = screen.getByText('Subpage3');
      expect(element).toBeVisible();
    });

    it('should have text content that is accessible', () => {
      render(<Subpage3 />);
      expect(screen.getByText('Subpage3')).toHaveAccessibleName;
    });
  });

  describe('Snapshot', () => {
    it('should match structure expectations', () => {
      const { container } = render(<Subpage3 />);
      expect(container.innerHTML).toContain('Subpage3');
      expect(container.innerHTML).toMatch(/<div>Subpage3<\/div>/);
    });
  });

  describe('Comparison with other Subpages', () => {
    it('should render different text than Subpage1 and Subpage2', () => {
      render(<Subpage3 />);
      expect(screen.getByText('Subpage3')).toBeInTheDocument();
      expect(screen.queryByText('Subpage1')).not.toBeInTheDocument();
      expect(screen.queryByText('Subpage2')).not.toBeInTheDocument();
    });
  });
});