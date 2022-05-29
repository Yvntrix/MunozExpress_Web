import {
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { onChildChanged, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { ListDetails } from "tabler-icons-react";
import LoaderComponent from "../../components/LoaderComponent";
import NoRow from "../../components/NoRow";
import TransactionTable from "../../components/TransactionTable";
import StartFirebase from "../../firebase";
import PasundoDetails from "./PasundoDetails";

export default function PasundoOngoing() {
  const db = StartFirebase();
  const [completeds, setCompleteds] = useState<any[]>([]);
  const [noRow, setNoRow] = useState(false);
  const [loader, setLoader] = useState(false);
  let completed: any[] = [];
  let row = 0;
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    row = 0;
    completed = [];
    setCompleteds(completed);
    setLoader(false);
    return onValue(
      ref(db, "Transactions/Pasundo"),
      (snapshot) => {
        const transactions = snapshot.val();
        for (let i in transactions) {
          if (transactions[i].Ongoing === 1) {
            if (transactions[i].TransactionId !== undefined) {
              completed.push({
                id: transactions[i].TransactionId,
                name: transactions[i].CustomerName,
                phone: transactions[i].CustomerNumber,
              });
            }
            row += 1;
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
            <TransactionTable
              row={completeds}
              type="Pasundo"
              func={fetchData}
            />
          )
        ) : (
          <LoaderComponent />
        )}
      </Paper>
    </Container>
  );
}
