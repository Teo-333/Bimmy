/**
 * Sample test to verify Jest configuration
 */

import { describe, test, expect } from '@jest/globals';

describe('Sample Test Suite', () => {
  test('should pass basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle async operations', async () => {
    const asyncFunction = async (): Promise<string> => {
      return Promise.resolve('Hello, Bimmy!');
    };

    const result = await asyncFunction();
    expect(result).toBe('Hello, Bimmy!');
  });

  test('should work with arrays', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toHaveLength(3);
    expect(fruits).toContain('banana');
  });
});
