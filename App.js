import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from '@navigation/RootNavigator';
import { AuthContextProvider } from '@contexts/authContext';

/** wrapping app with auth context provide which is responsible for authenticated and unauthenticated flow 
also wrapping app with query client provided by react query for handling the app wide api's
react query can cache api responses which can make better user experience  */
const App = () => {
  const queryClient = new QueryClient();
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </AuthContextProvider>
  );
};

export default App;
