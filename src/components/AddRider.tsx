import {
  Button,
  Divider,
  Group,
  Modal,
  NumberInput,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useState } from "react";
import { CircleCheck, Lock, Mail, User, UserPlus } from "tabler-icons-react";
import StartFirebase, { auth } from "../firebase";
type data = {
  open: any;
  fn: () => void;
};
export default function AddRider({ open, fn }: data) {
  return (
    <>
      <Modal
        opened={open}
        closeOnClickOutside={false}
        closeOnEscape
        onClose={() => {
          fn();
        }}
        title={
          <Group spacing="xs">
            <UserPlus color="red" />
            <Text weight={700}>Add Rider</Text>
          </Group>
        }
      >
        {<RiderData />}
      </Modal>
    </>
  );
}

function RiderData() {
  const form = useForm({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      phone: undefined,
      pass: "",
      cpass: "",
    },

    validate: (values) => ({
      fName: values.fName.length < 2 ? "First Name is too short" : null,
      lName: values.lName.length < 2 ? "Last Name is too short" : null,
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid Email",
      phone:
        Number(values.phone).toString().length == 10
          ? null
          : "Phone Number is not Valid",
      pass: values.pass.length < 6 ? "Password is too short" : null,
      cpass: values.pass == values.cpass ? null : "Passwords do not match",
    }),
  });
  type riderData = {
    fname: string;
    lname: string;
    email: string;
    phone: any;
    password: string;
  };
  const [pexist, setPexist] = useState(false);

  function writeRiderData({ fname, lname, email, phone, password }: riderData) {
    const db = StartFirebase();
    return onValue(
      ref(db, "users-id/"),
      (snapshot) => {
        const users = snapshot.val();
        for (let user in users) {
          if (user == "+63" + phone) {
            setPexist(true);
          }
          // authenticate rider data
        }
        if (pexist == false) {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // write rider id in database
              set(ref(db, "riders-id/" + userCredential.user.uid), {
                Uid: userCredential.user.uid,
                Email: email,
                Phone: "+63" + phone,
                Password: password,
                Online: 0,
                Idle: 0,
              }).then(
                (onFullFilled) => {
                  // write rider data in database
                  set(ref(db, "riders/" + "+63" + phone), {
                    FirstName: fname,
                    LastName: lname,
                    Email: email,
                    Phone: "+63" + phone,
                    Password: password,
                  }).then(
                    (onFullFilled) => {
                      signOut(auth)
                        .then(() => {
                          // Sign-out successful.
                          form.reset();
                          setLoading(false);
                          showNotification({
                            color: "green",
                            title: "Success",
                            message: "Successfully added new rider",
                            icon: <CircleCheck />,
                          });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    },
                    (onRejected) => {
                      console.log(onRejected);
                    }
                  );
                },
                (onRejected) => {
                  console.log(onRejected);
                }
              );
            })
            .catch((error) => {
              //if email is already registered
              const errorCode = error.code;
              if (errorCode == "auth/email-already-in-use") {
                setLoading(false);
                form.setFieldError("email", "Email is already registered");
                showNotification({
                  color: "red",
                  title: "Error",
                  message: "Email is already registered",
                  icon: <CircleCheck />,
                });
              }
            });
        }
      },
      {
        onlyOnce: true,
      }
    );
  }
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Divider my="sm" />
      <form
        onSubmit={form.onSubmit((values) => {
          writeRiderData({
            fname: values.fName,
            lname: values.lName,
            email: values.email,
            phone: values.phone,
            password: values.pass,
          });
          setLoading(true);
        })}
      >
        <Paper>
          <TextInput
            icon={<User size={16} />}
            placeholder="First Name"
            label="First Name"
            radius="md"
            required
            {...form.getInputProps("fName")}
          />
          <TextInput
            icon={<User size={16} />}
            placeholder="Last Name"
            label="Last Name"
            radius="md"
            required
            {...form.getInputProps("lName")}
          />

          <NumberInput
            radius="md"
            placeholder="Phone Number"
            label="Phone Number"
            required
            hideControls
            icon={<Text>+63</Text>}
            {...form.getInputProps("phone")}
          />
          <TextInput
            radius="md"
            required
            label="Email"
            placeholder="your@email.com"
            icon={<Mail size={18} />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            icon={<Lock size={16} />}
            placeholder="Password"
            label="Password"
            radius="md"
            required
            {...form.getInputProps("pass")}
          />
          <PasswordInput
            icon={<Lock size={16} />}
            placeholder="Confirm Password"
            label="Confirm Password"
            radius="md"
            required
            {...form.getInputProps("cpass")}
          />
          <Divider my="sm" />
        </Paper>
        <Group position="right" mt="md">
          <Button
            variant="outline"
            color="red"
            onClick={() => {
              form.reset();
            }}
          >
            Reset
          </Button>
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
}
