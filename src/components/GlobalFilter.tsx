import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";

export const GlobalFilter = ({ filter, setFilter }: any) => {
  return (
    <>
      <TextInput
        m="sm"
        value={filter || ""}
        onChange={(e) => setFilter(e.currentTarget.value)}
        placeholder="Search"
        icon={<Search size={14} />}
      />
    </>
  );
};
