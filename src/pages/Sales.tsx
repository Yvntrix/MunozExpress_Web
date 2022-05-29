import { Container, Divider, Group, Space, Tabs, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { CalendarStats, Report, ReportMoney, User } from "tabler-icons-react";
import DailyRecords from "./RecordsComponent/DailyRecords";
import MonthlyRecords from "./RecordsComponent/MonthlyRecords";
import DailySalary from "./SalesComponent/DailySalary";
import MonthlySalary from "./SalesComponent/MonthlySalary";

export default function Sales() {
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
          <ReportMoney /> <Title order={2}>Rider Salary</Title>
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
          <Tabs.Tab label="Monthly" icon={<CalendarStats size={14} />}>
            <MonthlySalary />
          </Tabs.Tab>
          <Tabs.Tab label="Daily" icon={<Report size={14} />}>
            <DailySalary />
          </Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
}
