import StartFirebase from "../firebase";
import { ref, onValue, onChildChanged } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  Title,
  Space,
  Container,
  Paper,
  Divider,
  Modal,
  Group,
  Text,
  ScrollArea,
  UnstyledButton,
  Center,
  ActionIcon,
} from "@mantine/core";
import NoRow from "../components/NoRow";
import LoaderComponent from "../components/LoaderComponent";
import {
  ArrowsSort,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Id,
  User,
} from "tabler-icons-react";
import UserDetails from "../components/UserDetails";
import {
  Row,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import _ from "lodash";
import { GlobalFilter } from "../components/GlobalFilter";

function Customer() {
  const db = StartFirebase();
  const [projects, setProject] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let row = 0;
  let finalProjects: any[] = [];
  useEffect(() => {
    const userRef = ref(db, "users/");
    onChildChanged(userRef, (data) => {
      row = 0;
      finalProjects = [];
      setProject(finalProjects);
      return onValue(
        ref(db, "users/"),
        (snapshot) => {
          const users = snapshot.val();

          Object.keys(users).forEach((e) => {
            finalProjects.push({
              id: e,
              name: users[e].FirstName + " " + users[e].LastName,
              firstName: users[e].FirstName,
              lastName: users[e].LastName,
              phone: users[e].Phone,
              email: users[e].Email,
            });
            row++;
          });

          if (row == 0) {
            setNoRow(true);
          }
          let sort = _.sortBy(finalProjects, ["firstName"]);
          setProject(sort);
          setTimeout(() => setLoader(true), 400);
        },
        {
          onlyOnce: true,
        }
      );
    });
    return onValue(
      ref(db, "users/"),
      (snapshot) => {
        const users = snapshot.val();
        if (users == null) {
          setNoRow(true);
        } else {
          Object.keys(users).forEach((e) => {
            finalProjects.push({
              id: e,
              name: users[e].FirstName + " " + users[e].LastName,
              firstName: users[e].FirstName,
              lastName: users[e].LastName,
              phone: users[e].Phone,
              email: users[e].Email,
            });
            row++;
          });
        }

        if (row == 0) {
          setNoRow(true);
        }

        let sort = _.sortBy(finalProjects, ["email"]);
        setProject(sort);
        setTimeout(() => setLoader(true), 400);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  // const rows = projects.map((user) => (
  //   <tr
  //     key={user.id}
  //     onClick={() => {
  //       setId(user.id);
  //       setOpened(true);
  //     }}
  //   >
  //     <td>{user.firstName + " " + user.lastName}</td>
  //     <td>{user.email}</td>
  //     <td>{user.phone}</td>
  //   </tr>
  // ));

  const COLUMNS = [
    {
      Header: "Customer Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = projects;

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

  const [opened, setOpened] = useState(false);
  const [id, setId] = useState("");
  return (
    <Container fluid>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Group spacing="xs">
            <Id color="red" />
            <Text weight={700}>Customer Details</Text>
          </Group>
        }
      >
        {<UserDetails id={id} />}
      </Modal>
      <Group>
        <User /> <Title order={2}>Customer Accounts</Title>
      </Group>
      <Space h="xs" />
      <Divider my="sm" variant="dashed" />
      <Container size="xs" px="xs">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </Container>
      <Paper radius="md" p="md" withBorder>
        {loader ? (
          noRow === true ? (
            <NoRow />
          ) : (
            <>
              <ScrollArea type="always" p="sm">
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
                    {page.map((row: Row<object>) => {
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
                    {pageIndex + 1} of {pageOptions.length}
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
    </Container>
  );
}

export default Customer;
