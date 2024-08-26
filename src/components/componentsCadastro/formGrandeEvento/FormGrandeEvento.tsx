import { Flex, FlexboxProps, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import {
  Controller,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePickerEvent } from './DatePickerEvent';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { inputSchema } from '../../../types/yupSchema/yupInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

interface IForm {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}

export const FormGrandeEvento: React.FC<FlexboxProps> = () => {
  const { control } = useFormContext<IForm>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <FormControl>
      <Flex align={'center'} justify={'center'} gap={2}>
        <Flex
          align={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}
          gap={6}
        >
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Título do Evento</FormLabel>
            <Controller
              name="nomeOperacao"
              control={control}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <InputPatternController
                  type="text"
                  w={'400px'}
                  placeholder="Informe o Título do Evento"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={error}
                  //{...field}
                />
              )}
            />
          </Flex>
          <Flex flexDirection={'column'} gap={1}>
            <FormLabel fontWeight={'bold'}>Comandante</FormLabel>
            <Controller
              name="comandante"
              control={control}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <InputPatternController
                  type="text"
                  w={'500px'}
                  placeholder="Informe o Comandante"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w="12vw">
            <FormLabel fontWeight={'bold'}>Data Inicial</FormLabel>
            <Controller
              name="dataInicio"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <DatePickerEvent
                  onBlur={onBlur}
                  showDateSelect
                  selectsStart
                  onChange={date => {
                    onChange(date);
                    setStartDate((date as unknown) as Date);
                  }}
                  selected={value ? new Date(value) : null}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w="12vw">
            <FormLabel fontWeight={'bold'}>Data Final</FormLabel>
            <Controller
              name="dataFinal"
              control={control}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <DatePickerEvent
                  onBlur={onBlur}
                  showDateSelect
                  selectsEnd
                  onChange={date => {
                    onChange(date);
                    setEndDate((date as unknown) as Date);
                  }}
                  selected={value ? new Date(value) : null}
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
