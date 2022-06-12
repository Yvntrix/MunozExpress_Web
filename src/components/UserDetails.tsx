import {
  ActionIcon,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  Paper,
  Text,
} from "@mantine/core";
import { onChildChanged, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Certificate, Id, Phone, Photo, Send, Trash } from "tabler-icons-react";
import StartFirebase from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref as refs,
} from "firebase/storage";

export default function UserDetails(id: any) {
  let completed: any[] = [];
  const [completeds, setCompleteds] = useState<any[]>([]);
  const db = StartFirebase();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const detailRef = ref(db, "users/" + id.id);
    onChildChanged(detailRef, (data) => {
      completed = [];
      setCompleteds(completed);
      return onValue(
        ref(db, "users/" + id.id),
        (snapshot) => {
          const detail = snapshot.val();

          completed.push({
            id: id.id,
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

    onValue(
      ref(db, "users/" + id.id),
      (snapshot) => {
        const detail = snapshot.val();

        completed.push({
          id: id.id,
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

    getImage();
  }, []);
  let call = "tel:";

  const storage = getStorage();
  const [src, setSrc] = useState("");
  const [del, setDel] = useState(false);
  function getImage() {
    setLoading(true);
    setSrc("");
    const listRef = refs(storage, "pictures/");
    listAll(listRef).then((res) => {
      if (res.items.length == 0) {
        setTimeout(() => setLoading(false), 400);
      }
      res.items.forEach((itemRef) => {
        if (itemRef.fullPath == "pictures/" + id.id) {
          getDownloadURL(itemRef).then((url) => {
            setSrc(url);
            setLoading(false);
          });
        } else {
          setTimeout(() => setLoading(false), 400);
        }
      });
    });
  }

  function delImage() {
    setDel(true);
    const desertRef = refs(storage, "pictures/" + id.id);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setTimeout(() => {
          setDel(false);
          getImage();
        }, 400);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  return (
    <>
      {completeds.map(function (d) {
        return (
          <Container fluid key={d}>
            <Divider my="sm" />
            <Text weight={700}>
              <Group spacing="xs">
                <Id color="red" />
                ID
              </Group>
            </Text>
            <Text>{d.id}</Text>
            <Divider my="sm" variant="dashed" />
            <Text weight={700}>
              <Group spacing="xs">
                <Certificate color="red" />
                Name
              </Group>
            </Text>
            <Text>{d.firstName + " " + d.lastName}</Text>
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
            <Text>{d.email}</Text>
            <Divider my="sm" variant="dashed" />
            <Text weight={700}>
              <Group spacing="xs">
                <Photo color="red" />
                ID Photo
              </Group>
            </Text>
            <Center m="md">
              {loading ? (
                <Loader color="red" />
              ) : (
                <>
                  {" "}
                  <Image
                    width={300}
                    height={180}
                    radius="md"
                    src={src}
                    fit="cover"
                    withPlaceholder
                  />
                </>
              )}
            </Center>
            <Divider my="sm" variant="dashed" />
            <Group grow position="right">
              <Button
                loading={del}
                disabled={src == "" ? true : false}
                color="red"
                leftIcon={<Trash size={14} />}
                onClick={() => {
                  delImage();
                }}
              >
                Remove Photo
              </Button>
            </Group>
          </Container>
        );
      })}
    </>
  );
}
