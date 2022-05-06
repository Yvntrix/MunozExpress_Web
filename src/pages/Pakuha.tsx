import { Container, Divider, Tabs, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Check, CircleX, ClipboardText, Loader } from "tabler-icons-react";
import PakuhaCancelled from "./PakuhaComponent/PakuhaCancelled";
import PakuhaCompleted from "./PakuhaComponent/PakuhaCompleted";
import PakuhaOngoing from "./PakuhaComponent/PakuhaOngoing";
import PakuhaPlaced from "./PakuhaComponent/PakuhaPlaced";

function Pakuha() {
  const [activeTab, setActiveTab] = useLocalStorage({
    key: "tab",
    defaultValue: 0,
  });
  const onChange = (active: number) => {
    setActiveTab(active);
  };
  return (
    <Container fluid>
      <Title order={2}>Pakuha Transactions</Title>
      <Divider my="sm" variant="dashed" />
      <Tabs
        active={activeTab}
        onTabChange={onChange}
        grow
        position="apart"
        color="red"
      >
        <Tabs.Tab
          label="Placed Orders"
          tabKey="Placed"
          icon={<ClipboardText size={14} />}
        >
          {<PakuhaPlaced />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Completed Orders"
          tabKey="Completed"
          icon={<Check size={14} />}
        >
          {<PakuhaCompleted />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Ongoing Orders"
          tabKey="Ongoing"
          icon={<Loader size={14} />}
        >
          {<PakuhaOngoing />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Cancelled Orders"
          tabKey="Cancelled"
          icon={<CircleX size={14} />}
        >
          {<PakuhaCancelled />}
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}

export default Pakuha;
