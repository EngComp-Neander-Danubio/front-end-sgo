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
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
interface MilitarForm {
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
export const ModalFormAddMilitar: React.FC<IModal> = ({ isOpen, onClose }) => {
  const methodsInput = useForm<MilitarForm>({
    resolver: yupResolver(militarSchema),
  });
  const { reset } = methodsInput;
  const onSubmit = async (data: MilitarForm) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <FormProvider {...methodsInput}>
            <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
              <ModalHeader>Adicionar Policial Militar</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormEfetivo />
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="yellow"
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
                  bgColor={' #38A169'}
                  color={'#fff'}
                  type="submit"
                >
                  Adicionar
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  );
};
