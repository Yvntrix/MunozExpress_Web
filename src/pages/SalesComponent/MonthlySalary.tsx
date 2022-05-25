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
import { isSameMonth } from "@mantine/dates";
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
  Cash,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  TableExport,
} from "tabler-icons-react";
import * as XLSX from "xlsx";
import { GlobalFilter } from "../../components/GlobalFilter";
import LoaderComponent from "../../components/LoaderComponent";
import NoRow from "../../components/NoRow";
import StartFirebase from "../../firebase";
export default function MonthlySalary() {
  const db = StartFirebase();
  const [completeds, setCompleteds] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let completed: any[] = [];
  let row = 0;
  const [total, setTotal] = useState(0);
  let salary = 0;
  let tot = 0;
  let sort;
  useEffect(() => {
    onValue(ref(db, "riders-id"), (snapshot) => {
      const riders = snapshot.val();
      for (let rider in riders) {
        onValue(ref(db, "riders/" + riders[rider].Phone), (snapshot) => {
          const ridersId = snapshot.val();
          onValue(ref(db, "Transactions"), (snap) => {
            const transactions = snap.val();
            for (let i in transactions) {
              if (i == "Pabili") {
                for (let j in transactions[i]) {
                  if (
                    isSameMonth(
                      new Date(dayjs().format()),
                      new Date(
                        dayjs(transactions[i][j].TimeCompleted).format(
                          "YYYY-MM-DD"
                        )
                      )
                    )
                  ) {
                    if (transactions[i][j].Completed == 1) {
                      if (transactions[i][j].AssignedTo == riders[rider].Uid) {
                        salary += transactions[i][j].ServiceFee;
                        setTotal((tot += transactions[i][j].ServiceFee));
                      }
                    }
                  }
                }
              }
              if (i == "Pahatid") {
                for (let j in transactions[i]) {
                  if (
                    isSameMonth(
                      new Date(dayjs().format()),
                      new Date(
                        dayjs(transactions[i][j].TimeCompleted).format(
                          "YYYY-MM-DD"
                        )
                      )
                    )
                  ) {
                    if (transactions[i][j].Completed == 1) {
                      if (transactions[i][j].AssignedTo == riders[rider].Uid) {
                        salary += transactions[i][j].TotalCost;
                        setTotal((tot += transactions[i][j].TotalCost));
                      }
                    }
                  }
                }
              }
              if (i == "Pakuha") {
                for (let j in transactions[i]) {
                  if (
                    isSameMonth(
                      new Date(dayjs().format()),
                      new Date(
                        dayjs(transactions[i][j].TimeCompleted).format(
                          "YYYY-MM-DD"
                        )
                      )
                    )
                  ) {
                    if (transactions[i][j].Completed == 1) {
                      if (transactions[i][j].AssignedTo == riders[rider].Uid) {
                        salary += transactions[i][j].TotalCost;
                        setTotal((tot += transactions[i][j].TotalCost));
                      }
                    }
                  }
                }
              }
              if (i == "Pasundo") {
                for (let j in transactions[i]) {
                  if (
                    isSameMonth(
                      new Date(dayjs().format()),
                      new Date(
                        dayjs(transactions[i][j].TimeCompleted).format(
                          "YYYY-MM-DD"
                        )
                      )
                    )
                  ) {
                    if (transactions[i][j].Completed == 1) {
                      if (transactions[i][j].AssignedTo == riders[rider].Uid) {
                        salary += transactions[i][j].TotalCost;
                        setTotal((tot += transactions[i][j].TotalCost));
                      }
                    }
                  }
                }
              }
            }
            completed.push({
              id: riders[rider].Uid,
              name: ridersId.FirstName + " " + ridersId.LastName,
              phone: riders[rider].Phone,
              email: riders[rider].Email,
              salary: salary / 2,
            });

            salary = 0;
            sort = _.orderBy(completed, ["salary"], ["desc"]);
            setCompleteds(sort);
          });
        });
        row += 1;
      }
      if (row == 0) {
        setNoRow(true);
      }

      setTimeout(() => setLoader(true), 400);
    });
  }, []);

  const COLUMNS = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Total Salary",
      accessor: "salary",
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
    // @ts-expect-error setGLobalFilter is not in type def
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

  // @ts-expect-error setGLobalFilter is not in type def
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

    XLSX.writeFile(wb, dayjs().format("MM/YYYY") + "_Salary.xlsx");
  }
  return (
    <>
      <Grid justify="center" m="sm">
        <Grid.Col md={6} lg={3}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed">
                Rider's Salary
              </Text>
              <ClipboardCheck size={22} />
            </Group>
            <Group position="center" spacing="xs" p="sm">
              <Text weight={700}>{"PHP " + total / 2 + ".00"}</Text>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col md={6} lg={3}>
          <Paper withBorder p="md" radius="md">
            <Group position="apart">
              <Text size="xs" color="dimmed">
                Total Revenue
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
                  sx={{ minWidth: 900 }}
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
