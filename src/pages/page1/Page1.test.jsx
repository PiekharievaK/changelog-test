import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AddPage } from './Page1.jsx';
import { MathBlock } from '../../conponents/mathblock/mathBlock.jsx';

vi.mock('../../conponents/mathblock/mathBlock.jsx', () => ({
  MathBlock: vi.fn(({ action }) => <div data-testid={`mathblock-${action}`}>MathBlock {action}</div>)
}));

describe('AddPage Component', () => {
  const renderWithRouter = (ui, { route = '/1' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/1" element={ui}>
            <Route path="1" element={<div>Subpage1</div>} />
            <Route path="2" element={<div>Subpage2</div>} />
            <Route path="3" element={<div>Subpage3</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    it('should render the page heading', () => {
      renderWithRouter(<AddPage />);
      expect(screen.getByRole('heading', { name: 'Page 1' })).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      renderWithRouter(<AddPage />);
      expect(screen.getByRole('link', { name: 'SubPage 1' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'SubPage 2' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'SubPage 3' })).toBeInTheDocument();
    });

    it('should render three MathBlock components', () => {
      renderWithRouter(<AddPage />);
      expect(screen.getByTestId('mathblock-+')).toBeInTheDocument();
      expect(screen.getByTestId('mathblock--')).toBeInTheDocument();
      expect(screen.getByTestId('mathblock-*')).toBeInTheDocument();
    });

    it('should render MathBlock with addition action', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith({ action: '+' }, {});
    });

    it('should render MathBlock with subtraction action', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith({ action: '-' }, {});
    });

    it('should render MathBlock with multiplication action', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith({ action: '*' }, {});
    });

    it('should have proper navigation structure', () => {
      renderWithRouter(<AddPage />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should render Outlet for nested routes', () => {
      renderWithRouter(<AddPage />);
      // Outlet is rendered implicitly by react-router-dom
      const page = screen.getByRole('heading', { name: 'Page 1' });
      expect(page).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('should have correct href for SubPage 1', () => {
      renderWithRouter(<AddPage />);
      const link = screen.getByRole('link', { name: 'SubPage 1' });
      expect(link).toHaveAttribute('href', '/1/1');
    });

    it('should have correct href for SubPage 2', () => {
      renderWithRouter(<AddPage />);
      const link = screen.getByRole('link', { name: 'SubPage 2' });
      expect(link).toHaveAttribute('href', '/1/2');
    });

    it('should have correct href for SubPage 3', () => {
      renderWithRouter(<AddPage />);
      const link = screen.getByRole('link', { name: 'SubPage 3' });
      expect(link).toHaveAttribute('href', '/1/3');
    });

    it('should render navigation separator', () => {
      renderWithRouter(<AddPage />);
      const navText = screen.getByRole('navigation').textContent;
      expect(navText).toContain('|');
    });
  });

  describe('MathBlock Components Order', () => {
    it('should render MathBlocks in correct order', () => {
      renderWithRouter(<AddPage />);
      const mathBlocks = screen.getAllByText(/MathBlock/);
      expect(mathBlocks[0]).toHaveTextContent('MathBlock +');
      expect(mathBlocks[1]).toHaveTextContent('MathBlock -');
      expect(mathBlocks[2]).toHaveTextContent('MathBlock *');
    });

    it('should call MathBlock exactly three times', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledTimes(3);
    });
  });

  describe('Component Structure', () => {
    it('should have main wrapper div', () => {
      const { container } = renderWithRouter(<AddPage />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have three separate divs for MathBlocks', () => {
      renderWithRouter(<AddPage />);
      const mathBlockDivs = screen.getAllByTestId(/mathblock-/);
      expect(mathBlockDivs).toHaveLength(3);
    });

    it('should render heading with level 2', () => {
      renderWithRouter(<AddPage />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Page 1');
    });
  });

  describe('Integration with Router', () => {
    it('should work with MemoryRouter', () => {
      renderWithRouter(<AddPage />);
      expect(screen.getByRole('heading', { name: 'Page 1' })).toBeInTheDocument();
    });

    it('should render nested route content when navigating to subpage 1', () => {
      renderWithRouter(<AddPage />, { route: '/1/1' });
      expect(screen.getByText('Subpage1')).toBeInTheDocument();
    });

    it('should render nested route content when navigating to subpage 2', () => {
      renderWithRouter(<AddPage />, { route: '/1/2' });
      expect(screen.getByText('Subpage2')).toBeInTheDocument();
    });

    it('should render nested route content when navigating to subpage 3', () => {
      renderWithRouter(<AddPage />, { route: '/1/3' });
      expect(screen.getByText('Subpage3')).toBeInTheDocument();
    });
  });

  describe('Constants', () => {
    it('should use correct action constant for addition', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith(
        expect.objectContaining({ action: '+' }),
        expect.anything()
      );
    });

    it('should use correct action constant for subtraction', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith(
        expect.objectContaining({ action: '-' }),
        expect.anything()
      );
    });

    it('should use correct action constant for multiplication', () => {
      renderWithRouter(<AddPage />);
      expect(MathBlock).toHaveBeenCalledWith(
        expect.objectContaining({ action: '*' }),
        expect.anything()
      );
    });
  });

  describe('Accessibility', () => {
    it('should have accessible heading', () => {
      renderWithRouter(<AddPage />);
      const heading = screen.getByRole('heading', { name: 'Page 1' });
      expect(heading).toBeVisible();
    });

    it('should have accessible navigation', () => {
      renderWithRouter(<AddPage />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeVisible();
    });

    it('should have accessible links', () => {
      renderWithRouter(<AddPage />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeVisible();
      });
    });
  });

  describe('Export', () => {
    it('should export AddPage as named export', () => {
      expect(AddPage).toBeDefined();
      expect(typeof AddPage).toBe('function');
    });
  });
});