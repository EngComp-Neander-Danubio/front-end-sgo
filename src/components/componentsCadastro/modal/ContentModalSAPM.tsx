import {
  Flex,
  Text,
  FormControl,
  Button,
  Checkbox,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useEvents } from '../../../context/eventContext/useEvents';
import { optionsOPMs, OPMs } from '../../../types/typesOPM';
import { FormEditarEfetivo } from '../formEfetivo/FormEditarEfetivo';
import { SelectPattern } from './SelectPattern';
import { AccordionCheckbox } from '../acordion-checkbox/AccordionCheckbox';
import { columnsMapMilitar } from '../../../types/typesMilitar';
import { useSolicitacoesOPMPMs } from '../../../context/solicitacoesOPMPMsContext copy/useSolicitacoesOPMPMs';
import { TableSolicitacoes } from '../table-solicitacoes';
import { Pagination } from '../pagination/Pagination';
import { useCallback, useEffect, useState } from 'react';
import api from '../../../services/api';
import { FormEfetivoBySearch } from '../formEfetivo/FormEfetivoBySearch';

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
export const ContentModalSAPM: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<SolicitacaoForm>();
  const {
    handleDeleteOpmModal,
    handleDeleteSelectAllOpm,
    handleDeleteOpmFromSameFather,
  } = useEvents();
  const [dataGraCmd, setDataGraCmd] = useState<opmSaPM[]>([]);
  const [datasOpmFilhas, setDatasOpmFilhas] = useState<opmSaPM[]>([]);
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

  const {
    pms,
    handleClick,
    handleOnChange,
    handleOnSubmit,
    firstDataIndex,
    lastDataIndex,
    loadLessSolicitacoesOPMPMs,
    loadMoreSolicitacoesOPMPMs,
    loadPMByOPM,
    totalData,
    dataPerPage,
    deletePMByOPM,
  } = useSolicitacoesOPMPMs();

  const transformedMiltitares = pms.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });
  return (
    <FormControl>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Adicionar em grupo</Tab>
          <Tab>Adicionar individual</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
                    {data.uni_sigla.includes('CMTE-GERAL')
                      ? 'ADM'
                      : data.uni_sigla}
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
                  <Button
                    onClick={() => {
                      handleDeleteSelectAllOpm();
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
              minH="60px"
              maxH={'20vh'}
              w={'full'}
              overflowX={'auto'}
              //h={'60vh'}
              flexDirection={'column'}
              mt={4}
              p={2}
              gap={4}
            >
              <AccordionCheckbox
                handleDeleteOpmModal={handleDeleteOpmModal}
                opm={datasOpmFilhas}
                setDatasOpmFilhas={setDatasOpmFilhas}
              />
            </Flex>
            <Flex
              border="1px solid rgba(0, 0, 0, 0.16)"
              borderRadius="5px"
              minH="200px"
              w={'full'}
              overflowX={'auto'}
              mt={4}
              p={2}
              gap={4}
            >
              {/* tabela */}
              <Flex mt={2} flexDirection={'column'} w={'100%'}>
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
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            {/* <FormEditarEfetivo /> */}

            <FormEfetivoBySearch />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormControl>
  );
};
