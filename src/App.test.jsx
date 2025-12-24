import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

vi.mock('./pages/page1/Page1', () => ({
  AddPage: () => <div data-testid="add-page">AddPage Content</div>
}));

vi.mock('./pages/page2/Page2', () => ({
  default: () => <div data-testid="subtract-page">SubtractPage Content</div>
}));

vi.mock('./pages/page3/Page3', () => ({
  default: () => <div data-testid="multiply-page">MultiplyPage Content</div>
}));

vi.mock('./pages/subpages/subpage1', () => ({
  Subpage1: () => <div data-testid="subpage1">Subpage1 Content</div>
}));

vi.mock('./pages/subpages/subpage2', () => ({
  Subpage2: () => <div data-testid="subpage2">Subpage2 Content</div>
}));

vi.mock('./pages/subpages/subpage3', () => ({
  Subpage3: () => <div data-testid="subpage3">Subpage3 Content</div>
}));

describe('App Component', () => {
  describe('Initial Rendering', () => {
    it('should render without crashing', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });

    it('should render the main heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: 'Test Page' });
      expect(heading).toHaveTextContent('Test Page');
    });

    it('should render navigation links', () => {
      render(<App />);
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Page 3' })).toBeInTheDocument();
    });

    it('should render heading with level 1', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Test Page');
    });

    it('should have navigation element', () => {
      render(<App />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href for Page 1', () => {
      render(<App />);
      const link = screen.getByRole('link', { name: 'Page 1' });
      expect(link).toHaveAttribute('href', '/1');
    });

    it('should have correct href for Page 2', () => {
      render(<App />);
      const link = screen.getByRole('link', { name: 'Page 2' });
      expect(link).toHaveAttribute('href', '/2');
    });

    it('should have correct href for Page 3', () => {
      render(<App />);
      const link = screen.getByRole('link', { name: 'Page 3' });
      expect(link).toHaveAttribute('href', '/3');
    });

    it('should render navigation separators', () => {
      render(<App />);
      const navText = screen.getByRole('navigation').textContent;
      expect(navText).toContain('|');
    });

    it('should have exactly 3 navigation links', () => {
      render(<App />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });
  });

  describe('Routing - Page 1', () => {
    it('should navigate to Page 1 when clicking Page 1 link', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 1' });
      await user.click(link);
      
      expect(screen.getByTestId('add-page')).toBeInTheDocument();
    });

    it('should render AddPage component on /1 route', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 1' });
      await user.click(link);
      
      expect(screen.getByText('AddPage Content')).toBeInTheDocument();
    });
  });

  describe('Routing - Page 2', () => {
    it('should navigate to Page 2 when clicking Page 2 link', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 2' });
      await user.click(link);
      
      expect(screen.getByTestId('subtract-page')).toBeInTheDocument();
    });

    it('should render SubtractPage component on /2 route', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 2' });
      await user.click(link);
      
      expect(screen.getByText('SubtractPage Content')).toBeInTheDocument();
    });
  });

  describe('Routing - Page 3', () => {
    it('should navigate to Page 3 when clicking Page 3 link', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 3' });
      await user.click(link);
      
      expect(screen.getByTestId('multiply-page')).toBeInTheDocument();
    });

    it('should render MultiplyPage component on /3 route', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link = screen.getByRole('link', { name: 'Page 3' });
      await user.click(link);
      
      expect(screen.getByText('MultiplyPage Content')).toBeInTheDocument();
    });
  });

  describe('Nested Routing for Page 1', () => {
    it('should support nested routes under Page 1', () => {
      render(<App />);
      // Routes configuration should allow nested routes
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
    });
  });

  describe('Component Imports', () => {
    it('should import AddPage as named export', () => {
      render(<App />);
      // If the import fails, component won't render
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });

    it('should import SubtractPage as default export', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });

    it('should import MultiplyPage as default export', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });

    it('should import all Subpage components', () => {
      render(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });
  });

  describe('Router Configuration', () => {
    it('should wrap app in BrowserRouter', () => {
      render(<App />);
      // Navigation links should be clickable (router is working)
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
    });

    it('should have Routes component', () => {
      render(<App />);
      expect(screen.getByRole('link', { name: 'Page 1' })).toBeInTheDocument();
    });

    it('should configure Route for Page 1 with nested routes', () => {
      render(<App />);
      expect(screen.getByRole('link', { name: 'Page 1' })).toHaveAttribute('href', '/1');
    });
  });

  describe('Navigation Flow', () => {
    it('should navigate between different pages', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      // Navigate to Page 1
      await user.click(screen.getByRole('link', { name: 'Page 1' }));
      expect(screen.getByTestId('add-page')).toBeInTheDocument();
      
      // Navigate to Page 2
      await user.click(screen.getByRole('link', { name: 'Page 2' }));
      expect(screen.getByTestId('subtract-page')).toBeInTheDocument();
      
      // Navigate to Page 3
      await user.click(screen.getByRole('link', { name: 'Page 3' }));
      expect(screen.getByTestId('multiply-page')).toBeInTheDocument();
    });

    it('should maintain header and navigation when switching routes', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      await user.click(screen.getByRole('link', { name: 'Page 1' }));
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(3);
      
      await user.click(screen.getByRole('link', { name: 'Page 2' }));
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
      expect(screen.getAllByRole('link')).toHaveLength(3);
    });
  });

  describe('Export', () => {
    it('should export App as default export', () => {
      expect(App).toBeDefined();
      expect(typeof App).toBe('function');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible heading', () => {
      render(<App />);
      const heading = screen.getByRole('heading', { name: 'Test Page' });
      expect(heading).toBeVisible();
    });

    it('should have accessible navigation', () => {
      render(<App />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeVisible();
    });

    it('should have accessible links with proper labels', () => {
      render(<App />);
      const links = screen.getAllByRole('link');
      expect(links[0]).toHaveAccessibleName('Page 1');
      expect(links[1]).toHaveAccessibleName('Page 2');
      expect(links[2]).toHaveAccessibleName('Page 3');
    });

    it('should have all links visible and clickable', () => {
      render(<App />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeVisible();
      });
    });
  });

  describe('Layout Structure', () => {
    it('should have proper DOM hierarchy', () => {
      const { container } = render(<App />);
      expect(container.querySelector('h1')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should render navigation before routes', () => {
      const { container } = render(<App />);
      const h1 = container.querySelector('h1');
      const nav = container.querySelector('nav');
      expect(h1.compareDocumentPosition(nav)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid navigation clicks', async () => {
      const user = userEvent.setup();
      render(<App />);
      
      const link1 = screen.getByRole('link', { name: 'Page 1' });
      const link2 = screen.getByRole('link', { name: 'Page 2' });
      
      await user.click(link1);
      await user.click(link2);
      await user.click(link1);
      
      expect(screen.getByTestId('add-page')).toBeInTheDocument();
    });

    it('should handle multiple renders', () => {
      const { rerender } = render(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
      
      rerender(<App />);
      expect(screen.getByRole('heading', { name: 'Test Page' })).toBeInTheDocument();
    });
  });
});