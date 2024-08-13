import GlobalStyles from "./styles/GlobalStyles.ts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Settings from "./pages/settings/Settings.tsx";
import AppLayout from "./ui/AppLayout.tsx";
import Login from "./pages/Login.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
import SettingsPermissions from "./pages/settings/SettingsPermissions.tsx";

function App() {
  return (
    <>
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
      <GlobalStyles />
    </>
  );
}

export default App;
