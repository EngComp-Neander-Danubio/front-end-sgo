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
  Checkbox,
  Flex,
  Text,
  Divider,
  useToast,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { OptionType, SelectPattern } from './SelectPattern';
import React, { useState } from 'react';
import {
  OPMs,
  options1CRPM,
  options2CRPM,
  options3CRPM,
  options4CRPM,
  optionsCPCHOQUE,
  optionsCPE,
  optionsCPRAIO,
  optionsDPGI,
  optionsEsp,
  optionsOPMs,
} from '../../../types/typesOPM';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { OPMOption } from '../../../types/typesMilitar';
import { yupResolver } from '@hookform/resolvers/yup';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { postosSchema } from '../../../types/yupPostos/yupPostos';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { usePostos } from '../../../context/postosContext/usePostos';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { FormSolicitacaoPostos } from './FormSolicitacaoPostos';
import { solicitacaoPostosSchema } from '../../../types/yupSolicitacaoPostos/yupSolicitacaoPostos';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  opms: OPMs[];
  select_opm: OPMs;
  militaresRestantes: Militares_service[];
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
    console.log('postos-solicitação', data);
    reset();
    onClose();
    toast({
      title: 'Solicitações de Postos.',
      description: 'Solicitação Salva.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalContent
              maxW="80vw"
              minW="30vw"
              w={'fit-content'}
              maxH="80vh"
              minH="40vh"
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
