import { Flex, FlexboxProps, FormControl, FormLabel } from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerEvent } from './DatePickerEvent';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { useState } from 'react';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { options } from '../../../types/typesMilitar';

interface IFormProps extends FlexboxProps {
  widthSelect?: string;
  isLoadingRequest?: boolean;
  isEditing?: boolean;
}

export const FormGrandeEvento: React.FC<IFormProps> = ({
  widthSelect,
  ...props
}) => {
  const { control } = useFormContext();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
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
  return (
    <FormControl
      //border={'1px solid green'}
      {...props}
    >
      <Flex align="center" justify="center" gap={2}>
        <Flex
          align={'center'}
          justify="space-between"
          flexDirection={props.flexDirection}
          gap={6}
        >
          <Flex flexDirection="column" gap={1}>
            <FormLabel fontWeight="bold">Título do Evento</FormLabel>
            <Controller
              name="nomeOperacao"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputPatternController
                  type="text"
                  w={widthSelect || '400px'}
                  placeholder="Informe o Título do Evento"
                  {...field}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={0} w={widthSelect || '700px'}>
            <FormLabel fontWeight="bold">Comandante</FormLabel>
            <Controller
              name="comandante"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <AsyncSelectComponent
                  placeholder="Informe o Comandante"
                  nameLabel=""
                  onChange={field.onChange}
                  error={error}
                  isOverwriting
                  loadOptions={loadOptions}
                  noOptionsMessage="Nenhum Militar encontrado"
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={widthSelect || '12vw'}>
            <FormLabel fontWeight="bold">Data Inicial</FormLabel>
            <Controller
              name="dataInicio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  portalId="root-portal"
                  selectsStart
                  onChange={date => {
                    field.onChange(date);
                    setStartDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={widthSelect || '12vw'}>
            <FormLabel fontWeight="bold">Data Final</FormLabel>
            <Controller
              name="dataFinal"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  portalId="root-portal"
                  selectsEnd
                  onChange={date => {
                    field.onChange(date);
                    setEndDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  error={error}
                />
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </FormControl>
  );
};
