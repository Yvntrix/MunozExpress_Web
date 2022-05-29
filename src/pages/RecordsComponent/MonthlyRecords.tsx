import {
  ActionIcon,
  Center,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Table,
  Text,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker, isSameMonth } from "@mantine/dates";
import dayjs from "dayjs";
import { onValue, ref } from "firebase/database";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import {
  Row,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  ArrowsSort,
  Calendar,
  Cash,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  ClipboardList,
  Refresh,
  TableExport,
} from "tabler-icons-react";
import * as XLSX from "xlsx";
import { GlobalFilter } from "../../components/GlobalFilter";
import LoaderComponent from "../../components/LoaderComponent";
import ModalTransactions from "../../components/ModalTransaction";
import NoRow from "../../components/NoRow";
import StartFirebase from "../../firebase";
export default function MonthlyRecords() {
  const db = StartFirebase();
  const [completeds, setCompleteds] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [complete, setComplete] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    let tot = 0;
    let comtot = 0;
    let order = 0;
    let sort;
    let row = 0;
    let completed: any[] = [];
    setTotal(0);
    setComplete(0);
    setOrders(0);
    setNoRow(false);
    setLoader(false);
    onValue(
      ref(db, "Transactions"),
      (snapshot) => {
        const transactions = snapshot.val();
        for (let i in transactions) {
          if (i == "Pabili") {
            for (let s in transactions[i]) {
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimePlaced).format("YYYY-MM-DD")
                  )
                )
              ) {
                setOrders((order += 1));
              }

              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimeCompleted).format("YYYY-MM-DD")
                  )
                )
              ) {
                if (transactions[i][s].Completed == 1) {
                  onValue(
                    ref(db, "riders-id/" + transactions[i][s].AssignedTo),
                    (snapshot) => {
                      onValue(
                        ref(db, "riders/" + snapshot.val().Phone),
                        (snapshot) => {
                          completed.push({
                            id: transactions[i][s].TransactionId,
                            name: transactions[i][s].CustomerName,
                            service: transactions[i][s].ServiceType,
                            total: transactions[i][s].ServiceFee,
                            type: transactions[i][s].ServiceType,
                            rider:
                              snapshot.val().FirstName +
                              " " +
                              snapshot.val().LastName,
                            completed: dayjs(
                              transactions[i][s].TimeCompleted
                            ).format("MMM DD YYYY, hh:mm A"),
                          });
                          setTotal((tot += transactions[i][s].ServiceFee));
                          setComplete((comtot += 1));
                          sort = _.sortBy(completed, ["completed"]);
                          setCompleteds(sort);
                        }
                      );
                    }
                  );
                }
              }
              row += 1;
            }
          }
          if (i == "Pahatid") {
            for (let s in transactions[i]) {
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimePlaced).format("YYYY-MM-DD")
                  )
                )
              ) {
                setOrders((order += 1));
              }
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimeCompleted).format("YYYY-MM-DD")
                  )
                )
              ) {
                if (transactions[i][s].Completed == 1) {
                  onValue(
                    ref(db, "riders-id/" + transactions[i][s].AssignedTo),
                    (snapshot) => {
                      onValue(
                        ref(db, "riders/" + snapshot.val().Phone),
                        (snapshot) => {
                          completed.push({
                            id: transactions[i][s].TransactionId,
                            name: transactions[i][s].CustomerName,
                            service: transactions[i][s].ServiceType,
                            total: transactions[i][s].TotalCost,
                            type: transactions[i][s].ServiceType,
                            rider:
                              snapshot.val().FirstName +
                              " " +
                              snapshot.val().LastName,
                            completed: dayjs(
                              transactions[i][s].TimeCompleted
                            ).format("MMM DD YYYY, hh:mm A"),
                          });
                          setTotal((tot += transactions[i][s].TotalCost));
                          setComplete((comtot += 1));
                          sort = _.sortBy(completed, ["completed"]);
                          setCompleteds(sort);
                        }
                      );
                    }
                  );
                }
              }
              row += 1;
            }
          }
          if (i == "Pakuha") {
            for (let s in transactions[i]) {
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimePlaced).format("YYYY-MM-DD")
                  )
                )
              ) {
                setOrders((order += 1));
              }
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimeCompleted).format("YYYY-MM-DD")
                  )
                )
              ) {
                if (transactions[i][s].Completed == 1) {
                  onValue(
                    ref(db, "riders-id/" + transactions[i][s].AssignedTo),
                    (snapshot) => {
                      onValue(
                        ref(db, "riders/" + snapshot.val().Phone),
                        (snapshot) => {
                          completed.push({
                            id: transactions[i][s].TransactionId,
                            name: transactions[i][s].CustomerName,
                            service: transactions[i][s].ServiceType,
                            total: transactions[i][s].TotalCost,
                            type: transactions[i][s].ServiceType,
                            rider:
                              snapshot.val().FirstName +
                              " " +
                              snapshot.val().LastName,
                            completed: dayjs(
                              transactions[i][s].TimeCompleted
                            ).format("MMM DD YYYY, hh:mm A"),
                          });
                          setTotal((tot += transactions[i][s].TotalCost));
                          setComplete((comtot += 1));
                          sort = _.sortBy(completed, ["completed"]);
                          setCompleteds(sort);
                        }
                      );
                    }
                  );
                }
              }
              row += 1;
            }
          }
          if (i == "Pasundo") {
            for (let s in transactions[i]) {
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimePlaced).format("YYYY-MM-DD")
                  )
                )
              ) {
                setOrders((order += 1));
              }
              if (
                isSameMonth(
                  new Date(dayjs().format()),
                  new Date(
                    dayjs(transactions[i][s].TimeCompleted).format("YYYY-MM-DD")
                  )
                )
              ) {
                if (transactions[i][s].Completed == 1) {
                  onValue(
                    ref(db, "riders-id/" + transactions[i][s].AssignedTo),
                    (snapshot) => {
                      onValue(
                        ref(db, "riders/" + snapshot.val().Phone),
                        (snapshot) => {
                          completed.push({
                            id: transactions[i][s].TransactionId,
                            name: transactions[i][s].CustomerName,
                            service: transactions[i][s].ServiceType,
                            total: transactions[i][s].TotalCost,
                            type: transactions[i][s].ServiceType,
                            rider:
                              snapshot.val().FirstName +
                              " " +
                              snapshot.val().LastName,
                            completed: dayjs(
                              transactions[i][s].TimeCompleted
                            ).format("MMM DD YYYY, hh:mm A"),
                          });
                          setTotal((tot += transactions[i][s].TotalCost));
                          setComplete((comtot += 1));
                          sort = _.sortBy(completed, ["completed"]);
                          setCompleteds(sort);
                        }
                      );
                    }
                  );
                }
              }
              row += 1;
            }
          }
        }
        if (row == 0) {
          setNoRow(true);
        }

        setTimeout(() => setLoader(true), 400);
      },
      {
        onlyOnce: true,
      }
    );
  }

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
      Header: "Rider",
      accessor: "rider",
    },
    {
      Header: "Time Completed",
      accessor: "completed",
    },
    {
      Header: "Service Fee",
      accessor: "total",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = completeds;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-expect-error
    page,
    // @ts-expect-error
    nextPage,
    // @ts-expect-error
    previousPage,
    // @ts-expect-error
    canNextPage,
    // @ts-expect-error
    canPreviousPage,
    // @ts-expect-error
    pageOptions,
    prepareRow,
    // @ts-expect-error
    setPageSize,
    state,
    // @ts-expect-error
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // @ts-expect-error
  const { globalFilter } = state;
  // @ts-expect-error
  const { pageIndex, pageSize } = state;
  function call() {
    setOpened(false);
  }
  const [opened, setOpened] = useState(false);
  const [id, setId] = useState("");
  const [stype, setStype] = useState("");

  function toExcel() {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(completeds);

    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

    XLSX.writeFile(wb, dayjs().format("MM/YYYY") + ".xlsx");
  }
  return (
    <>
      <ModalTransactions type={stype} id={id} open={opened} fn={call} />
      <Grid justify="center" m="sm">
        <Grid.Col md={6} lg={3}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed">
                Completed Orders
              </Text>
              <ClipboardCheck size={22} />
            </Group>
            <Group position="center" spacing="xs" p="sm">
              <Text weight={700}>{complete}</Text>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col md={6} lg={3}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed">
                Total Orders
              </Text>
              <ClipboardList size={22} />
            </Group>
            <Group position="center" spacing="xs" p="sm">
              <Text weight={700}>{orders}</Text>
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
      <Divider my="sm" variant="dashed" />
      <Group position="right" spacing="xs">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Tooltip
          label="Reload Data"
          withArrow
          placement="end"
          position="top"
          transition="pop-bottom-right"
          transitionDuration={300}
          transitionTimingFunction="ease"
        >
          <ActionIcon variant="outline" color="red" onClick={() => fetchData()}>
            <Refresh size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label="Export Data to Excel "
          withArrow
          placement="end"
          position="top"
          transition="pop-bottom-right"
          transitionDuration={300}
          transitionTimingFunction="ease"
        >
          <ActionIcon variant="outline" color="red" onClick={() => toExcel()}>
            <TableExport size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Paper radius="md" p="md" withBorder>
        {loader ? (
          noRow === true ? (
            <NoRow />
          ) : (
            <>
              <ScrollArea type="auto" p="sm">
                <Table
                  sx={{ minWidth: 950 }}
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
                    {page.map((row: Row<object>) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          onClick={() => {
                            // @ts-expect-error
                            setId(row.original.id);
                            // @ts-expect-error
                            setStype(row.original.service);
                            setOpened(true);
                            console.log(page);
                          }}
                        >
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

              <Group position="center">
                {" "}
                <span>
                  Page{" "}
                  <strong>
                    {pageOptions.length == 0 ? 0 : pageIndex + 1} of{" "}
                    {pageOptions.length}
                  </strong>
                </span>
                <ActionIcon
                  disabled={!canPreviousPage}
                  variant="transparent"
                  onClick={() => previousPage()}
                >
                  <ChevronLeft size={16} />
                </ActionIcon>
                <ActionIcon
                  disabled={!canNextPage}
                  variant="transparent"
                  onClick={() => nextPage()}
                >
                  <ChevronRight size={16} />
                </ActionIcon>
              </Group>
            </>
          )
        ) : (
          <LoaderComponent />
        )}
      </Paper>
    </>
  );
}
