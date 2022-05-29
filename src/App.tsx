import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import ShellApp from "./components/ShellApp";
import { AuthenticationTitle } from "./pages/LoginPage";
function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const [yes, setYes] = useLocalStorage({
    key: "log on",
    defaultValue: 0,
  });
  function call() {
    setYes(0);
  }
  function yey() {
    setYes(1);
  }
  return (
    <div>
      <HashRouter>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <ModalsProvider>
                <Routes>
                  {yes === 0 ? (
                    <Route
                      path="/"
                      element={<AuthenticationTitle fn={yey} />}
                    />
                  ) : (
                    <Route path="/*" element={<ShellApp fn={call} />}></Route>
                  )}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
