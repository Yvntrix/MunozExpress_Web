import StartFirebase from "../../firebase";
import { ref, onValue, onChildChanged } from "firebase/database";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import {
  Basket,
  BuildingStore,
  Certificate,
  Id,
  ListDetails,
  Map,
  MapPin,
  Notes,
  Phone,
  RoadSign,
  Tag,
  User,
} from "tabler-icons-react";
import ApproveButton from "../../components/ApproveButton";

function PabiliDetails(id: any) {
  let completed: any[] = [];
  const [completeds, setCompleteds] = useState<any[]>([]);
  const db = StartFirebase();
  useEffect(() => {
    const detailRef = ref(db, "Transactions/Pabili");

    onChildChanged(detailRef, (data) => {
      completed = [];
      setCompleteds(completed);
      return onValue(
        ref(db, "Transactions/Pabili"),
        (snapshot) => {
          const detail = snapshot.val();
          for (let i in detail) {
            if (detail[i].TransactionId === id.id) {
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
      ref(db, "Transactions/Pabili"),
      (snapshot) => {
        const detail = snapshot.val();
        for (let i in detail) {
          if (detail[i].TransactionId === id.id) {
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
  return (
    <>
      {completeds.map(function (d) {
        return (
          <Container fluid key={d.TransactionId}>
            <Divider my="sm" />
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
                      <BuildingStore color="red" />
                      Store Name
                    </Group>
                  </Text>
                  <Text>{d.StoreName}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Basket color="red" />
                      Item Purchase
                    </Group>
                  </Text>
                  <Text>{d.Items}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Tag color="red" />
                      Estimated Price
                    </Group>
                  </Text>
                  <Text>₱{d.EstPrice}</Text>
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
                        href={search + d.CustomerLocation}
                        color="red"
                        variant="outline"
                      >
                        <RoadSign size={20} />
                      </ActionIcon>
                      Store Location
                    </Group>
                  </Text>
                  <Text>{d.StoreLocation}</Text>
                  <Divider my="sm" variant="dashed" />

                  <Text weight={700}>
                    <Group spacing="xs">
                      <Map color="red" />
                      Landmark
                    </Group>
                  </Text>
                  <Text>{d.StoreLandmark}</Text>
                  <Divider my="sm" variant="dashed" />
                </Paper>
              </Grid.Col>

              <Grid.Col md={1} lg={1}>
                <Paper p="lg">
                  <Text weight={700}>
                    <Group spacing="xs">
                      <User color="red" />
                      Customer Details
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
                        href={search + d.CustomerLocation}
                        color="red"
                        variant="outline"
                      >
                        <RoadSign size={20} />
                      </ActionIcon>
                      Customer Location
                    </Group>
                  </Text>
                  <Text>{d.CustomerLocation}</Text>{" "}
                  <Divider my="sm" variant="dashed" />
                  <Text weight={700}>
                    <Group spacing="xs">
                      <Map color="red" />
                      Landmark
                    </Group>
                  </Text>
                  <Text>{d.Landmark}</Text>
                  <Divider my="sm" variant="dashed" />
                </Paper>
              </Grid.Col>
            </Grid>
            {d.Completed === 0 &&
            d.Ongoing === 0 &&
            d.Cancelled === 0 &&
            d.Ongoing === 0 ? (
              <ApproveButton id={d.TransactionId} transaction={d.ServiceType} />
            ) : (
              ""
            )}
          </Container>
        );
      })}
    </>
  );
}

export default PabiliDetails;
