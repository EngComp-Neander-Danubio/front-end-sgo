import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useTheme,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { OptionsOrGroups, GroupBase } from 'react-select';
import api from '../../../services/api';

export interface Pessoa {
  cod_unidade: string;
  credor?: number;
  gra_codigo: number;
  gra_nome: string;
  nome: string;
  pes_codigo: string;
  tipo_situacao: number;
  uni_codigo: number;
}

export type OptionType = { label: string; value: string | number };

const promiseOptionsPessoas = async (
  inputValue: string,
): Promise<OptionsOrGroups<OptionType, GroupBase<OptionType>>> => {
  try {
    const {
      data: { items },
    } = await api.get<{ items: Pessoa[] }>(
      `policiais/asyncselect?query=${inputValue}`,
    );
    return items.map(({ pes_codigo, nome }) => ({
      value: pes_codigo,
      label: nome,
    }));
  } catch (error) {
    console.error('Failed to fetch options:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};

interface IAsyncSelectProps {
  nameLabel: string;
  placeholder?: string;
  error?: FieldError;
  onChange: (value: string | number) => void;
  loadOptions: (
    inputValue: string,
  ) => Promise<
    OptionsOrGroups<
      { label: string; value: string },
      GroupBase<{ label: string; value: string }>
    >
  >;
  isOverwriting?: boolean;
}

const AsyncSelectComponent: React.FC<IAsyncSelectProps> = ({
  nameLabel,
  onChange,
  loadOptions,
  error,
  placeholder = 'Busca...',
  isOverwriting,
}) => {
  const theme = useTheme();

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#fff',
      borderRadius: theme.radii.md,
      width: '100%',
      height: '40px',
      marginBottom: '5px',
      borderColor: state.isFocused
        ? theme.colors.blue[500]
        : error
        ? theme.colors.red[500]
        : theme.colors.gray[200],
      padding: '0 1rem',
      boxShadow: state.isFocused
        ? `0 0 0 1px ${theme.colors.blue[500]}`
        : error
        ? `0 0 0 1px ${theme.colors.red[500]}`
        : theme.shadows.sm,
      '&:hover': {
        borderColor: state.isFocused
          ? theme.colors.blue[500]
          : theme.colors.gray[300],
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme.colors.gray[400],
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: theme.radii.md,
      zIndex: 9999,
      position: 'absolute',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme.colors.blue[100]
        : state.isFocused
        ? theme.colors.gray[100]
        : undefined,
      color: state.isSelected ? theme.colors.blue[700] : provided.color,
      '&:hover': {
        backgroundColor: theme.colors.gray[200],
      },
    }),
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{nameLabel}</FormLabel>
      <AsyncSelect
        id="asyncSelect"
        inputId="asyncSelect"
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        noOptionsMessage={() => 'Nenhum militar encontrado...'}
        styles={customStyles}
        onChange={option => onChange(option ? option.value : '')}
        placeholder={placeholder}
        menuPortalTarget={isOverwriting ? document.body : null} // Para sobreposição
        menuPosition={isOverwriting ? 'fixed' : 'absolute'}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default AsyncSelectComponent;
