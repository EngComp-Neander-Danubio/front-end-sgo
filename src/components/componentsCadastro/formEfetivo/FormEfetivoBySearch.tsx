import { Flex, FormLabel, FormControl, FlexboxProps } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import AsyncSelectComponent from './AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { options } from '../../../types/typesMilitar';
import api from '../../../services/api';
import debounce from 'lodash.debounce';

interface IForm {
  busca: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
interface Militar {
  pessoa_pes_codigo: number;
  pessoa_pes_nome: string;
  gra_nome: string;
  unidade_uni_nome: string;
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
  const [dadoPm, setDadoPm] = useState<{ label: string; value: string }[]>([]);

  const cache = new Map<string, any>();

  /* const loadOptions = async (
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
  }; */
  // Função load com debounce
  const load = debounce(async (pes_nome: string): Promise<
    OptionsOrGroups<
      { label: string; value: string },
      GroupBase<{ label: string; value: string }>
    >
  > => {
    if (cache.has(pes_nome)) {
      return cache.get(pes_nome);
    }
    try {
      const response = await api.get<Militar[]>(`/policiais`, {
        params: { pes_nome: pes_nome },
      });

      const filteredOptions = response.data
        .filter(option =>
          option.pessoa_pes_nome.toLowerCase().includes(pes_nome.toLowerCase()),
        )
        .map(option => ({
          label: `${option.gra_nome} PM ${option.pessoa_pes_nome} - Matrícula: ${option.pessoa_pes_codigo} - Unidade: ${option.unidade_uni_nome}`,
          value: (option.pessoa_pes_codigo as unknown) as string,
        }));

      cache.set(pes_nome, filteredOptions);
      setDadoPm(filteredOptions); // Atualiza o estado com as opções filtradas
      return filteredOptions;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, 30);

  const separateNounsByMilitar = useCallback(() => {
    if (dadoPm && dadoPm.length > 0) {
      const [gradAndName, rest] = dadoPm[0].label.split(' - ');
      const [part1, part2] = dadoPm[0].label.split(' - Unidade: ');

      const matricula = rest.match(/\d+/)?.[0];
      setValue('matricula', matricula || '');

      const [grad, ...nameParts] = gradAndName.split(' PM ');
      const name = nameParts.join(' ');
      setValue('nome_completo', name);
      setValue('posto_grad', grad.trim() + ' PM');
      setValue('opm', part2?.trim() || '');
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
                {...field}
                nameLabel="Busca"
                placeholder="Busque por um Militar"
                onChange={field.onChange}
                loadOptions={load}
                //value={field.value}
                error={error}
                isOverwriting={false}
                noOptionsMessage="Nenhum Militar encontrado"
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
