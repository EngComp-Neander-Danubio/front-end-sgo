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
} from '@chakra-ui/react';
import { Militares } from '../../../context/requisitosContext/RequisitosContext';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  militaresRestantes: Militares[];
}

export const ModalRestantes: React.FC<IModal> = ({
  isOpen,
  onClose,
  militaresRestantes,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <Center>Militares Restantes</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {militaresRestantes.map((militar, index) => (
              <>
                <li key={index}>
                  {militar.grad}-{militar.nome_completo}-{militar.matricula}
                  {militar.lotacao}
                </li>

              </>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="ghost"
              bgColor="#38A169"
              color="#fff"
              type="submit"
              onClick={isOpen ? onClose : undefined}
            >
              Distribuir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
