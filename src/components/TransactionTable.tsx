import {
  Center,
  Container,
  Group,
  Paper,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useMemo, useState } from "react";
import ModalTransactions from "./ModalTransaction";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { ArrowsSort, ChevronDown, ChevronUp } from "tabler-icons-react";
import { GlobalFilter } from "./GlobalFilter";

export default function TransactionTable({ row, type }: any) {
  const [opened, setOpened] = useState(false);
  const [id, setId] = useState("");
  function call() {
    setOpened(false);
  }

  // const rows = row.map((transaction: any) => (
  //   <tr
  //     key={transaction.id}
  //     onClick={() => {
  //       setId(transaction.id);
  //       setOpened(true);
  //     }}
  //   >
  //     <td>{transaction.id}</td>
  //     <td>{transaction.name}</td>
  //     <td>+63{transaction.phone}</td>
  //   </tr>
  // ));

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
      Header: "Phone",
      accessor: "phone",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = row;
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

  // @ts-expect-error
  const { globalFilter } = state;

  return (
    <>
      <ModalTransactions type={type} id={id} open={opened} fn={call} />
      <Container size="xs" px="xs">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Container>
      <Paper radius="md" p="md" withBorder>
        <ScrollArea type="always">
          <Table
            highlightOnHover
            striped
            horizontalSpacing="md"
            sx={{ minWidth: 450 }}
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
                  <tr
                    {...row.getRowProps()}
                    onClick={() => {
                      // @ts-expect-error
                      setId(row.original.id);
                      setOpened(true);
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </>
  );
}
