import {
  Flex,
  Text,
  FormLabel,
  Input,
  FormControl,
  FlexboxProps,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
interface IForm {
  name: string;
  grad: string;
  opm: string;
  matricula: string;
}
interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}
export const FormEfetivo: React.FC<IFormProps> = ({
  widthSelect,
  isLoadingRequest,
  isEditing,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: '',
      grad: '',
      matricula: '',
      opm: '',
    },
  });
  return (
    <FormControl {...props}>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel fontWeight={'bold'}>Nome Completo</FormLabel>
          <Controller
            name={'name'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Nome Completo"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel fontWeight={'bold'}>Matrícula</FormLabel>
          <Controller
            name={'matricula'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe a Matrícula"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel fontWeight={'bold'}>Posto/Graduação</FormLabel>
          <Controller
            name={'grad'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Posto/Graduação"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel fontWeight={'bold'}>OPM</FormLabel>
          <Controller
            name={'opm'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe a unidade"
                {...field}
                error={error}
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
