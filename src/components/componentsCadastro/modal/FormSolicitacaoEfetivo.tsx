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
import { TableInput } from '../tableInput/TableInput';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { Pagination } from '../pagination/Pagination';
import { TableSolicitacoes } from '../table-solicitacoes';
import { CheckBoxPattern } from './CheckboxPattern';

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
      <Flex gap={4} h="50px">
        <Controller
          name="todos"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChange={() => handleCheckboxChange('Todos')}
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'Todos'}
              optionsOPMs={optionsOPMs}
            />
          )}
        />
        <Controller
          name="checkbox1crpm"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('1crpm')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'1° CRPM'}
              optionsOPMs={options1CRPM}
            />
          )}
        />
        <Controller
          name="checkbox2crpm"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('2crpm')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'2° CRPM'}
              optionsOPMs={options2CRPM}
            />
          )}
        />
        <Controller
          name="checkbox3crpm"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('3crpm')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'3° CRPM'}
              optionsOPMs={options3CRPM}
            />
          )}
        />
        <Controller
          name="checkbox4crpm"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('4crpm')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'4° CRPM'}
              optionsOPMs={options4CRPM}
            />
          )}
        />
        <Controller
          name="checkboxcpchoque"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('cpchoque')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'CPCHOQUE'}
              optionsOPMs={optionsCPCHOQUE}
            />
          )}
        />
        <Controller
          name="checkboxcpraio"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('cpraio')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'CPRAIO'}
              optionsOPMs={optionsCPRAIO}
            />
          )}
        />
        <Controller
          name="checkboxcpe"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChangeGrandeOPM={() =>
                handleCheckboxChangeGrandeOPM('cpe')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'CPE'}
              optionsOPMs={optionsCPE}
            />
          )}
        />
        <Controller
          name="checkboxdgpi"
          control={control}
          render={({ field: { onChange, onBlur } }) => (
            <CheckBoxPattern
              onChange={onChange}
              handleCheckbox={handleCheckbox}
              handleCheckboxChange={() =>
                handleCheckboxChange('Setores Administrativos')
              }
              onBlur={onBlur}
              //value={value}
              labelCheckbox={'Setores Instrumentais'}
              optionsOPMs={optionsDPGI}
            />
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
                    //onChange(v);
                  }}
                  bgColor=" #38A169"
                  _hover={{
                    bgColor: 'green',
                    cursor: 'pointer',
                    transition: '.5s',
                  }}
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
                opm.map(() => methodsInput.watch('totalEfetivo')),
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
          isOpen={opm.length > 0}
          isActions
          isCheckBox
          lengthData={opm.length}
          currentPosition={0}
          rowsPerLoad={0}
          handleDeleteOpm={handleDeleteOpm}
          opmDatas={opm}
        />
        {/* <Flex mt={2} flexDirection={'column'} w={'100%'}>
          <TableSolicitacoes
            isActions
            isOpen={true}
            isView={true}
            columns={[
              'Matrícula',
              'Posto/Graduação',
              'Nome Completo',
              'Unidade',
            ]}
            registers={transformedMiltitares}
            //registers={handleSortByPostoGrad(transformedMiltitares, '1')}
            label_tooltip="Militar"
            height={'32vh'}
            handleDelete={deletePMByOPM}
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
