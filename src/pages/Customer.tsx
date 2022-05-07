import StartFirebase from "../firebase";
import { ref, onValue, onChildChanged } from "firebase/database";
import { useEffect, useState } from "react";
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
} from "@mantine/core";
import NoRow from "../components/NoRow";
import LoaderComponent from "../components/LoaderComponent";
import { Id } from "tabler-icons-react";
import UserDetails from "../components/UserDetails";

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

          setProject(finalProjects);
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

        setProject(finalProjects);
        setTimeout(() => setLoader(true), 400);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const rows = projects.map((user) => (
    <tr
      key={user.id}
      onClick={() => {
        setId(user.id);
        setOpened(true);
      }}
    >
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  ));
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
      <Title order={2}>Customer Accounts</Title>
      <Space h="xs" />
      <Divider my="sm" variant="dashed" />
      <Paper radius="md" p="md" withBorder>
        {loader ? (
          noRow === true ? (
            <NoRow />
          ) : (
            <ScrollArea type="always">
              <Table sx={{ minWidth: 500 }} highlightOnHover striped>
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          )
        ) : (
          <LoaderComponent />
        )}
      </Paper>
    </Container>
  );
}

export default Customer;
