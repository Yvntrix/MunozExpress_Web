import { Navbar, ScrollArea, createStyles, Button, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Archive, User, Files, Logout } from "tabler-icons-react";
import { LinksGroup } from "./LinkGroup";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },
  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {},
  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colorScheme === "dark"
          ? theme.white
          : theme.colors[theme.primaryColor][7],
    },
  },
}));

type func = {
  fn: () => void;
  yes: () => void;
};
export function NavbarNested({ fn, yes }: func) {
  const { pathname } = useLocation();
  const { classes } = useStyles();
  let open;
  let openA;
  if (pathname === "/pabili") {
    open = true;
  }
  if (pathname === "/pahatid") {
    open = true;
  }
  if (pathname === "/pakuha") {
    open = true;
  }
  if (pathname === "/pasundo") {
    open = true;
  }

  if (pathname === "/customer") {
    openA = true;
  }
  if (pathname === "/rider") {
    openA = true;
  }
  const mockdata = [
    {
      label: "Transactions",
      icon: Archive,
      lin: "",
      initiallyOpened: open,
      links: [
        { label: "Pabili", link: "/pabili" },
        { label: "Pahatid", link: "/pahatid" },
        { label: "Pakuha", link: "/pakuha" },
        { label: "Pasundo", link: "/pasundo" },
      ],
    },
    { label: "Records", icon: Files, lin: "/records" },
    {
      label: "Accounts",
      icon: User,
      lin: "",
      initiallyOpened: openA,
      links: [
        { label: "Customer Accounts", link: "/customer" },
        { label: "Rider Accounts", link: "/rider" },
      ],
    },
  ];

  function cl() {
    fn();
  }
  const modals = useModals();
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Sign Out",
      centered: true,
      children: <Text size="sm">Are you sure you want to sign out?</Text>,
      labels: { confirm: "Yes", cancel: "No" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => yes(),
    });

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} fn={cl} lin={item.lin} />
  ));

  return (
    <>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section pt="md" className={classes.footer}>
        <Button
          fullWidth
          leftIcon={<Logout size={18} />}
          variant="subtle"
          color="red"
          onClick={() => openDeleteModal()}
        >
          Sign Out
        </Button>
      </Navbar.Section>
    </>
  );
}
