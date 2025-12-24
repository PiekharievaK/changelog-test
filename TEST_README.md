# Test Suite Documentation

This document describes the comprehensive test suite added for the React application.

## Setup

### Install Dependencies

First, install the testing dependencies:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom
```

Or with yarn:

```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom
```

### Test Configuration

The test suite uses:
- **Vitest** as the test runner (modern, fast, Vite-native)
- **React Testing Library** for component testing
- **@testing-library/jest-dom** for DOM matchers
- **@testing-library/user-event** for simulating user interactions
- **jsdom** for DOM environment simulation

Configuration files:
- `vitest.config.js` - Vitest configuration
- `src/setupTests.js` - Test setup and global configurations

## Running Tests

### Available Scripts

After updating package.json with test scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

### Files Tested

The test suite covers all files modified in the current branch:

1. **src/utils/utils.js** - 80+ test cases
2. **src/conponents/mathblock/mathBlock.jsx** - 60+ test cases
3. **src/pages/page1/Page1.jsx** - 35+ test cases
4. **src/pages/subpages/subpage1.jsx** - 15+ test cases
5. **src/pages/subpages/subpage2.jsx** - 16+ test cases
6. **src/pages/subpages/subpage3.jsx** - 16+ test cases
7. **src/App.jsx** - 45+ test cases

See TESTING_SUMMARY.md for detailed breakdown.

## Package.json Updates Needed

Add these scripts to your package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Quick Start

1. Install dependencies
2. Add test scripts to package.json
3. Run `npm test` to execute all tests
4. Review TESTING_SUMMARY.md for detailed information

## Further Documentation

See TESTING_SUMMARY.md for:
- Detailed test coverage breakdown
- Testing patterns and best practices
- Integration instructions
- Troubleshooting guide