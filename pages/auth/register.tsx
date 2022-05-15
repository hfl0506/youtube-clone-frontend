import { useForm } from "@mantine/hooks";
import { registerUser } from "../../api";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import {
  Container,
  Paper,
  Title,
  Button,
  TextInput,
  Stack,
  PasswordInput,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import Head from "next/head";
import { useRouter } from "next/router";

function RegisterPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUser>["0"]
  >(registerUser, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Success",
        message: "Successfully Created Account",
        loading: true,
      });

      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Failure",
        message: "Could Not Create Account",
        loading: true,
      });
    },
  });

  return (
    <>
      <Head>
        <title>Register User</title>
      </Head>
      <Container>
        <Title>Register</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="janedoe@example.com"
                required
                {...form.getInputProps("email")}
              />
              <TextInput
                label="User Name"
                placeholder="Enter Your User Name"
                required
                {...form.getInputProps("username")}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter Your Password"
                required
                {...form.getInputProps("password")}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Enter Your Confirm Password"
                required
                {...form.getInputProps("confirmPassword")}
              />
              <Button type="submit">Register</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegisterPage;
