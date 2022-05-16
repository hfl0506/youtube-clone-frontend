import {
  Modal,
  Button,
  Group,
  Text,
  Progress,
  Stack,
  TextInput,
  Switch,
} from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { MIME_TYPES, Video } from "../types";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useMutation } from "react-query";
import { editVideo, uploadVideo } from "../api";
import { useForm } from "@mantine/hooks";
import { AxiosError, AxiosResponse } from "axios";
import { useVideo } from "../context/videos";

function EditVideoForm({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const { refetch } = useVideo();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  type input = Parameters<typeof editVideo>;

  const mutation = useMutation<AxiosResponse<Video>, AxiosError, input["0"]>(
    editVideo,
    {
      onSuccess: () => {
        setOpened(false);
        refetch();
      },
    }
  );

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({
          videoId,
          ...values,
        })
      )}
    >
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="Video Title"
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Description"
          required
          placeholder="Video Description"
          {...form.getInputProps("description")}
        />
        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

function UploadVideo() {
  const [opened, setOpened] = useState(false);

  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  function upload(files: File[]) {
    const formData = new FormData();
    formData.append("video", files[0]);
    mutation.mutate({ formData, config });
  }
  return (
    <>
      <Modal
        closeOnClickOutside={true}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload Video"
        size="xl"
      >
        {progress === 0 && (
          <Dropzone
            onDrop={(file) => {
              upload(file);
            }}
            accept={[MIME_TYPES.mp4]}
            multiple={false}
            onReject={(files) => console.log("rejected files", files)}
          >
            {(status) => {
              return (
                <Group
                  position="center"
                  spacing="xl"
                  style={{
                    minHeight: "50vh",
                    justifyContent: "center",
                  }}
                  direction="column"
                >
                  <ArrowBigUpLine />
                  <Text>Drag video here or click to find</Text>
                </Group>
              );
            }}
          </Dropzone>
        )}
        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}
        {mutation.data && (
          <EditVideoForm
            setOpened={setOpened}
            videoId={mutation.data.videoId}
          />
        )}
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
