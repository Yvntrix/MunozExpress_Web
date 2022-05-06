import { Divider, Box } from "@mantine/core";
import { Search } from "tabler-icons-react";

export default function NoRow() {
  return (
    <>
      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <Search size={12} />
            <Box ml={5}>No Data</Box>
          </>
        }
      />
    </>
  );
}
