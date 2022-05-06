import {
  ActionIcon,
  Container,
  Divider,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Space,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { onChildChanged, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Plus, UserPlus } from "tabler-icons-react";
import AddRider from "../components/AddRider";
import LoaderComponent from "../components/LoaderComponent";
import NoRow from "../components/NoRow";
import StartFirebase from "../firebase";

export default function Rider() {
  const db = StartFirebase();
  const [projects, setProject] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let row = 0;
  let finalProjects: any[] = [];
  useEffect(() => {
    const userRef = ref(db, "riders/");
    onChildChanged(userRef, (data) => {
      row = 0;
      finalProjects = [];
      setProject(finalProjects);
      return onValue(
        ref(db, "riders/"),
        (snapshot) => {
          const riders = snapshot.val();
          for (let rider in riders) {
            finalProjects.push({
              firstName: riders[rider].FirstName,
              lastName: riders[rider].LastName,
              phone: riders[rider].Phone,
              email: riders[rider].Email,
            });
            row++;
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
    });
    return onValue(
      ref(db, "riders/"),
      (snapshot) => {
        const riders = snapshot.val();
        for (let rider in riders) {
          finalProjects.push({
            firstName: riders[rider].FirstName,
            lastName: riders[rider].LastName,
            phone: riders[rider].Phone,
            email: riders[rider].Email,
          });
          row++;
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

  const [open, setOpen] = useState(false);
  const rows = projects.map((rider) => (
    <tr key={rider.phone}>
      <td>{rider.firstName + " " + rider.lastName}</td>
      <td>{rider.email}</td>
      <td>{rider.phone}</td>
    </tr>
  ));
  function call() {
    setOpen(false);
  }
  return (
    <Container fluid>
      <AddRider open={open} fn={call} />
      <Title order={2}>
        <Group spacing="xs" position="apart">
          Rider Accounts
          <ActionIcon
            variant="outline"
            color="red"
            onClick={() => setOpen(true)}
          >
            <Plus size={16} />
          </ActionIcon>
        </Group>
      </Title>
      <Space h="xs" />
      <Divider my="sm" variant="dashed" />
      <Paper radius="md" p="md" withBorder>
        {loader ? (
          noRow === true ? (
            <NoRow />
          ) : (
            <ScrollArea type="always">
              <Table highlightOnHover striped sx={{ minWidth: 500 }}>
                <thead>
                  <tr>
                    <th>Rider Name</th>
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
