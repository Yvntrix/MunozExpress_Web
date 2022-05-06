import { ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import ModalTransactions from "./ModalTransaction";

export default function TransactionTable({ row, type }: any) {
  const [opened, setOpened] = useState(false);
  const [id, setId] = useState("");
  function call() {
    setOpened(false);
  }
  const rows = row.map((transaction: any) => (
    <tr
      key={transaction.id}
      onClick={() => {
        setId(transaction.id);
        setOpened(true);
      }}
    >
      <td>{transaction.id}</td>
      <td>{transaction.name}</td>
      <td>+63{transaction.phone}</td>
    </tr>
  ));
  return (
    <>
      <ModalTransactions type={type} id={id} open={opened} fn={call} />
      <ScrollArea type="always">
        <Table
          highlightOnHover
          striped
          horizontalSpacing="md"
          sx={{ minWidth: 450 }}
        >
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
