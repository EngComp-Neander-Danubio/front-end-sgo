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
import React from 'react';
import { OPMs } from '../../../types/typesOPM';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
import { ContentModalSAPM } from './ContentModalSAPM';
type Militar = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
};
interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  opms: OPMs[];
  select_opm: OPMs;
}

export const ModalSAPM: React.FC<IModal> = ({ isOpen, onClose }) => {
  const methodsInput = useForm<Militar>({
    resolver: yupResolver(militarSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: Militar) => {
    onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalContent
              w={'fit-content'}
              //h={'fit-content'}
              //h={'90vh'}
              maxW="80vw"
              minW="30vw"
              maxH="90vh"
              minH="fit-content"
            >
              <ModalHeader>
                <Center>Adicionar OPM</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody justifyContent="center" padding={4} gap={4}>
                <ContentModalSAPM />
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="ghost"
                  bgColor=" #38A169"
                  _hover={{
                    bgColor: 'green',
                    cursor: 'pointer',
                    transition: '.5s',
                  }}
                  color="#fff"
                  type="submit"
                  //onClick={reset}
                >
                  Importar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
