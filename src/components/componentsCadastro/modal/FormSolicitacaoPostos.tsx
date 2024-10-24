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
import { options } from '../../../types/typesMilitar';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { useEvents } from '../../../context/eventContext/useEvents';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { AccordionCheckbox } from '../acordion-checkbox/AccordionCheckbox';

interface SolicitacaoForm {
  dataInicio: Date;
  dataFinal: Date;
  opmsLabel: opmSaPM[];
  select_opm: opmSaPM;
  checkbox: opmSaPM[];
}
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
};
export const FormSolicitacaoPostos: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<SolicitacaoForm>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    loadIdsFromOPMsChildren,
    datasOPMSapm,
    datasOPMSapmChildren,
    handleDeleteOpmModal,
    handleDeleteSelectAllOpm,
    handleDeleteOpmFromSameFather,
    loadOPMfromLocal,
  } = useEvents();

  useEffect(() => {
    setValue('dataInicio', startDate || new Date());
  }, [startDate, setValue]);

  const handleDeleteAllOpmCancel = async () => {
    await handleDeleteSelectAllOpm();
  };
  const toast = useToast();
  const handleCheckboxChangeGrandeOPM = async (option: string) => {
    const dados = datasOPMSapm.find(o => o.uni_sigla.includes(option));
    if (!dados) {
      throw new Error('Grande Comando não encontrado');
    }
    await loadIdsFromOPMsChildren(dados.uni_codigo);
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
      <Flex gap={4} h="50px">
        <Checkbox
          colorScheme="green"
          onChange={async e => {
            if (e.target.checked) {
              datasOPMSapm.map(async v => {
                await loadIdsFromOPMsChildren(v.uni_codigo);
              });
            }
          }}
        >
          Todos
        </Checkbox>
        {datasOPMSapm.map((data, index) => (
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
              {data.uni_sigla}
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
        gap={1}
      >
        <Flex
        //border={'1px solid red'}
        >
          <Text w={'7vw'}>Busca por OPM:</Text>
        </Flex>
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
        <Flex gap={1} align={'center'} justify={'center'}>
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
        {/* {datasOPMSapmChildren.map((item, index) => {
          return (
            <>
              <Flex key={index}>
                <Controller
                  name={`opmsLabel.${index}`}
                  control={control}
                  render={({ field: { onBlur, onChange } }) => (
                    <>
                      <Checkbox
                        size="md"
                        isChecked
                        onBlur={onBlur}
                        onChange={async () => {
                          await handleDeleteOpmModal(item);
                        }}
                        colorScheme={'green'}
                      >
                        <Input
                          value={
                            item.uni_sigla.includes('1ºCRPM') ||
                            item.uni_sigla.includes('2ºCRPM') ||
                            item.uni_sigla.includes('3ºCRPM') ||
                            item.uni_sigla.includes('4ºCRPM')
                              ? item.uni_sigla + ' - ' + item.uni_nome
                              : item.uni_nome || 'Item não encontrado'
                          }
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
              <AccordionCheckbox
                handleDeleteOpmModal={handleDeleteOpmModal}
                dataOPMs={datasOPMSapmChildren}
              ></AccordionCheckbox>
            </>
          );
        })} */}
        <AccordionCheckbox
          handleDeleteOpmModal={handleDeleteOpmModal}
          dataOPMs={datasOPMSapmChildren}
          filhas={datasOPMSapmChildren}
        ></AccordionCheckbox>
      </Flex>
    </FormControl>
  );
};
