import { Container, Paper } from "@mantine/core";
import dayjs from "dayjs";
import {
  onChildChanged,
  onChildRemoved,
  onValue,
  ref,
} from "firebase/database";
import { useEffect, useState } from "react";
import LoaderComponent from "../../components/LoaderComponent";
import NoRow from "../../components/NoRow";
import TransactionTable from "../../components/TransactionTable";
import StartFirebase from "../../firebase";

export default function PabiliPlaced() {
  const db = StartFirebase();
  const [completeds, setCompleteds] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let row = 0;
  let completed: any[] = [];
  useEffect(() => {
    onChildRemoved(ref(db, "Transactions/Pabili"), (data) => {
      fetchData();
    });
    onChildChanged(ref(db, "Transactions/Pabili"), (data) => {
      fetchData();
    });
    fetchData();
  }, []);

  function fetchData() {
    row = 0;
    completed = [];
    setCompleteds(completed);
    setLoader(false);
    return onValue(
      ref(db, "Transactions/Pabili"),
      (snapshot) => {
        const transactions = snapshot.val();
        for (let i in transactions) {
          if (
            transactions[i].Cancelled == 0 &&
            transactions[i].Completed == 0 &&
            transactions[i].Ongoing == 0
          ) {
            completed.push({
              id: transactions[i].TransactionId,
              name: transactions[i].CustomerName,
              phone: transactions[i].CustomerNumber,
              placed: dayjs(transactions[i].TimePlaced).format(
                "MMM DD YYYY, hh:mm A"
              ),
            });
            row++;
          }
        }
        if (row == 0) {
          setNoRow(true);
        }
        setCompleteds(completed);
        setTimeout(() => setLoader(true), 400);
      },
      {
        onlyOnce: true,
      }
    );
  }

  return (
    <Container fluid>
      <Paper radius="md" p="md" withBorder>
        {loader ? (
          noRow === true ? (
            <NoRow />
          ) : (
            <TransactionTable type="Pabili" row={completeds} func={fetchData} />
          )
        ) : (
          <LoaderComponent />
        )}
      </Paper>
    </Container>
  );
}
