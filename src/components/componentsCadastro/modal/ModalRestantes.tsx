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
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { TableFicha } from '../../componentesFicha/table';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  militaresRestantes: Militares_service[];
}

export const ModalRestantes: React.FC<IModal> = ({
  isOpen,
  onClose,
  militaresRestantes,
}) => {
  const handleSortByPostoGrad = () => {
    // Define a ordem hierárquica das graduações (do menor para o maior)
    const hierarchy = [
      'Cel PM',
      'Ten-Cel PM',
      'Maj PM',
      'Cap PM',
      '1º Ten PM',
      '2º Ten PM',
      'St PM',
      '1º Sgt PM',
      '2º Sgt PM',
      '3º Sgt PM',
      'Cb PM',
      'Sd PM',
      'Al Sd PM',
    ];

    // Função de comparação
    return militaresRestantes.sort((a, b) => {
      const indexA = hierarchy.indexOf(a.posto_grad);
      const indexB = hierarchy.indexOf(b.posto_grad);

      // Compara os índices da hierarquia
      return indexA - indexB;
    });
  };
  const headerKeysMilitar =
    militaresRestantes.length > 0
      ? Object.keys(militaresRestantes[0]).filter(key =>
          ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
        )
      : [];
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent maxW="50vw" minW="30vw" maxH="100vh" minH="40vh" overflowY={'auto'}>
          <ModalHeader>
            <Center>Militares Restantes</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableFicha
              //isOpen={militares.length > 0}
              columns={headerKeysMilitar}
              registers={handleSortByPostoGrad()}
              currentPosition={50}
              rowsPerLoad={0}
              isActions={true}
              label_tooltip='militar'
            />
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
