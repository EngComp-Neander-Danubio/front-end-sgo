import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Importa os estilos padrões do react-datepicker
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { ptBR } from 'date-fns/locale'; // Corrigido o import do locale para pt-BR
import { FieldError } from 'react-hook-form';

type IDatePicker = InputProps &
  DatePickerProps & {
    error?: FieldError | { message?: string };
  };

export const DatePickerRequisitos: React.FC<IDatePicker> = ({
  customInputRef,
  error,
  ...props
}: IDatePicker) => {
  return (
    <>
      <DatePicker
        ref={customInputRef}
        //locale={ptBR} // Configurado para o idioma português do Brasil
        dateFormat="dd-MM-yyyy" // Formato de data DD-MM-YYYY
        {...props}
        customInput={
          <FormControl isInvalid={!!error}>
            <InputGroup>
              <Input
                value={
                  props.selected
                    ? props.selected.toLocaleDateString('pt-BR')
                    : ''
                }
                placeholder="Selecione a data"
                onChange={() => {}} // Removido o valor de data no input
              />
              <InputRightElement>
                <CalendarIcon />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        }
      />
    </>
  );
};
