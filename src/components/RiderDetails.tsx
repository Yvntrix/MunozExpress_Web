import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { click } from "@testing-library/user-event/dist/click";
import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import {
  Certificate,
  CircleCheck,
  CircleX,
  Edit,
  Lock,
  Notebook,
  Phone,
  Send,
} from "tabler-icons-react";
import StartFirebase, { auth } from "../firebase";
type fc = {
  func: () => void;
  id: any;
};
export default function RiderDetails({ id, func }: fc) {
  let completed: any[] = [];
  const [completeds, setCompleteds] = useState<any[]>([]);
  const db = StartFirebase();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    completed = [];
    setCompleteds(completed);
    return onValue(
      ref(db, "riders/" + id),
      (snapshot) => {
        const detail = snapshot.val();

        completed.push({
          firstName: detail.FirstName,
          lastName: detail.LastName,
          phone: detail.Phone,
          email: detail.Email,
          password: detail.Password,
        });
        setCompleteds(completed);
      },
      {
        onlyOnce: true,
      }
    );
  }

  let call = "tel:";
  const [value, setValue] = useState("******");
  const [dis, setDis] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clicked, setCLicked] = useState(false);
  function updatePass(email: any, password: any) {
    if (value.length > 6) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in

          updatePassword(userCredential.user, value)
            .then(() => {
              update(ref(db, "riders/" + id), {
                Password: value,
              });

              onValue(
                ref(db, "riders-id/"),
                (snap) => {
                  const rider = snap.val();
                  for (let i in rider) {
                    if (rider[i].Phone == id) {
                      update(ref(db, "riders-id/" + i), {
                        Password: value,
                      });
                    }
                  }
                },
                {
                  onlyOnce: true,
                }
              );

              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  setLoading(false);
                  showNotification({
                    color: "green",
                    title: "Success",
                    message: "Updated Successfully",
                    icon: <CircleCheck />,
                  });
                  func();
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              // An error ocurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      showNotification({
        color: "red",
        title: "Error",
        message: "Password is too Short",
        icon: <CircleX />,
      });
    }
  }
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
            <Text weight={700}>
              <Group spacing="xs">
                <Lock color="red" />
                Password
              </Group>
            </Text>
            <TextInput
              pt="xs"
              value={value}
              onClick={(e) => {
                if (!clicked) {
                  setValue(d.password);
                  setCLicked(true);
                }
              }}
              onChange={(event) => {
                setValue(event.currentTarget.value);
                setDis(false);
              }}
            />
            <Divider my="sm" variant="dashed" />
            <Group grow position="right">
              <Button
                disabled={dis}
                loading={loading}
                leftIcon={<Edit size={14} />}
                onClick={() => {
                  updatePass(d.email, d.password);
                }}
              >
                Update
              </Button>
            </Group>
          </Container>
        );
      })}
    </>
  );
}
