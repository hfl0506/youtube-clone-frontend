import { Modal, Button } from "@mantine/core";
import { useState } from "react";

function UploadVideo() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        opened={opened}
        title="Upload Video"
        size="xl"
      >
        Hello
      </Modal>
      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
