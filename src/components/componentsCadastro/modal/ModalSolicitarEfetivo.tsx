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
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { FormSolicitacaoEfetivo } from './FormSolicitacaoEfetivo';
import { yupResolver } from '@hookform/resolvers/yup';
import solicitacaoEfetivoSchema from '../../../types/yupSolicitacaoEfetiv/yupSolicitacaoEfetivo';
import api from '../../../services/api';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  militaresRestantes: Militares_service[];
}
interface SolicitacaoForm {
  operacao_id?: string;
  dataInicio: Date;
  dataFinal: Date;
  totalEfetivo?: number;
  uni_codigo: number[];
  efetivo: number[];
}

export const ModalSolicitarEfetivo: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoEfetivoSchema),
    defaultValues: {
      dataInicio: new Date(),
      operacao_id: '02/2024',
      uni_codigo: [],
      efetivo: [],
    },
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: SolicitacaoForm) => {
    try {
      console.log(data);
      //await api.post('/solicitacao', data);
      toast({
        title: 'Solicitações de Postos.',
        description: 'Solicitação Salva.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao criar solicitação',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
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
                <Center color={'rgba(0, 0, 0, 0.48)'}>
                  Solicitação de Efetivo Policial
                </Center>
              </ModalHeader>
              <ModalCloseButton onClick={() => reset()} />

              <ModalBody justifyContent="center" padding={4} gap={4}>
                <FormSolicitacaoEfetivo />
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
                  Salvar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
