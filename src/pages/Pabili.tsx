import { Container, Divider, Tabs, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Check, CircleX, ClipboardText, Loader } from "tabler-icons-react";
import PabiliCancelled from "./PabiliComponent/PabiliCancelled";
import PabiliCompleted from "./PabiliComponent/PabiliCompleted";
import PabiliOngoing from "./PabiliComponent/PabiliOngoing";
import PabiliPlaced from "./PabiliComponent/PabiliPlaced";

function Pabili() {
  const [activeTab, setActiveTab] = useLocalStorage({
    key: "tab",
    defaultValue: 0,
  });
  const onChange = (active: number) => {
    setActiveTab(active);
  };
  return (
    <Container fluid>
      <Title order={2}>Pabili Transactions</Title>
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
          {<PabiliPlaced />}
        </Tabs.Tab>

        <Tabs.Tab
          label="Ongoing Orders"
          tabKey="Ongoing"
          icon={<Loader size={14} />}
        >
          {<PabiliOngoing />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Completed Orders"
          tabKey="Completed"
          icon={<Check size={14} />}
        >
          {<PabiliCompleted />}
        </Tabs.Tab>
        <Tabs.Tab
          label="Cancelled Orders"
          tabKey="Cancelled"
          icon={<CircleX size={14} />}
        >
          {<PabiliCancelled />}
        </Tabs.Tab>
      </Tabs>
    </Container>
  );
}

export default Pabili;
