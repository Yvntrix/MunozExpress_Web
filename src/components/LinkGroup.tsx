import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  Icon as TablerIcon,
  ChevronLeft,
  ChevronRight,
} from "tabler-icons-react";
import { Link } from "react-router-dom";
const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  controlA: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[9], 0.25)
        : theme.colors.red[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.red[7],
    fontSize: theme.fontSizes.sm,
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
  active: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[9], 0.25)
        : theme.colors.red[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.red[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  lin: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  fn: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  lin,
  initiallyOpened,
  links,
  fn,
}: LinksGroupProps) {
  const { pathname } = useLocation();
  const { classes, theme } = useStyles();

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;

  const items = (hasLinks ? links : []).map((link) => (
    <Text<typeof Link>
      className={pathname === link.link ? classes.active : classes.link}
      component={Link}
      to={link.link}
      key={link.label}
      onClick={fn}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => {
          setOpened((o) => !o);
          if (lin !== "") {
            fn();
          }
        }}
        className={pathname === lin ? classes.controlA : classes.control}
        component={Link}
        to={lin === "" ? pathname : lin}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" color="red">
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
