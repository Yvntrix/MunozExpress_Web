import { Button, Container, Select, Stack } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import { onChildChanged, onValue, ref, update } from "firebase/database";
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
  useEffect(() => {
    const userRef = ref(db, "riders/");
    const riders = ref(db, "riders-id/");
    onChildChanged(riders, (data) => {
      riderList = [];
      setDis(false);
      onValue(userRef, (snapshot) => {
        const rider = snapshot.val();
        for (let i in rider) {
          onValue(
            ref(db, "riders-id/"),
            (snapshot) => {
              const ridersid = snapshot.val();
              Object.keys(ridersid).forEach((e) => {
                if (rider[i].Phone == ridersid[e].Phone) {
                  if (ridersid[e].Online == 1 && ridersid[e].Idle == 0) {
                    riderList.push({
                      value: e,
                      label: rider[i].FirstName + " " + rider[i].LastName,
                    });
                  }
                }
              });
            },
            {
              onlyOnce: true,
            }
          );
        }
        if (riderList === undefined || riderList.length === 0) {
          setDis(true);
        }
      });
    });
    onValue(userRef, (snapshot) => {
      const rider = snapshot.val();
      for (let i in rider) {
        onValue(
          ref(db, "riders-id/"),
          (snapshot) => {
            const ridersid = snapshot.val();
            Object.keys(ridersid).forEach((e) => {
              if (rider[i].Phone == ridersid[e].Phone) {
                if (ridersid[e].Online == 1 && ridersid[e].Idle == 0) {
                  riderList.push({
                    value: e,
                    label: rider[i].FirstName + " " + rider[i].LastName,
                  });
                }
              }
            });
          },
          {
            onlyOnce: true,
          }
        );
      }
      if (riderList === undefined || riderList.length === 0) {
        setDis(true);
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
        update(ref(db, "Transactions/" + transaction + "/" + id), {
          Ongoing: 1,
          AssignedTo: s,
          TimeConfirmed: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        });
        update(ref(db, "riders-id/" + s), {
          Idle: 1,
        });
      }, 700);
    }
  };
  const [dis, setDis] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Container fluid>
        <Stack>
          <Select
            disabled={dis}
            required
            label="Pick a Rider"
            placeholder="Pick a Rider"
            onChange={(event) => {
              s = event;
            }}
            data={riderList}
            icon={<User size={14} />}
          />
          <Button
            disabled={dis}
            leftIcon={
              dis == true ? <CircleX size={14} /> : <CircleCheck size={14} />
            }
            onClick={setD}
            loading={loading}
          >
            {dis == true ? "No Available Rider" : "Confirm"}
          </Button>
        </Stack>
      </Container>
    </>
  );
}
