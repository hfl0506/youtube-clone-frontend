import { useForm } from "@mantine/hooks";
import { login, registerUser } from "../../api";
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

function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof login>["0"]
  >(login, {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="janedoe@example.com"
                required
                {...form.getInputProps("email")}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter Your Password"
                required
                {...form.getInputProps("password")}
              />
              <Button type="submit">Login</Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;
