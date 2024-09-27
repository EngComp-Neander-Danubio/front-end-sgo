import {
  Flex,
  Text,
  FormLabel,
  Input,
  FormControl,
  FlexProps,
} from '@chakra-ui/react';
import React from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { optionsModalidade } from '../../../types/typesModalidade';
import { SelectPattern } from '../modal/SelectPattern';
interface IForm {
  local: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  modalidade: string;
}
interface IModal extends FlexProps {}
export const FormPosto: React.FC<IModal> = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IForm>();
  return (
    <FormControl>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Local</FormLabel>
          <Controller
            name={'local'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o Local"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Modalidade</FormLabel>
          <Controller
            name="modalidade"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <Flex gap={2} flexDirection={'column'}>
                <SelectPattern
                  value={value}
                  options={optionsModalidade}
                  placeholderSelect="Modalidade"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={error}
                />
              </Flex>
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Rua</FormLabel>
          <Controller
            name={'rua'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe a rua"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Número</FormLabel>
          <Controller
            name={'numero'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o número"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Bairro</FormLabel>
          <Controller
            name={'bairro'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe o bairro"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Cidade</FormLabel>
          <Controller
            name={'cidade'}
            control={control}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => (
              <InputPatternController
                type="text"
                w={'400px'}
                placeholder="Informe a cidade"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                error={error}
                //{...field}
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
