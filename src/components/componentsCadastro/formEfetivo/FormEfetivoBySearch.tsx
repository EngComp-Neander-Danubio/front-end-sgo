import { Flex, FormLabel, FormControl, FlexboxProps } from '@chakra-ui/react';
import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import AsyncSelectComponent from './AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { options } from '../../../types/typesMilitar';

interface IForm {
  busca: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}

interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}

export const FormEfetivoBySearch: React.FC<IFormProps> = ({
  widthSelect,
  ...props
}) => {
  const { control, setValue, watch } = useFormContext<IForm>();
  const dadoPm = options.find(o => o.value === watch('busca'));

  const loadOptions = async (
    inputValue: string,
  ): Promise<OptionsOrGroups<
    { label: string; value: string },
    GroupBase<{ label: string; value: string }>
  >> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredOptions = options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase()),
        );

        resolve(filteredOptions);
        //setDataValue(filteredOptions);
      }, 1000);
    });
  };

  const separateNounsByMilitar = useCallback(() => {
    if (dadoPm) {
      const [gradAndName, rest] = dadoPm?.label.split(' - ');
      const [part1, part2] = dadoPm?.label.split(' - Unidade: ');
      const matricula = rest.match(/\d+/)?.[0];
      setValue('matricula', matricula as string);
      const [grad, ...nameParts] = gradAndName.split(' PM ');
      const name = nameParts.join(' ');
      setValue('nome_completo', name);
      setValue('posto_grad', grad.trim() + ' PM');
      setValue('opm', part2?.trim());
    }
  }, [dadoPm, setValue]);

  useEffect(() => {
    separateNounsByMilitar();
  }, [dadoPm]);
  return (
    <FormControl {...props}>
      <Flex
        flexDirection={'column'}
        align={'center'}
        justify={'center'}
        gap={4}
      >
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <Controller
            name="busca"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <AsyncSelectComponent
                nameLabel="Busca"
                onChange={field.onChange}
                loadOptions={loadOptions}
                //value={field.value}
                error={error}
                isOverwriting={false}
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Nome Completo</FormLabel>
          <Controller
            name={'nome_completo'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Nome Completo"
                {...field}
                error={error}
                isDisabled
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Matrícula</FormLabel>
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
                isDisabled
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>Posto/Graduação</FormLabel>
          <Controller
            name={'posto_grad'}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPatternController
                type="text"
                w={widthSelect || '400px'}
                placeholder="Informe o Posto/Graduação"
                {...field}
                error={error}
                isDisabled
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={1} w={'full'}>
          <FormLabel>OPM</FormLabel>
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
                isDisabled
              />
            )}
          />
        </Flex>
      </Flex>
    </FormControl>
  );
};
