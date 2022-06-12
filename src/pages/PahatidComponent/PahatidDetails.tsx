import StartFirebase from "../../firebase";
import { ref, onValue, onChildChanged, remove } from "firebase/database";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import {
  Basket,
  BuildingStore,
  Cash,
  Certificate,
  Id,
  ListDetails,
  Map,
  MapPin,
  Notes,
  Phone,
  RoadSign,
  Tag,
  Trash,
  User,
} from "tabler-icons-react";
import ApproveButton from "../../components/ApproveButton";
import UserDetails from "../../components/UserDetails";
type data = {
  id: any;
  fn: () => void;
};
export default function PahatidDetails({ id, fn }: data) {
  let completed: any[] = [];
  const [completeds, setCompleteds] = useState<any[]>([]);
  const db = StartFirebase();
  useEffect(() => {
    const detailRef = ref(db, "Transactions/Pahatid");

    onChildChanged(detailRef, (data) => {
      completed = [];
      setCompleteds(completed);
      return onValue(
        ref(db, "Transactions/Pahatid"),
        (snapshot) => {
          const detail = snapshot.val();
          for (let i in detail) {
            if (detail[i].TransactionId === id) {
              completed.push(detail[i]);
            }
          }
          setCompleteds(completed);
        },
        {
          onlyOnce: true,
        }
      );
    });
    return onValue(
      ref(db, "Transactions/Pahatid"),
      (snapshot) => {
        const detail = snapshot.val();
        for (let i in detail) {
          if (detail[i].TransactionId === id) {
            completed.push(detail[i]);
          }
        }
        setCompleteds(completed);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);
  let search = "https://www.google.com/maps/place/";
  function del() {
    fn();
  }
  const [opened, setOpened] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <>
      {completeds.map(function (d) {
        return (
          <Container fluid key={d.TransactionId}>
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
              {<UserDetails id={userId} />}
            </Modal>
            <Divider my="sm" />
            <Group position="center">
              <Text weight={700}>Status:</Text>
              {(() => {
                if (d.Ongoing === 0 && d.Completed === 0 && d.Cancelled === 0) {
                  return <Badge variant="filled">Placed</Badge>;
                }
                if (d.Ongoing === 1 && d.Completed === 0 && d.Cancelled === 0) {
                  return <Badge variant="filled">Ongoing</Badge>;
                }
                if (d.Ongoing === 0 && d.Completed === 1 && d.Cancelled === 0) {
                  return (
                    <Badge variant="filled" color="teal">
                      Completed
                    </Badge>
                  );
                }
                if (d.Ongoing === 0 && d.Completed === 0 && d.Cancelled === 1) {
                  return (
                    <Badge variant="filled" color="red">
                      Cancelled
                    </Badge>
                  );
                }
              })()}
            </Group>
            <Grid grow>
              <Grid.Col md={1}>
                <Paper p="lg">
                  <Text weight={700}>
                    <Group spacing="xs">
                      <ListDetails color="red" />
                      Transaction Details
                    </Group>
                  </Text>
                  <Divider my="md" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Id color="red" />
                      Transaction ID
                    </Group>
                  </Text>
                  <Text>{d.TransactionId}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Basket color="red" />
                      Item
                    </Group>
                  </Text>
                  <Text>{d.Item}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Cash color="red" />
                      Payment From
                    </Group>
                  </Text>
                  <Text>{d.PaymentFrom}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Notes color="red" />
                      Notes
                    </Group>
                  </Text>
                  <Text>{d.NoteRider}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <ActionIcon
                        target="_blank"
                        component="a"
                        href={search + d.DropOffLocation}
                        color="red"
                        variant="outline"
                      >
                        <RoadSign size={20} />
                      </ActionIcon>
                      Drop off Location
                    </Group>
                  </Text>
                  <Text>{d.DropOffLocation}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Map color="red" />
                      Landmark
                    </Group>
                  </Text>
                  <Text>{d.DropOffLandmark}</Text>
                  <Divider my="sm" variant="dashed" />
                </Paper>
              </Grid.Col>

              <Grid.Col md={1} lg={1}>
                <Paper p="lg">
                  <Text weight={700}>
                    <Group spacing="xs">
                      <User color="red" />
                      Customer Details
                      <Button
                        color="red"
                        size="xs"
                        onClick={() => {
                          setUserId(d.CustomerId);
                          setOpened(true);
                        }}
                      >
                        Check Profile
                      </Button>
                    </Group>
                  </Text>
                  <Divider my="md" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <Id color="red" />
                      Customer ID
                    </Group>
                  </Text>
                  <Text>{d.CustomerId}</Text>
                  <Divider my="sm" variant="dashed" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <Certificate color="red" />
                      Customer Name
                    </Group>
                  </Text>
                  <Text>{d.CustomerName}</Text>
                  <Divider my="sm" variant="dashed" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <Phone color="red" />
                      Phone Number
                    </Group>
                  </Text>
                  <Text>+63{d.CustomerNumber}</Text>
                  <Divider my="sm" variant="dashed" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <ActionIcon
                        target="_blank"
                        component="a"
                        href={search + d.PickUpLocation}
                        color="red"
                        variant="outline"
                      >
                        <RoadSign size={20} />
                      </ActionIcon>
                      Customer Location
                    </Group>
                  </Text>
                  <Text>{d.PickUpLocation}</Text>{" "}
                  <Divider my="sm" variant="dashed" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <Map color="red" />
                      Landmark
                    </Group>
                  </Text>
                  <Text>{d.PickUpLandmark}</Text>
                  <Divider my="sm" variant="dashed" />
                </Paper>
              </Grid.Col>
            </Grid>
            {d.Completed === 0 && d.Cancelled === 0 ? (
              <ApproveButton
                id={d.TransactionId}
                transaction={d.ServiceType}
                ongoing={d.Ongoing == 1 ? true : false}
              />
            ) : d.Cancelled === 1 ? (
              <Group grow position="right">
                <Button
                  color="red"
                  leftIcon={<Trash size={14} />}
                  onClick={() => {
                    del();
                    remove(ref(db, "Transactions/Pahatid/" + d.TransactionId));
                  }}
                >
                  Delete
                </Button>
              </Group>
            ) : (
              ""
            )}
          </Container>
        );
      })}
    </>
  );
}
