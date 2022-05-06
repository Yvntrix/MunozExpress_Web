import { onChildChanged, onValue, ref } from "firebase/database";
import { useState } from "react";
import StartFirebase from "../firebase";


function GetTransactions(){
    const db = StartFirebase();
    const [completeds, setCompleteds] = useState<any[]>([]);
    const [noRow, setNoRow] = useState(false);
    const [loader, setLoader] = useState(false);
    let completed: any[] = [];
    let row = 0;

    const transactRef = ref(db, "Transactions/Pabili");
    onChildChanged(transactRef, (data) => {
      row = 0;
      completed = [];
      setCompleteds(completed);
      onValue(
        ref(db, "Transactions/Pabili"),
        (snapshot) => {
          const transactions = snapshot.val();
          for (let i in transactions) {
            if (transactions[i].Completed === 1) {
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
    });

    onValue(
      ref(db, "Transactions/Pabili"),
      (snapshot) => {
        const transactions = snapshot.val();
        for (let i in transactions) {
          if (transactions[i].Completed === 1) {
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