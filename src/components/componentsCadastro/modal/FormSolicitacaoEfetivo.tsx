import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Button,
  Checkbox,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { DatePickerRequisitos } from './DatePickerRequisitos';
import { DatePickerTime } from './DatePickerTime';
import { OptionType, SelectPattern } from './SelectPattern';
import { optionsModalidade } from '../../../types/typesModalidade';
import { OPMOption, optionsMilitares } from '../../../types/typesMilitar';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { TableInput } from '../tableInput/TableInput';
import { InputPatternController } from '../inputPatternController/InputPatternController';

interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  opmsLabel: OPMs[];
  input: string[];
  checkboxespecializadas: boolean;
  checkboxdgpi: boolean;
  checkbox1crpm: boolean;
  checkbox2crpm: boolean;
  checkbox3crpm: boolean;
  checkbox4crpm: boolean;
  checkboxcpchoque: boolean;
  checkboxcpraio: boolean;
  checkboxcpe: boolean;
  button_apagar: any;
  button: any;
}
export const FormSolicitacaoEfetivo: React.FC = () => {
  const { control, reset } = useFormContext<SolicitacaoForm>();
  const [opm, setOPM] = useState<OPMs[]>([]);
  const methodsInput = useFormContext();
  const { getValues, setValue } = methodsInput;
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos' | null
  >(null);
  const [selectedCheckboxGrandeOPMs, setSelectedCheckboxGrandeOPMs] = useState<
    OPMOption
  >(null);

  useEffect(() => {
    opm.forEach((_, index) => {
      const inputTotalValue = getValues('totalEfetivo');
      const currentValue = getValues(`input.${index}`) ?? '';

      if (currentValue === undefined || currentValue === null) {
        methodsInput.setValue(`input.${index}`, '');
        //console.log(`input.${index}`);
        //methodsInput.setValue(`checkbox.${index}`, true);
      } else if (currentValue === '') {
        //console.log(`input.${index}`);
        methodsInput.setValue(`input.${index}`, inputTotalValue || '');
        methodsInput.setValue(`checkbox.${index}`, true);
      }
    });
  }, [opm, getValues, methodsInput.setValue]);
  useEffect(() => {
    setValue('dataInicio', startDate || new Date());
  }, [startDate, setValue]);

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
  /* const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  }, []); */
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

  const handleDeleteOpm = (option: OPMs) => {
    const indexDeletedOpm = opm.findIndex(o => o.includes(option));
    if (indexDeletedOpm < 0) {
      toast({
        title: 'Erro!',
        description: 'OPM não encontrada na lista.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    const updatedOpm = opm.filter(o => !o.includes(option));
    //console.log({ option, opm, indexDeletedOpm, updatedOpm });
    if (updatedOpm.length !== opm.length) {
      setOPM(updatedOpm);
      toast({
        title: 'Exclusão de OPMs.',
        description: 'OPM excluída com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
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

  return (
    <FormControl
      //border={'1px solid green'}
      mb={4}
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
                  showPopperArrow={true}
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
          <Flex flexDirection="column" gap={1} w={'12vw'}>
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
        <Checkbox
          size="md"
          //isChecked={selectedCheckbox === 'Todos'}
          onChange={e => {
            handleCheckboxChange('Todos');
            handleCheckbox(e.currentTarget.checked, optionsOPMs);
            //console.log('', opm);
          }}
        >
          Todos
        </Checkbox>

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
                      // handleSelectOpm(value as OPMs);
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
            <Controller
              name="button_apagar"
              control={control}
              render={({ field: { onChange, onBlur } }) => (
                <Button
                  onClick={value => {
                    onChange(value);
                    handleDeleteSelectAllOpm();
                  }}
                  colorScheme="blue"
                  variant="outline"
                  //color={'#fff'}
                  onBlur={onBlur}
                >
                  Limpar
                </Button>
              )}
            />
          </Flex>
          <Flex
          //border={'1px solid red'}
          >
            <Controller
              name="button"
              control={control}
              render={({ field: { onChange, onBlur }, formState }) => (
                <Button
                  onClick={() => {
                    const v = getValues('select_opm');
                    if (v !== undefined && v !== null && v !== '') {
                      handleSelectOpm((v as unknown) as OPMs);
                    }
                    onChange(v);
                  }}
                  bgColor="#38A169"
                  color="#fff"
                  onBlur={onBlur}
                  variant="ghost"
                >
                  Incluir
                </Button>
              )}
            />
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex
        //border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        minH="60px"
        w={'full'}
        overflowX={'auto'}
        justifyContent={'space-between'}
      >
        <Flex justify={'center'} align={'center'}>
          <Flex flexDirection={'row'} align={'center'} justify={'center'}>
            <FormLabel w={'7vw'}>Total Efetivo:</FormLabel>
            <Controller
              name={'totalEfetivo'}
              control={methodsInput.control}
              //defaultValue={methodsInput.formState.defaultValues}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <InputPatternController
                  type="text"
                  w={'400px'}
                  placeholder="Informe total efetivo"
                  onChange={e => {
                    onChange(e);
                  }}
                  onBlur={onBlur}
                  value={value}
                  error={error}
                />
              )}
            />
          </Flex>
        </Flex>
        <Flex
          //border={'1px solid red'}
          justify={'center'}
          align={'center'}
        >
          <Button
            onClick={async () => {
              methodsInput.setValue(
                'input',
                opm.map(() => methodsInput.watch('totalEfetivo')),
              );
            }}
            bgColor="#38A169"
            color="#fff"
            variant="ghost"
          >
            Inserir
          </Button>
        </Flex>
      </Flex>
      <Divider mt={2} />
      <Flex
        border="1px solid rgba(0, 0, 0, 0.16)"
        borderRadius="5px"
        //minH="200px"
        //h={'fit-content'}
        w={'full'}
        overflowX={'auto'}
        overflowY={'auto'}
        //border={'1px solid red'}
        mt={4}
        p={2}
        gap={4}
      >
        {/* <TableOPMs
                  isOpen={militaresRestantes.length > 0}
                  columns={['OPM']}
                  registers={optionsOPMs.filter(op =>
                    opm.includes(op.value as OPMs),
                  )} // Filtragem correta
                  currentPosition={0}
                  rowsPerLoad={100}
                  lessLoad={loadLessMilitar}
                  moreLoad={loadMoreMilitar}
                  isCheckBox={true}
                  isActions={true}
                  handleDeleteOpm={handleDeleteOpm}
                /> */}
        <TableInput
          isOpen={opm.length > 0}
          isActions
          isCheckBox
          lengthData={opm.length}
          currentPosition={0}
          rowsPerLoad={0}
          handleDeleteOpm={handleDeleteOpm}
          opmDatas={opm}
        />
      </Flex>
    </FormControl>
  );
};
