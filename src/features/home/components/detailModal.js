import { Flex, Modal } from "@mantine/core"

const DetailModal = ({
  isOpen,
  data,
  onClose
}) => {
  return (
    <>
      <Modal
        opened={isOpen}
        withCloseButton
        onClose={onClose}
        size="md"
        radius="md"
        title="Detail Product"
      >
        <Flex
          direction="column"
          justify="flex-start"
          align="flex-start"
        >
          <p>Title: {data?.title} </p>
          <p>Category: {data?.category} </p>
          <p>Description: {data?.description} </p>
        </Flex>
      </Modal>
    </>
  )
}

export { DetailModal }