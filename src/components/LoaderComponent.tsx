import { Group, Loader, Stack } from "@mantine/core";

export default function () {
  return (
    <Group grow>
      <Stack align="center" spacing="xs">
        <Loader size="lg" color="red" variant="dots" />
      </Stack>
    </Group>
  );
}
