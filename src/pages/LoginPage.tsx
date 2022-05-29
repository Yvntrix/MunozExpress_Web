import {
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { X } from "tabler-icons-react";

type func = {
  fn: () => void;
};
export function AuthenticationTitle({ fn }: func) {
  const [loading, setLoading] = useState(false);
  function call(user: string, pass: string) {
    setLoading(true);
    if (user == "adminxpress" && pass == "adminadmin") {
      setTimeout(() => {
        setLoading(false);
        fn();
      }, 600);
    } else {
      setTimeout(() => {
        showNotification({
          title: "Error",
          message: "Wrong Username or Password",
          color: "red",
          icon: <X />,
        });
        form.reset();
        setLoading(false);
      }, 600);
    }
  }

  const form = useForm({
    initialValues: {
      username: "",
      pass: "",
    },

    validate: {},
  });
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Muñoz Express Admin
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) =>
            call(values.username, values.pass)
          )}
        >
          <TextInput
            label="Username"
            placeholder="Your username"
            radius="md"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("pass")}
          />

          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
