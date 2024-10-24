import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  Checkbox,
  Flex,
  Text,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useToast,
} from '@chakra-ui/react';
import { OptionType, SelectPattern } from './SelectPattern';
import React, { useState } from 'react';
import {
  OPMs,
  options1CRPM,
  options2CRPM,
  options3CRPM,
  options4CRPM,
  optionsCPCHOQUE,
  optionsCPE,
  optionsCPRAIO,
  optionsDPGI,
  optionsEsp,
  optionsOPMs,
} from '../../../types/typesOPM';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FormEditarEfetivo } from '../formEfetivo/FormEditarEfetivo';
import {
  columnsMapMilitar,
  handleSortByPostoGrad,
  Militar,
  OPMOption,
} from '../../../types/typesMilitar';
import { TableFicha } from '../../componentesFicha/table';
import { Militares_service } from '../../../context/requisitosContext/RequisitosContext';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { CheckBoxPattern } from './CheckboxPattern';
import { FormEfetivoBySearch } from '../formEfetivo/FormEfetivoBySearch';
import { yupResolver } from '@hookform/resolvers/yup';
import { militarSchema } from '../../../types/yupMilitares/yupMilitares';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  opms: OPMs[];
  select_opm: OPMs;
  militaresRestantes: Militares_service[];
}

export const ModalSAPM: React.FC<IModal> = ({
  isOpen,
  onClose,
  select_opm,
  militaresRestantes,
}) => {
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

  const { loadLessMilitar, loadMoreMilitar, loadPMToPlanilha } = useMilitares();

  const transformedMiltitares = militaresRestantes.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });
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
  const handleDeleteSelectAllOpmCancel = () => {
    try {
      if (opm.length > 0) {
        setOPM([]);
        //reset();
      }
    } catch (err) {}
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
  const methodsInput = useForm<Militar>({
    resolver: yupResolver(militarSchema),
  });
  const { reset, control, getValues } = methodsInput;
  const onSubmit = async (data: Militar) => {
    loadPMToPlanilha(data);
    onClose();
    reset();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormProvider {...methodsInput}>
          <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
            <ModalContent
              w={'fit-content'}
              //h={'fit-content'}
              //h={'90vh'}
              maxW="80vw"
              minW="30vw"
              maxH="90vh"
              minH="fit-content"
            >
              <ModalHeader>
                <Center>Adicionar OPM</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody justifyContent="center" padding={4} gap={4}>
                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>Adicionar em grupo</Tab>
                    <Tab>Adicionar individual</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Divider />
                      <Flex gap={4} h="50px">
                        <Controller
                          name="todos"
                          control={control}
                          render={({ field: { onChange, onBlur } }) => (
                            <CheckBoxPattern
                              onChange={onChange}
                              handleCheckbox={handleCheckbox}
                              handleCheckboxChange={() =>
                                handleCheckboxChange('Todos')
                              }
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
                                    const v = getValues('select_opm');
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
                              render={({
                                field: { onChange, onBlur },
                                formState,
                              }) => (
                                <Button
                                  onClick={() => {
                                    const v = getValues('select_opm');
                                    if (
                                      v !== undefined &&
                                      v !== null &&
                                      v !== ''
                                    ) {
                                      handleSelectOpm(v as OPMs);
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
                        {opm.length > 0 &&
                          opm.map((item, index) => {
                            // Encontrar o rótulo correspondente usando o valor do item
                            const option = optionsOPMs.find(
                              op => op.value === item.valueOf(),
                            );

                            return (
                              <Flex key={index}>
                                <Controller
                                  name={`checkbox-${index}`}
                                  control={control}
                                  render={({ field: { onBlur } }) => (
                                    <>
                                      <Checkbox
                                        size="md"
                                        isChecked
                                        onBlur={onBlur}
                                        onChange={() => handleDeleteOpm(item)}
                                        colorScheme={'green'}
                                      >
                                        {option?.label || 'Item não encontrado'}
                                      </Checkbox>
                                    </>
                                  )}
                                />
                              </Flex>
                            );
                          })}
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
                        {/* <TableFicha
                      isOpen={militaresRestantes.length > 0}
                      columns={headerKeysMilitar}
                      registers={handleSortByPostoGrad()}
                      currentPosition={50}
                      rowsPerLoad={0}
                    /> */}
                        <TableFicha
                          isOpen={militaresRestantes.length > 0}
                          columns={[
                            'Matrícula',
                            'Posto/Graduação',
                            'Nome Completo',
                            'Unidade',
                          ]}
                          registers={handleSortByPostoGrad(
                            transformedMiltitares,
                            '1',
                          )}
                          currentPosition={0}
                          rowsPerLoad={100}
                          lessLoad={loadLessMilitar}
                          moreLoad={loadMoreMilitar}
                          isCheckBox={true}
                        />
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <FormEditarEfetivo />

                      {/* <FormEfetivoBySearch /> */}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => {
                    onClose();
                    reset();
                    handleDeleteSelectAllOpmCancel();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="ghost"
                  bgColor=" #38A169"
                  _hover={{
                    bgColor: 'green',
                    cursor: 'pointer',
                    transition: '.5s',
                  }}
                  color="#fff"
                  type="submit"
                  onClick={reset}
                >
                  Importar
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
