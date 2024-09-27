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
import { OPMs } from '../../../types/typesOPM';
import { FormProvider, useForm } from 'react-hook-form';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';

import { FormSolicitacaoEfetivo } from './FormSolicitacaoEfetivo';
import { yupResolver } from '@hookform/resolvers/yup';
import solicitacaoEfetivoSchema from '../../../types/yupSolicitacaoEfetiv/yupSolicitacaoEfetivo';

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
  checkboxespecializadas: boolean;
  checkboxdgpi: boolean;
  checkbox1crpm: boolean;
  checkbox2crpm: boolean;
  checkbox3crpm: boolean;
  checkbox4crpm: boolean;
  checkboxcpchoque: boolean;
  checkboxcpraio: boolean;
  checkboxcpe: boolean;
  checkbox: boolean[];
  opmsLabel: string[];
}
export const ModalSolicitarEfetivo: React.FC<IModal> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const [opm, setOPM] = useState<OPMs[]>([]);
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoEfetivoSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: SolicitacaoForm) => {
    console.log('', data);
    reset();
    onClose();
    toast({
      title: 'Solicitações de Efetivo.',
      description: 'Solicitação Salva.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };
  const handleDeleteSelectAllOpmCancel = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);
        reset();
      }
    } catch (err) {}
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
              h={'80vh'}
              maxW="80vw"
              minW="30vw"
              maxH="80vh"
              minH="40vh"
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
                    colorScheme="yellow"
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
                    bgColor="#38A169"
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
