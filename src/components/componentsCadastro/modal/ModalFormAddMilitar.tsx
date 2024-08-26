import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { FormEfetivo } from '../formEfetivo/FormEfetivo';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
export const ModalFormAddMilitar: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Policial Militar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormEfetivo />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" bgColor={' #38A169'} color={"#fff"}>
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
