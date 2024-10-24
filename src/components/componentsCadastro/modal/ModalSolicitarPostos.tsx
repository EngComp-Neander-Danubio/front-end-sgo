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
import React, { useState } from 'react';
import { OPMs, optionsOPMs } from '../../../types/typesOPM';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormSolicitacaoPostos } from './FormSolicitacaoPostos';
import { solicitacaoPostosSchema } from '../../../types/yupSolicitacaoPostos/yupSolicitacaoPostos';
import api from '../../../services/api';
import { useEvents } from '../../../context/eventContext/useEvents';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  opmsLabel: string[];
}
export const ModalSolicitacarPostos: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const { handleDeleteSelectAllOpm } = useEvents();
  const handleDeleteAllOpm = async () => {
    await handleDeleteSelectAllOpm();
  };
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoPostosSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: SolicitacaoForm) => {
    const opms = data.opmsLabel
      .map(op => {
        const option = optionsOPMs.find(o => o.label === op.valueOf());
        return option ? option.value : null;
      })
      .filter(Boolean);

    const dados = {
      opms,
      prazoInicio: data.dataInicio,
      prazoFinal: data.dataFinal,
    };

    console.log('Dados de solicitação de postos mapeados:', dados);
    //console.log('Dados de solicitação de postos originais:', data);
    try {
      await api.post('/solicitacao', dados);
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
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalContent
              maxW="80vw"
              minW="40vw"
              w={'fit-content'}
              //h={'90vh'}
              maxH="100vh"
              minH="65vh"
            >
              <ModalHeader>
                <Center>Solicitação de Postos</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody justifyContent="center" padding={4} gap={4}>
                <FormSolicitacaoPostos />
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                    handleDeleteAllOpm();
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
                  //onClick={() => reset()}
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
