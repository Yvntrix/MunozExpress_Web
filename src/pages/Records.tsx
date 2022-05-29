import { Container, Divider, Group, Space, Tabs, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { CalendarStats, ClipboardCheck, Report } from "tabler-icons-react";
import DailyRecords from "./RecordsComponent/DailyRecords";
import MonthlyRecords from "./RecordsComponent/MonthlyRecords";

export default function Records() {
  const [activeTab, setActiveTab] = useLocalStorage({
    key: "tab",
    defaultValue: 0,
  });
  const onChange = (active: number) => {
    setActiveTab(active);
  };
  return (
    <>
      <Container fluid>
        <Group>
          <ClipboardCheck /> <Title order={2}>Completed Transactions</Title>
        </Group>
        <Space h="xs" />
        <Divider my="sm" variant="dashed" />
        <Tabs
          active={activeTab}
          onTabChange={onChange}
          grow
          position="apart"
          color="red"
        >
          <Tabs.Tab label="Monthly Records" icon={<CalendarStats size={14} />}>
            <MonthlyRecords />
          </Tabs.Tab>
          <Tabs.Tab label="Daily Records" icon={<Report size={14} />}>
            <DailyRecords />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
