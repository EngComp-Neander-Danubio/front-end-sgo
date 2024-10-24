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
import React, { useEffect, useState } from 'react';
import { OPMs, optionsOPMs } from '../../../types/typesOPM';
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
  dataInicio: Date;
  dataFinal: Date;
  input: string[];
  opmsLabel: string[];
}
export const ModalSolicitarEfetivo: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [opm, setOPM] = useState<OPMs[]>([]);
  const handleDeleteSelectAllOpmCancel = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);
        reset();
      }
    } catch (err) {}
  };
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoEfetivoSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: SolicitacaoForm) => {
    // Mapeia os valores de opmsLabel e busca o valor correspondente em optionsOPMs
    const opms = data.opmsLabel
      .map(op => {
        const option = optionsOPMs.find(o => o.label === op.valueOf());
        return option ? option.value : null;
      })
      .filter(Boolean); // Remove valores nulos

    const dados = {
      opms,
      prazoInicio: data.dataInicio,
      prazoFinal: data.dataFinal,
      input,
    };

    console.log('Dados de solicitação de postos mapeados:', dados);
    console.log('Dados de solicitação de postos originais:', data);
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
              w={'fit-content'}
              //h={'fit-content'}
              //h={'90vh'}
              maxW="80vw"
              minW="30vw"
              maxH="90vh"
              minH="fit-content"
            >
              <ModalHeader>
                <Center>Solicitação de Efetivo Policial</Center>
              </ModalHeader>
              <ModalCloseButton onClick={handleDeleteSelectAllOpmCancel} />
              <FormProvider {...methodsInput}>
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
                      handleDeleteSelectAllOpmCancel();
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
              </FormProvider>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
