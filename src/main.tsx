import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Toolkits/store.ts";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
  // </React.StrictMode>
);
