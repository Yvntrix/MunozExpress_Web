import { Button, Divider, Group, Modal, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ref, update } from "firebase/database";
import { useState } from "react";
import {
  Check,
  CircleCheck,
  CircleX,
  MoodSad,
  TruckDelivery,
} from "tabler-icons-react";
import StartFirebase from "../firebase";
import AssignToRider from "./AssignToRider";

type Fn = {
  id: any;
  transaction: string;
};

export default function ApproveButton({ id, transaction }: Fn) {
  const modals = useModals();
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Cancel order",
      centered: true,
      withCloseButton: false,
      children: (
        <Text size="sm">Are you sure you want to cancel this order?</Text>
      ),
      labels: { confirm: "Cancel Order", cancel: "No don't cancel it" },
      confirmProps: { color: "red" },
      onConfirm: () => cancel(),
    });

  function cancel() {
    showNotification({
      color: "orange",
      title: "Success",
      message: "Successfully cancelled this order 😞",
      icon: <MoodSad />,
    });
    const db = StartFirebase();
    return update(ref(db, "Transactions/" + transaction + "/" + id), {
      Cancelled: 1,
    });
  }

  const [opened, setOpened] = useState(false);

  const calls = () => {
    setOpened(false);
    showNotification({
      color: "green",
      title: "Success ✅",
      message: "Successfully assigned to a Rider ",
      icon: <Check />,
    });
  };

  return (
    <>
      <Modal
        transition="slide-down"
        zIndex={199}
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <>
            <Group spacing="xs">
              <TruckDelivery color="red" />
              <Text weight={700}>Assign To Rider</Text>
            </Group>
          </>
        }
        closeOnClickOutside={false}
      >
        {
          <>
            <Divider my="sm" />
            <AssignToRider fn={calls} id={id} transaction={transaction} />
          </>
        }
      </Modal>
      <Divider my="sm" />
      <Group grow position="right">
        <Button
          color="red"
          leftIcon={<CircleX size={14} />}
          onClick={openDeleteModal}
        >
          Cancel Order
        </Button>
        <Button
          leftIcon={<CircleCheck size={14} />}
          onClick={() => setOpened(true)}
        >
          Approve Order
        </Button>
      </Group>
    </>
  );
}
