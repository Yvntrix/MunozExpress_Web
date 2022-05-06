import {
  AppShell,
  Burger,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { TruckDelivery } from "tabler-icons-react";
import Customer from "../pages/Customer";
import Pabili from "../pages/Pabili";
import Pahatid from "../pages/Pahatid";
import Pakuha from "../pages/Pakuha";
import Pasundo from "../pages/Pasundo";
import Rider from "../pages/Rider";
import DarkMode from "./DarkMode";
import { NavbarNested } from "./NavBar";
type func = {
  fn: () => void;
};
export default function ShellApp({ fn }: func) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  function call() {
    setOpened(false);
  }
  function logout() {
    fn();
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavbarNested fn={call} yes={logout} />
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Group spacing="xs">
              <TruckDelivery />
              <Title order={3}>
                <Text
                  component="span"
                  align="center"
                  variant="gradient"
                  gradient={{ from: "red", to: "yellow", deg: 45 }}
                  size="xl"
                  weight={700}
                  style={{ fontFamily: "Greycliff CF, sans-serif" }}
                >
                  Muñoz Express
                </Text>
              </Title>
            </Group>

            <DarkMode />
          </div>
        </Header>
      }
    >
      <Routes>
        <Route path="/" element={<Pabili />}></Route>
        <Route path="pabili" element={<Pabili />}></Route>
        <Route path="pahatid" element={<Pahatid />}></Route>
        <Route path="pakuha" element={<Pakuha />}></Route>
        <Route path="pasundo" element={<Pasundo />}></Route>
        <Route path="customer" element={<Customer />}></Route>
        <Route path="rider" element={<Rider />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
