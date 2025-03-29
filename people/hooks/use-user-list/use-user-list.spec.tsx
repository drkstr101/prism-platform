import { renderHook } from '@testing-library/react';
import { MockProvider } from '@pied/pied-piper.testing.mock-provider';
import { useUserList } from './use-user-list.js';

it('should return the correct number of mock users', () => {
  const { result } = renderHook(() => useUserList(), { wrapper: MockProvider });
  expect(result.current.length).toBe(2);
});
