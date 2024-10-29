import {
  Flex,
  Text,
  FormControl,
  FormLabel,
  Button,
  Checkbox,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { OptionType, SelectPattern } from './SelectPattern';
import { OPMOption, options } from '../../../types/typesMilitar';
import { OPMs } from '../../../types/typesOPM';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { TableInput } from '../tableInput/TableInput';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { Pagination } from '../pagination/Pagination';
import { TableSolicitacoes } from '../table-solicitacoes';
import { CheckBoxPattern } from './CheckboxPattern';
import { useEvents } from '../../../context/eventContext/useEvents';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import api from '../../../services/api';
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
};
interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  opmsLabel: opmSaPM[];
  select_opm: opmSaPM;
  checkbox: opmSaPM[];
  input: string[];
}
export const FormSolicitacaoEfetivo: React.FC = () => {
  const { control, reset } = useFormContext<SolicitacaoForm>();
  const [opm, setOPM] = useState<OPMs[]>([]);
  const [dataGraCmd, setDataGraCmd] = useState<opmSaPM[]>([]);
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);

  const methodsInput = useFormContext();
  const { getValues, setValue } = methodsInput;
  const {
    loadIdsFromOPMsChildren,
    datasOPMSapm,
    datasOPMSapmChildren,
    handleDeleteOpmModal,
    handleDeleteSelectAllOpm,
    handleDeleteOpmFromSameFather,
    loadOPMfromLocal,
  } = useEvents();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    datasOpmFilhas.forEach((_, index) => {
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
  }, [datasOpmFilhas, getValues, methodsInput.setValue]);
  useEffect(() => {
    setValue('dataInicio', startDate || new Date());
  }, [startDate, setValue]);

  const handleDeleteAllOpmCancel = async () => {
    await handleDeleteSelectAllOpm();
  };
  const toast = useToast();
  const handleLoadGrandeComandos = useCallback(async () => {
    try {
      const response = await api.get<opmSaPM[]>('/unidades');
      const dados = response.data.map(item => ({
        ...item,
        opm_filha: [],
      }));
      setDataGraCmd(dados);
    } catch (error) {
      console.error('Erro ao carregar as unidades principais:', error);
    }
  }, []);
  useEffect(() => {
    handleLoadGrandeComandos();
  }, [handleLoadGrandeComandos]);

  const handleLoadOpmFilhas = async (param: number) => {
    try {
      // funcionando ok
      const gra_cmd = datasOpmFilhas.find(o => o.uni_codigo === param);
      if (!gra_cmd) {
        const uni = dataGraCmd.find(o => o.uni_codigo === param);
        setDatasOpmFilhas(prev => [...prev, uni]);
      }
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    }
  };

  const handleCheckboxChangeGrandeOPM = async (option: string) => {
    const dados = dataGraCmd.find(o => o.uni_sigla.includes(option));
    if (!dados) {
      throw new Error('Grande Comando não encontrado');
    }
    handleLoadOpmFilhas(dados.uni_codigo);
  };

  const handleSelectOpm = async (data: opmSaPM) => {
    const dataExists = datasOPMSapmChildren.some(
      dataValue => dataValue.uni_codigo === data.uni_codigo,
    );
    if (dataExists) {
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
      await loadOPMfromLocal(data);
    }
  };
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
      <Flex gap={4} h="50px">
        <Checkbox
          colorScheme="green"
          onChange={async e => {
            if (e.target.checked) {
              dataGraCmd.map(async v => {
                await handleLoadOpmFilhas(v.uni_codigo);
              });
            }
          }}
        >
          Todos
        </Checkbox>
        {dataGraCmd.map((data, index) => (
          <>
            <Checkbox
              key={index}
              onChange={async e => {
                if (e.currentTarget.checked) {
                  await handleCheckboxChangeGrandeOPM(data.uni_sigla);
                } else {
                  await handleDeleteOpmFromSameFather(data);
                }
              }}
              colorScheme="green"
            >
              {data.uni_sigla.includes('CMTE-GERAL') ? 'ADM' : data.uni_sigla}
            </Checkbox>
          </>
        ))}
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
            w={'25vw'}
          >
            <Controller
              name="select_opm"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <AsyncSelectComponent
                    placeholder="Buscar por OPM"
                    nameLabel=""
                    onChange={field.onChange}
                    error={error}
                    //isOverwriting
                    loadOptions={loadOptions}
                    noOptionsMessage={'Nenhuma OPM encontrada'}
                  />
                </>
              )}
            />
          </Flex>
          <Flex
            //border={'1px solid red'}
            gap={1}
            align={'center'}
            justify={'center'}
          >
            <Flex
            //border={'1px solid red'}
            >
              <Button
                onClick={() => {
                  handleDeleteAllOpmCancel();
                }}
                colorScheme="blue"
                variant="outline"
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
                  handleSelectOpm(v);
                }}
                bgColor="#38A169"
                _hover={{
                  bgColor: 'green',
                  cursor: 'pointer',
                  transition: '.5s',
                }}
                color="#fff"
                variant="ghost"
              >
                Incluir
              </Button>
            </Flex>
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
            <FormLabel w={'12vw'} flexWrap={'nowrap'} fontWeight={400}>
              Total Efetivo por OPM:
            </FormLabel>
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
                datasOpmFilhas.map(() => methodsInput.watch('totalEfetivo')),
              );
            }}
            bgColor=" #38A169"
            _hover={{
              bgColor: 'green',
              cursor: 'pointer',
              transition: '.5s',
            }}
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
        <TableInput
          isOpen={datasOpmFilhas.length > 0}
          isActions
          isCheckBox
          lengthData={datasOpmFilhas.length}
          currentPosition={0}
          rowsPerLoad={0}
          handleDeleteOpm={handleDeleteOpmModal}
          opmDatas={datasOpmFilhas}
        />
        {/* <Flex mt={2} flexDirection={'column'} w={'100%'}>
          <TableSolicitacoes
            isActions
            isOpen={true}
            isView={true}
            columns={['OPM']}
            registers={datasOPMSapmChildren.map(
              datas => (datas.uni_nome as unknown) as { [key: string]: any }[],
            )}
            //registers={handleSortByPostoGrad(transformedMiltitares, '1')}
            label_tooltip="OPM"
            height={'32vh'}
            handleDelete={() => handleDeleteOpmModal}
          />
          <Pagination
            totalPages={totalData}
            dataPerPage={dataPerPage}
            firstDataIndex={firstDataIndex}
            lastDataIndex={lastDataIndex}
            loadLess={loadLessSolicitacoesOPMPMs}
            loadMore={loadMoreSolicitacoesOPMPMs}
          />
        </Flex> */}
      </Flex>
    </FormControl>
  );
};
