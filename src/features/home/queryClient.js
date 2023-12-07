// queryClient.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Notifications } from '@mantine/notifications';
import queryFunctions from '@/features/home/service';

const queryClient = new QueryClient();

function aaApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <Notifications />
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default aaApp;

