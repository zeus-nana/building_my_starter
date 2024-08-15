import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Settings from "./pages/settings/Settings.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import SettingsPermissions from "./pages/settings/SettingsPermissions.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyles } from "./styles/GlobalStyles.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 1000 * 10,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate replace to="/settings" />} />
              <Route
                path="settings-permissions"
                element={<SettingsPermissions />}
              />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
