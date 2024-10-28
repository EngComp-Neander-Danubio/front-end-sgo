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
import { options } from '../../../types/typesMilitar';
import { DatePickerEvent } from '../formGrandeEvento/DatePickerEvent';
import { useEvents } from '../../../context/eventContext/useEvents';
import AsyncSelectComponent from '../formEfetivo/AsyncSelectComponent';
import { OptionsOrGroups, GroupBase } from 'react-select';
import { AccordionCheckbox } from '../acordion-checkbox/AccordionCheckbox';
import api from '../../../services/api';

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
  opm_filha: opmSaPM[];
};
export const FormSolicitacaoPostos: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<SolicitacaoForm>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dataGraCmd, setdataGraCmd] = useState<opmSaPM[]>([]);
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);
  const {
    loadIdsFromOPMsChildren,
    datasOPMSapmChildren,
    handleDeleteOpmModal,
    handleDeleteSelectAllOpm,
    handleDeleteOpmFromSameFather,
  } = useEvents();

  useEffect(() => {
    setValue('dataInicio', startDate || new Date());
  }, [startDate, setValue]);

  const handleDeleteAllOpmCancel = async () => {
    await handleDeleteSelectAllOpm();
  };
  const toast = useToast();
  const handleLoadGrandeComandos = async () => {
    console.log('carregou os grande comandos');
    try {
      //const response = await api.get<opmSaPM[]>('/unidades');
      /* const dados = response.data.map(item => ({
        ...item,
        opm_filha: [],
      })); */
      setdataGraCmd([
        {
          uni_codigo_pai: 0,
          uni_codigo: 1,
          uni_sigla: '1ºCRPM',
          uni_nome: 'Comando Regional de Policiamento Metropolitano',
          opm_filha: [
            {
              uni_codigo_pai: 1,
              uni_codigo: 11,
              uni_sigla: '1ºBPM',
              uni_nome: '1º Batalhão de Polícia Militar',
              opm_filha: [
                {
                  uni_codigo_pai: 11,
                  uni_codigo: 111,
                  uni_sigla: '1ªCIA',
                  uni_nome: '1ª Companhia do 1º Batalhão',
                  opm_filha: [],
                },
                {
                  uni_codigo_pai: 11,
                  uni_codigo: 112,
                  uni_sigla: '2ªCIA',
                  uni_nome: '2ª Companhia do 1º Batalhão',
                  opm_filha: [],
                },
              ],
            },
            {
              uni_codigo_pai: 1,
              uni_codigo: 12,
              uni_sigla: '2ºBPM',
              uni_nome: '2º Batalhão de Polícia Militar',
              opm_filha: [
                {
                  uni_codigo_pai: 12,
                  uni_codigo: 121,
                  uni_sigla: '1ªCIA',
                  uni_nome: '1ª Companhia do 2º Batalhão',
                  opm_filha: [],
                },
                {
                  uni_codigo_pai: 12,
                  uni_codigo: 122,
                  uni_sigla: '2ªCIA',
                  uni_nome: '2ª Companhia do 2º Batalhão',
                  opm_filha: [],
                },
              ],
            },
          ],
        },
        {
          uni_codigo_pai: 0,
          uni_codigo: 2,
          uni_sigla: '2ºCRPM',
          uni_nome: 'Comando Regional de Policiamento do Interior',
          opm_filha: [
            {
              uni_codigo_pai: 2,
              uni_codigo: 21,
              uni_sigla: '3ºBPM',
              uni_nome: '3º Batalhão de Polícia Militar',
              opm_filha: [
                {
                  uni_codigo_pai: 21,
                  uni_codigo: 211,
                  uni_sigla: '1ªCIA',
                  uni_nome: '1ª Companhia do 3º Batalhão',
                  opm_filha: [],
                },
                {
                  uni_codigo_pai: 21,
                  uni_codigo: 212,
                  uni_sigla: '2ªCIA',
                  uni_nome: '2ª Companhia do 3º Batalhão',
                  opm_filha: [],
                },
              ],
            },
            {
              uni_codigo_pai: 2,
              uni_codigo: 22,
              uni_sigla: '4ºBPM',
              uni_nome: '4º Batalhão de Polícia Militar',
              opm_filha: [
                {
                  uni_codigo_pai: 22,
                  uni_codigo: 221,
                  uni_sigla: '1ªCIA',
                  uni_nome: '1ª Companhia do 4º Batalhão',
                  opm_filha: [],
                },
                {
                  uni_codigo_pai: 22,
                  uni_codigo: 222,
                  uni_sigla: '2ªCIA',
                  uni_nome: '2ª Companhia do 4º Batalhão',
                  opm_filha: [],
                },
              ],
            },
          ],
        },
      ]);
      console.log(dataGraCmd);
    } catch (error) {
      console.error('Erro ao carregar as unidades principais:', error);
    }
  };
  useEffect(() => {
    handleLoadGrandeComandos();
  }, []);
  const rec_opm = async (param: number, new_opm: opmSaPM[], opm: opmSaPM) => {
    const opmForm = new_opm.map(o => ({
      ...o,
      opm_filha: o.opm_filha || [],
    }));

    if (opm?.opm_filha) {
      await rec_opm(param, opmForm, opm.opm_filha);
    }
    if (opm?.uni_codigo === param) {
      opm.opm_filha = opmForm;
      return opm;
    }
    return;
  };
  const handleLoadOpmFilhas = async (param: number) => {
    try {
      const gra_cmd = datasOpmFilhas.find(o => o.uni_codigo === param);
      if (!gra_cmd) {
        const uni = dataGraCmd.find(o => o.uni_codigo === param);
        setDatasOpmFilhas(prev => [...prev, uni]);
      }
      //const response = await api.get<opmSaPM[]>(`/unidadesfilhas/${param}`);

      /* await Promise.all(
        datasOPMSapmChildren.map(async o => {
          await rec_opm(param, response.data, o);
        }),
      ); */
      datasOpmFilhas.map(async o => {
        await rec_opm(param, dataGraCmd, o?.opm_filha);
      });
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
    const dataExists = datasOpmFilhas.some(
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
              dataGraCmd.map(async v => {
                await loadIdsFromOPMsChildren(v.uni_codigo);
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
        <AccordionCheckbox
          handleDeleteOpmModal={handleDeleteOpmModal}
          opm={datasOpmFilhas}
        ></AccordionCheckbox>
      </Flex>
    </FormControl>
  );
};
