import {
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Space,
  Table,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { onValue, ref } from "firebase/database";
import _ from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { ArrowsSort, Cash, ChevronDown, ChevronUp } from "tabler-icons-react";
import { GlobalFilter } from "../components/GlobalFilter";
import LoaderComponent from "../components/LoaderComponent";
import NoRow from "../components/NoRow";
import StartFirebase from "../firebase";

export default function Records() {
  const db = StartFirebase();
  const [completeds, setCompleteds] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let completed: any[] = [];
  let row = 0;
  const [total, setTotal] = useState(0);
  let tot = 0;
  useEffect(() => {
    onValue(
      ref(db, "Transactions/"),
      (snapshot) => {
        const transactions = snapshot.val();
        for (let i in transactions) {
          if (i == "Pabili") {
            for (let s in transactions[i]) {
              if (transactions[i][s].Completed == 1) {
                completed.push({
                  id: transactions[i][s].TransactionId,
                  name: transactions[i][s].CustomerName,
                  service: transactions[i][s].ServiceType,
                  total: transactions[i][s].TotalCost,
                  completed: moment(transactions[i][s].TimeCompleted).format(
                    "MMM d yyyy, hh:mm A"
                  ),
                });
                console.log();
                setTotal((tot += transactions[i][s].TotalCost));
              }
              row += 1;
            }
          }
          if (i == "Pahatid") {
            for (let s in transactions[i]) {
              if (transactions[i][s].Completed == 1) {
                completed.push({
                  id: transactions[i][s].TransactionId,
                  name: transactions[i][s].CustomerName,
                  service: transactions[i][s].ServiceType,
                  total: transactions[i][s].TotalCost,
                  completed: transactions[i][s].TimeCompleted,
                });
                setTotal((tot += transactions[i][s].TotalCost));
              }
              row += 1;
            }
          }
          if (i == "Pakuha") {
            for (let s in transactions[i]) {
              if (transactions[i][s].Completed == 1) {
                completed.push({
                  id: transactions[i][s].TransactionId,
                  name: transactions[i][s].CustomerName,
                  service: transactions[i][s].ServiceType,
                  total: transactions[i][s].TotalCost,
                  completed: transactions[i][s].TimeCompleted,
                });
                setTotal((tot += transactions[i][s].TotalCost));
              }
              row += 1;
            }
          }
          if (i == "Pasundo") {
            for (let s in transactions[i]) {
              if (transactions[i][s].Completed == 1) {
                completed.push({
                  id: transactions[i][s].TransactionId,
                  name: transactions[i][s].CustomerName,
                  service: transactions[i][s].ServiceType,
                  total: transactions[i][s].TotalCost,
                  completed: transactions[i][s].TimeCompleted,
                });
                setTotal((tot += transactions[i][s].TotalCost));
              }
              row += 1;
            }
          }
        }
        if (row == 0) {
          setNoRow(true);
        }
        let sort = _.sortBy(completed, ["id"]);
        setCompleteds(sort);
        setTimeout(() => setLoader(true), 400);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const COLUMNS = [
    {
      Header: "Transaction ID",
      accessor: "id",
    },
    {
      Header: "Customer Name",
      accessor: "name",
    },
    {
      Header: "Service Type",
      accessor: "service",
    },
    {
      Header: "Time Completed",
      accessor: "completed",
    },
    {
      Header: "Total Cost",
      accessor: "total",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = completeds;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // @ts-expect-error setGLobalFilter is not in type def
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy
  );
  // @ts-expect-error setGLobalFilter is not in type def
  const { globalFilter } = state;
  return (
    <>
      <Container fluid>
        <Title order={2}>Records</Title>
        <Space h="xs" />
        <Divider my="sm" variant="dashed" />
        <Grid justify="center" m="sm">
          <Grid.Col md={6} lg={3}>
            <Paper withBorder p="md" radius="md">
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  Total Sales
                </Text>
                <Cash size={22} />
              </Group>
              <Group position="center" spacing="xs" p="sm">
                <Text weight={700}>{"PHP " + total + ".00"}</Text>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper withBorder p="md" radius="md">
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  Total Sales
                </Text>
                <Cash size={22} />
              </Group>
              <Group position="center" spacing="xs" p="sm">
                <Text weight={700}>{"PHP " + total + ".00"}</Text>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper withBorder p="md" radius="md">
              <Group position="apart">
                <Text size="xs" color="dimmed">
                  Total Sales
                </Text>
                <Cash size={22} />
              </Group>
              <Group position="center" spacing="xs" p="sm">
                <Text weight={700}>{"PHP " + total + ".00"}</Text>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Paper radius="md" p="md" withBorder>
          {loader ? (
            noRow === true ? (
              <NoRow />
            ) : (
              <ScrollArea type="always">
                <Table
                  sx={{ minWidth: 500 }}
                  highlightOnHover
                  striped
                  {...getTableProps()}
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              // @ts-expect-error getSortByToggleProps is not in type def
                              column.getSortByToggleProps()
                            )}
                          >
                            {" "}
                            <UnstyledButton>
                              <Group>
                                <Group position="apart">
                                  <Text weight={500} size="sm">
                                    {column.render("Header")}
                                  </Text>
                                  <Center>
                                    <span>
                                      {
                                        // @ts-expect-error isSorted is not in type def
                                        column.isSorted ? (
                                          // @ts-expect-error isSortedDesc is not in type def
                                          column.isSortedDesc ? (
                                            <ChevronUp size={14} />
                                          ) : (
                                            <ChevronDown size={14} />
                                          )
                                        ) : (
                                          <ArrowsSort size={14} />
                                        )
                                      }
                                    </span>
                                  </Center>
                                </Group>
                              </Group>
                            </UnstyledButton>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </ScrollArea>
            )
          ) : (
            <LoaderComponent />
          )}
        </Paper>
      </Container>
    </>
  );
}
