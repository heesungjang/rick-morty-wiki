// REACT
import axios from "axios";
import React, { useEffect } from "react";

// Query
import { QueryClient, QueryClientProvider } from "react-query";
import { useQuery } from "react-query";
import Main from "./pages/main";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
