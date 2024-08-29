import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Flex,
} from '@chakra-ui/react';
import { CardService } from '../cardServices/CardService';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const ModalServices: React.FC<IModal> = ({ isOpen, onClose }) => {
  const { services } = useRequisitos();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Center>Serviços</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex overflowY={'auto'}>
              <CardService services={services} isOpen={isOpen} />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
