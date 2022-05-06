import { Button, Container, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { CircleCheck, CircleX, User } from "tabler-icons-react";
import StartFirebase from "../firebase";

type Fn = {
  fn: any;
  id: any;
  transaction: string;
};

export default function AssignToRider({ fn, id, transaction }: Fn) {
  const db = StartFirebase();
  let riderList: any[] = [];
  let riderId: string;
  useEffect(() => {
    const userRef = ref(db, "riders/");
    onValue(userRef, (snapshot) => {
      const rider = snapshot.val();
      for (let i in rider) {
        onValue(
          ref(db, "riders-id/"),
          (snapshot) => {
            const ridersid = snapshot.val();
            Object.keys(ridersid).forEach((e) => {
              if (rider[i].Phone == ridersid[e].Phone) {
                riderList.push({
                  value: e,
                  label: rider[i].FirstName + " " + rider[i].LastName,
                });
                riderId = e;
              }
            });
          },
          {
            onlyOnce: true,
          }
        );
      }
    });
  }, []);

  let s: any;
  const setD = () => {
    if (s == undefined) {
      showNotification({
        color: "red",
        title: "Error ❌",
        message: "Please Select Rider ❗",
        icon: <CircleX />,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        fn(s);
        const db = StartFirebase();
        return update(ref(db, "Transactions/" + transaction + "/" + id), {
          Ongoing: 1,
          AssignedTo: s,
        });
      }, 700);
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Container fluid>
        <Stack>
          <Select
            required
            label="Pick a Rider"
            placeholder="Pick a Rider"
            onChange={(event) => (s = event)}
            data={riderList}
            icon={<User size={14} />}
          />
          <Button
            leftIcon={<CircleCheck size={14} />}
            onClick={setD}
            loading={loading}
          >
            Confirm
          </Button>
        </Stack>
      </Container>
    </>
  );
}
