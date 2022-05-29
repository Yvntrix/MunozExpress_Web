import { Group, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { ShoppingCart } from "tabler-icons-react";
import PabiliDetails from "../pages/PabiliComponent/PabiliDetails";
import PahatidDetails from "../pages/PahatidComponent/PahatidDetails";
import PakuhaDetails from "../pages/PakuhaComponent/PakuhaDetails";
import PasundoDetails from "../pages/PasundoComponent/PasundoDetails";

type data = {
  id: any;
  open: any;
  fn: () => void;
  type: any;
};
export default function ModalTransactions({ id, open, fn, type }: data) {
  function func() {
    fn();
  }
  return (
    <Modal
      closeOnEscape
      size="xl"
      transition="slide-down"
      opened={open}
      zIndex={198}
      onClose={() => {
        fn();
      }}
      title={
        <>
          <Group spacing="xs">
            <ShoppingCart color="red" />
            {(() => {
              if (type == "Pabili") {
                return <Text weight={700}> Pabili Details</Text>;
              }
              if (type == "Pahatid") {
                return <Text weight={700}> Pahatid Details</Text>;
              }
              if (type == "Pakuha") {
                return <Text weight={700}> Pakuha Details</Text>;
              }
              if (type == "Pasundo") {
                return <Text weight={700}> Pasundo Details</Text>;
              }
            })()}
          </Group>
        </>
      }
      closeOnClickOutside={false}
    >
      {(() => {
        if (type == "Pabili") {
          return <PabiliDetails id={id} fn={func} />;
        }
        if (type == "Pahatid") {
          return <PahatidDetails id={id} fn={func} />;
        }
        if (type == "Pakuha") {
          return <PakuhaDetails id={id}  fn={func}/>;
        }
        if (type == "Pasundo") {
          return <PasundoDetails id={id} fn={func} />;
        }
      })()}
    </Modal>
  );
}
