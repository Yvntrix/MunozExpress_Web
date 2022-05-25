import { ActionIcon, Container, Divider, Group, Text } from "@mantine/core";
import { onChildChanged, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Certificate, Id, Notebook, Phone, Send } from "tabler-icons-react";
import StartFirebase from "../firebase";

export default function RiderDetails(id: any) {
  let completed: any[] = [];
  const [completeds, setCompleteds] = useState<any[]>([]);
  const db = StartFirebase();

  useEffect(() => {
    const detailRef = ref(db, "riders/" + id.id);
    onChildChanged(detailRef, (data) => {
      completed = [];
      setCompleteds(completed);
      return onValue(
        ref(db, "riders/" + id.id),
        (snapshot) => {
          const detail = snapshot.val();
          completed.push({
            firstName: detail.FirstName,
            lastName: detail.LastName,
            phone: detail.Phone,
            email: detail.Email,
          });

          setCompleteds(completed);
        },
        {
          onlyOnce: true,
        }
      );
    });

    return onValue(
      ref(db, "riders/" + id.id),
      (snapshot) => {
        const detail = snapshot.val();

        completed.push({
          firstName: detail.FirstName,
          lastName: detail.LastName,
          phone: detail.Phone,
          email: detail.Email,
        });
        setCompleteds(completed);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  let call = "tel:";

  return (
    <>
      {completeds.map(function (d) {
        return (
          <Container fluid key={d}>
            <Divider my="sm" />
            <Text weight={700}>
              <Group spacing="xs">
                <Certificate color="red" />
                First Name
              </Group>
            </Text>
            <Text>{d.firstName}</Text>
            <Divider my="sm" variant="dashed" />
            <Text weight={700}>
              <Group spacing="xs">
                <Notebook color="red" />
                Last Name
              </Group>
            </Text>
            <Text>{d.lastName}</Text>
            <Divider my="sm" variant="dashed" />
            <Text weight={700}>
              <Group spacing="xs">
                <ActionIcon
                  target="_blank"
                  component="a"
                  href={call + d.phone}
                  color="red"
                  variant="outline"
                >
                  <Phone size={20} />
                </ActionIcon>
                Phone Number
              </Group>
            </Text>
            <Text>{d.phone}</Text>
            <Divider my="sm" variant="dashed" />
            <Text weight={700}>
              <Group spacing="xs">
                <ActionIcon
                  onClick={(e: any) => {
                    window.open("mailto:" + d.email, "Mail");
                    e.preventDefault();
                  }}
                  color="red"
                  variant="outline"
                >
                  <Send size={20} />
                </ActionIcon>
                Email
              </Group>
            </Text>
            <Text>{d.email}</Text> <Divider my="sm" variant="dashed" />
          </Container>
        );
      })}
    </>
  );
}
