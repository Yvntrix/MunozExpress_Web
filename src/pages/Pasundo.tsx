import { Title, Container, Tabs, Divider, Group } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  Check,
  Loader,
  CircleX,
  ClipboardText,
  Motorbike,
} from "tabler-icons-react";
import PasundoCancelled from "./PasundoComponent/PasundoCancelled";
import PasundoCompleted from "./PasundoComponent/PasundoCompleted";
import PasundoOngoing from "./PasundoComponent/PasundoOngoing";
import PasundoPlaced from "./PasundoComponent/PasundoPlaced";

function Pasundo() {
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
        <Motorbike /> <Title order={2}>Pasundo Transactions</Title>
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
          {<PasundoPlaced />}
        </Tabs.Tab>

        <Tabs.Tab
          label="Ongoing Orders"
          tabKey="Ongoing"
          icon={<Loader size={14} />}
        >
          {<PasundoOngoing />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Completed Orders"
          tabKey="Completed"
          icon={<Check size={14} />}
        >
          {<PasundoCompleted />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Cancelled Orders"
          tabKey="Cancelled"
          icon={<CircleX size={14} />}
        >
          {<PasundoCancelled />}
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}

export default Pasundo;
