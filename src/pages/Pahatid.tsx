import { Container, Divider, Group, Tabs, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  Check,
  CircleX,
  ClipboardText,
  Loader,
  TruckDelivery,
} from "tabler-icons-react";
import PahatidCancelled from "./PahatidComponent/PahatidCancelled";
import PahatidCompleted from "./PahatidComponent/PahatidCompleted";
import PahatidOngoing from "./PahatidComponent/PahatidOngoing";
import PahatidPlaced from "./PahatidComponent/PahatidPlaced";

function Pahatid() {
  const [activeTab, setActiveTab] = useLocalStorage({
    key: "tab",
    defaultValue: 0,
  });
  const onChange = (active: number) => {
    setActiveTab(active);
  };
  return (
    <Container fluid>
      <Group>
        <TruckDelivery /> <Title order={2}>Pahatid Transactions</Title>
      </Group>
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
          {<PahatidPlaced />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Ongoing Orders"
          tabKey="Ongoing"
          icon={<Loader size={14} />}
        >
          {<PahatidOngoing />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Completed Orders"
          tabKey="Completed"
          icon={<Check size={14} />}
        >
          {<PahatidCompleted />}
        </Tabs.Tab>

        <Tabs.Tab
          label="Cancelled Orders"
          tabKey="Cancelled"
          icon={<CircleX size={14} />}
        >
          {<PahatidCancelled />}
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}

export default Pahatid;
