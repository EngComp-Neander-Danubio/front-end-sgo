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
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { FormSolicitacaoPostos } from './FormSolicitacaoPostos';
import { solicitacaoPostosSchema } from '../../../types/yupSolicitacaoPostos/yupSolicitacaoPostos';
import api from '../../../services/api';

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
  const [opm, setOPM] = useState<OPMs[]>([]);
  const handleDeleteSelectAllOpmCancel = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);
        //reset();
      }
    } catch (err) {}
  };
  const methodsInput = useForm<SolicitacaoForm>({
    resolver: yupResolver(solicitacaoPostosSchema),
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
    };

    console.log('Dados de solicitação de postos mapeados:', dados);
    console.log('Dados de solicitação de postos originais:', data);
    try {
      await api.post('/solicitacao', dados);
      toast({
        title: 'Solicitações de Postos.',
        description: 'Solicitação Salva.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar a solicitação',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    }
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
              minH="85vh"
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
