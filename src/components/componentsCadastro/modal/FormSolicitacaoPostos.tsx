import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  Divider,
  useToast,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionType, SelectPattern } from './SelectPattern';
import { OPMOption } from '../../../types/typesMilitar';
import {
  optionsOPMs,
  optionsEsp,
  optionsDPGI,
  options1CRPM,
  options2CRPM,
  options3CRPM,
  options4CRPM,
  optionsCPCHOQUE,
  optionsCPRAIO,
  optionsCPE,
  OPMs,
} from '../../../types/typesOPM';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';

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
  opmsLabel: OPMs[];
  select_opm: OPMs;
}
export const FormSolicitacaoPostos: React.FC = () => {
  const {
    control,
    setValue,
    trigger,
    watch,
    reset,
    getValues,
  } = useFormContext<SolicitacaoForm>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  useEffect(() => {
    setValue('dataInicio', startDate || new Date());
  }, [startDate, setValue]);

  const [selectedCheckbox, setSelectedCheckbox] = useState<
    'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos' | null
  >(null);
  const [selectedCheckboxGrandeOPMs, setSelectedCheckboxGrandeOPMs] = useState<
    OPMOption
  >(null);
  const [opm, setOPM] = useState<OPMs[]>([]);

  const toast = useToast();
  const handleCheckboxChange = (
    option: 'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos',
  ) => {
    setSelectedCheckbox(option);
  };

  const handleCheckboxChangeGrandeOPM = (
    option:
      | '1crpm'
      | '2crpm'
      | '3crpm'
      | '4crpm'
      | 'cpchoque'
      | 'cpe'
      | 'cpraio',
  ) => {
    setSelectedCheckboxGrandeOPMs(option);
  };
  const handleCheckbox = (e: any, value: OptionType) => {
    if (e === true) {
      setOPM(prev => [
        ...prev,
        ...value.map(option => {
          return option.value;
        }),
      ]);
    } else {
      setOPM(prev =>
        prev.filter(option => !value.some(o => o.value === option)),
      );
    }
  };

  const handleSelectOpm = (option: OPMs) => {
    if (opm.find(o => o.valueOf() === option.valueOf())) {
      toast({
        title: 'OPM já inclusa.',
        description: 'OPM já incluída.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    } else {
      toast({
        title: 'Sucesso!',
        description: 'OPM incluída.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setOPM(prev => [...prev, option]);
    }

    console.log(opm);
  };

  const handleDeleteSelectAllOpm = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);

        reset();
        toast({
          title: 'Exclusão de OPMs.',
          description: 'OPMs excluída com sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (err) {
      toast({
        title: 'Erro!',
        description: 'OPM não encontrada na lista.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleDeleteOpm = (option: OPMs) => {
    if (opm.some(o => o === option)) {
      // Remove a OPM da lista
      const updatedOpm = opm.filter(o => o !== option);

      setOPM(updatedOpm);
      //reset();
      toast({
        title: 'Exclusão de OPMs.',
        description: 'OPM excluída com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } else {
      toast({
        title: 'Erro!',
        description: 'OPM não encontrada na lista.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <FormControl
      //border={'1px solid green'}
      mb={4}
      zIndex={0.1}
    >
      <Flex
        align="center"
        //justify="center"
        gap={2}
      >
        <Flex
          align={'center'}
          justify="center"
          flexDirection={'row'}
          gap={6}
          pb={2}
        >
          <Flex flexDirection="column" gap={1} w={'12vw'}>
            <FormLabel>Prazo Inicial</FormLabel>
            <Controller
              name="dataInicio"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
                  //showPopperArrow={true}
                  selectsStart
                  onChange={date => {
                    field.onChange(date);
                    setStartDate(date as Date);
                  }}
                  selected={field.value ? new Date(field.value) : new Date()}
                  startDate={startDate}
                  endDate={endDate}
                  error={error}
                />
              )}
            />
          </Flex>
          <Flex flexDirection="column" gap={1} w={'12vw'} zIndex={1}>
            <FormLabel>Prazo Final</FormLabel>
            <Controller
              name="dataFinal"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePickerEvent
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

      <Divider />

      <Flex gap={4} flexDirection="row" h="50px">
        <Controller
          name="todos"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckbox === 'Todos'}
              onChange={e => {
                handleCheckboxChange('Todos');
                handleCheckbox(e.currentTarget.checked, optionsOPMs);
                //console.log('', opm);
              }}
              onBlur={onBlur}
              //value={value}
            >
              Todos
            </Checkbox>
          )}
        />
        <Controller
          name="checkboxespecializadas"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckbox === 'especializadas'}
              onChange={e => {
                handleCheckboxChange('especializadas');

                handleCheckbox(e.currentTarget.checked, optionsEsp);
                //console.log('', opm);
              }}
              onBlur={onBlur}
              //value={value}
            >
              Especializadas
            </Checkbox>
          )}
        />
        <Checkbox
          size="md"
          //isChecked={selectedCheckbox === 'POG'}
          onChange={() => handleCheckboxChange('POG')}
        >
          POG
        </Checkbox>
        <Controller
          name="checkboxdgpi"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              /* isChecked={
                            selectedCheckbox === 'Setores Administrativos'
                          } */
              onChange={e => {
                handleCheckboxChange('Setores Administrativos');
                handleCheckbox(e.currentTarget.checked, optionsDPGI);
                //console.log('', opm);
              }}
              onBlur={onBlur}
              //value={value}
            >
              Setores Administrativos
            </Checkbox>
          )}
        />
      </Flex>

      <Divider />
      <Flex gap={4} h="50px">
        <Controller
          name="checkbox1crpm"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckboxGrandeOPMs === '1crpm'}
              onChange={e => {
                handleCheckboxChangeGrandeOPM('1crpm');
                handleCheckbox(e.currentTarget.checked, options1CRPM);
                //console.log('', opm);
              }}
              onBlur={onBlur}
              //value={value}
            >
              1° CRPM
            </Checkbox>
          )}
        />
        <Controller
          name="checkbox2crpm"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckboxGrandeOPMs === '2crpm'}
              onChange={e => {
                handleCheckboxChangeGrandeOPM('2crpm');
                handleCheckbox(e.currentTarget.checked, options2CRPM);
              }}
              onBlur={onBlur}
              //value={value}
            >
              2° CRPM
            </Checkbox>
          )}
        />
        <Controller
          name="checkbox3crpm"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckboxGrandeOPMs === '3crpm'}
              onChange={e => {
                handleCheckboxChangeGrandeOPM('3crpm');
                handleCheckbox(e.currentTarget.checked, options3CRPM);
              }}
              onBlur={onBlur}
              //value={value}
            >
              3° CRPM
            </Checkbox>
          )}
        />
        <Controller
          name="checkbox4crpm"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              //isChecked={selectedCheckboxGrandeOPMs === '4crpm'}
              onChange={e => {
                handleCheckboxChangeGrandeOPM('4crpm');
                handleCheckbox(e.currentTarget.checked, options4CRPM);
              }}
              onBlur={onBlur}
              //value={value}
            >
              4° CRPM
            </Checkbox>
          )}
        />
        <Controller
          name="checkboxcpchoque"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              onChange={e => {
                handleCheckboxChangeGrandeOPM('4crpm');
                handleCheckbox(e.currentTarget.checked, optionsCPCHOQUE);
              }}
              onBlur={onBlur}
              //value={value}
            >
              CPCHOQUE
            </Checkbox>
          )}
        />
        <Controller
          name="checkboxcpraio"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              onChange={e => {
                handleCheckboxChangeGrandeOPM('cpraio');
                handleCheckbox(e.currentTarget.checked, optionsCPRAIO);
              }}
              onBlur={onBlur}
              //value={value}
            >
              CPRAIO
            </Checkbox>
          )}
        />
        <Controller
          name="checkboxcpe"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Checkbox
              size="md"
              onChange={e => {
                handleCheckboxChangeGrandeOPM('cpe');
                handleCheckbox(e.currentTarget.checked, optionsCPE);
              }}
              onBlur={onBlur}
              //value={value}
            >
              CPE
            </Checkbox>
          )}
        />
      </Flex>
      <Divider />

      <Flex
        flexDirection="row"
        w="100%"
        h="50px"
        //mt={2}
        align="center"
        justify={'center'}
        justifyContent="space-between"
      >
        <Flex
        //border={'1px solid red'}
        >
          <Text w={'7vw'}>Busca por OPM:</Text>
        </Flex>
        <Flex gap={1}>
          <Flex
          //border={'1px solid red'}
          >
            <Controller
              name="select_opm"
              control={control}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => {
                return (
                  <SelectPattern
                    onChange={value => {
                      onChange(value);
                      handleSelectOpm((value as unknown) as OPMs);
                      //setOPM(value);
                    }}
                    onBlur={onBlur}
                    w="30vw"
                    options={optionsOPMs}
                    error={error}
                  />
                );
              }}
            />
          </Flex>
          <Flex
          //border={'1px solid red'}
          >
            <Button
              onClick={value => {
                handleDeleteSelectAllOpm();
              }}
              colorScheme="blue"
              variant="outline"
              //color={'#fff'}
            >
              Limpar
            </Button>
          </Flex>
          <Flex
          //border={'1px solid red'}
          >
            <Button
              onClick={() => {
                const v = getValues('select_opm');
                if (v !== undefined && v !== null && v !== ('' as OPMs)) {
                  handleSelectOpm((v as unknown) as OPMs);
                }
                //onChange(v);
              }}
              bgColor="#38A169"
              color="#fff"
              variant="ghost"
            >
              Incluir
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Divider />

      <Flex
        border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        //minH="60px"
        maxH={'30vh'}
        h={'60vh'}
        w={'full'}
        overflowX={'auto'}
        flexDirection={'column'}
        mt={4}
        p={2}
        gap={4}
      >
        {opm.length > 0 &&
          opm.map((item, index) => {
            // Encontrar o rótulo correspondente usando o valor do item
            const option = optionsOPMs.find(op => op.value === item.valueOf());

            return (
              <Flex key={index}>
                <Controller
                  name={`opmsLabel.${index}`}
                  control={control}
                  defaultValue={(option?.label || '') as OPMs}
                  render={({ field: { onBlur, value, onChange } }) => (
                    <>
                      <Checkbox
                        size="md"
                        isChecked
                        onBlur={onBlur}
                        onChange={e => {
                          const isChecked = e.target.checked;
                          onChange(isChecked ? option?.label : '');
                          if (!isChecked) {
                            () => handleDeleteOpm(item);
                          }
                        }}
                        //value={option?.value}
                      >
                        <Input
                          value={option?.label || 'Item não encontrado'}
                          onChange={e => onChange(e.target.value)}
                          border={'none'}
                          w={'50vw'}
                          h={'2vh'}
                        />
                      </Checkbox>
                    </>
                  )}
                />
              </Flex>
            );
          })}
      </Flex>
    </FormControl>
  );
};
