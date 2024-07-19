import { screen, render, act } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const queryClient = new QueryClient();
// declare which API requests to mock
const server = setupServer(
  http.get('/api/themes', () => {
    return HttpResponse.json([
      {
        id: 'a86b7d0b-e1af-4d0d-8231-e5ea4cb433c3',
        title: 'download+and+sync+options',
        original_title: 'Download And Sync Options',
        summary: 'Download and sync options are available for various platforms and devices.',
        created_at: '2024-06-17T14:21:22.330206',
        updated_at: '2024-06-17T14:21:22.330241',
        source: 'top',
      },
      {
        id: '34c7bf41-5f99-406a-8b6f-7b3a11a932ef',
        title: 'software+engineering+director+roles',
        original_title: 'Software Engineering Director Roles',
        summary:
          'Software engineering director roles in various companies require expertise in software development tools and team management.',
        created_at: '2024-06-17T14:21:22.330206',
        updated_at: '2024-06-17T14:21:22.330241',
        source: 'top',
      },
      {
        id: 'fddfc95b-a847-4a70-9f4c-903f0fe5ca03',
        title: 'consumer+information',
        original_title: 'Consumer Information',
        summary: null,
        created_at: '2024-06-06T15:43:48.725583',
        updated_at: '2024-06-17T14:21:22.330241',
        source: 'top',
      },
    ]);
  }),
);
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe('has headings', async () => {
  it('has the right headings', async () => {
    await act(() => {
      render(<Dashboard />, { wrapper: AllTheProviders });
    });
    const headings = await screen.getAllByRole('heading');
    const heading_texts = headings.map((heading) => {
      return heading.innerHTML;
    });
    expect(heading_texts, 'Headings should be present and correct').toEqual([
      'Top Themes',
      'Recent Themes',
      'Custom Themes',
    ]);
  });
});
