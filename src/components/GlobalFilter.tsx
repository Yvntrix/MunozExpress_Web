import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";

export const GlobalFilter = ({ filter, setFilter , not }: any) => {
  return (
    <>
      <TextInput
        m="sm"
        disabled={not}
        value={filter || ""}
        onChange={(e) => setFilter(e.currentTarget.value)}
        placeholder="Search"
        icon={<Search size={14} />}
      />
    </>
  );
};
