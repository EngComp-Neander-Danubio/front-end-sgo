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
import { OPMs, options1CRPM, optionsOPMs } from '../../../types/typesOPM';
import { Controller, useForm } from 'react-hook-form';
import { ModalFormAddMilitar } from './ModalFormAddMilitar';
import { FormEfetivo } from '../formEfetivo/FormEfetivo';

interface IModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  opms: OPMs[];
  select_opm: OPMs;
}

export const ModalSAPM: React.FC<IModal> = ({
  isOpen,
  onClose,
  select_opm,
}) => {
  const { control, reset, getValues } = useForm();
  const [selectedCheckbox, setSelectedCheckbox] = useState<
    'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos' | null
  >(null);
  const [selectedCheckboxGrandeOPMs, setSelectedCheckboxGrandeOPMs] = useState<
    '1crpm' | '2crpm' | '3crpm' | '4crpm' | null
  >(null);
  const [opm, setOPM] = useState<OPMs[]>([]);
  const toast = useToast();
  const handleCheckboxChange = (
    option: 'Todos' | 'especializadas' | 'POG' | 'Setores Administrativos',
  ) => {
    setSelectedCheckbox(option);
  };
  const handleCheckboxChangeGrandeOPM = (
    option: '1crpm' | '2crpm' | '3crpm' | '4crpm',
  ) => {
    setSelectedCheckboxGrandeOPMs(option);
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
        //reset();
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="50vw" minW="30vw" maxH="80vh" minH="40vh">
          <ModalHeader>
            <Center>Adicionar/Excluir OPM</Center>
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
                  <Flex gap={4} flexDirection="row" h="50px">
                    <Checkbox
                      size="md"
                      isChecked={selectedCheckbox === 'Todos'}
                      onChange={() => handleCheckboxChange('Todos')}
                    >
                      Todos
                    </Checkbox>
                    <Checkbox
                      size="md"
                      isChecked={selectedCheckbox === 'especializadas'}
                      onChange={() => handleCheckboxChange('especializadas')}
                    >
                      Especializadas
                    </Checkbox>
                    <Checkbox
                      size="md"
                      isChecked={selectedCheckbox === 'POG'}
                      onChange={() => handleCheckboxChange('POG')}
                    >
                      POG
                    </Checkbox>
                    <Checkbox
                      size="md"
                      isChecked={selectedCheckbox === 'Setores Administrativos'}
                      onChange={() =>
                        handleCheckboxChange('Setores Administrativos')
                      }
                    >
                      Setores Administrativos
                    </Checkbox>
                  </Flex>

                  <Divider />
                  <Flex gap={4} h="50px">
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckboxGrandeOPMs === '1crpm'}
                      onChange={() => handleCheckboxChangeGrandeOPM('1crpm')}
                    >
                      1° CRPM
                    </Checkbox>
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckboxGrandeOPMs === '2crpm'}
                      onChange={() => handleCheckboxChangeGrandeOPM('2crpm')}
                    >
                      2° CRPM
                    </Checkbox>
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckboxGrandeOPMs === '3crpm'}
                      onChange={() => handleCheckboxChangeGrandeOPM('3crpm')}
                    >
                      3° CRPM
                    </Checkbox>
                    <Checkbox
                      size="md"
                      //isChecked={selectedCheckboxGrandeOPMs === '4crpm'}
                      onChange={() => handleCheckboxChangeGrandeOPM('4crpm')}
                    >
                      4° CRPM
                    </Checkbox>
                    <Checkbox size="md">CPCHOQUE</Checkbox>
                    <Checkbox size="md">CPRAIO</Checkbox>
                    <Checkbox size="md">CPE</Checkbox>
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
                          render={({ field: { onChange, onBlur } }) => (
                            <SelectPattern
                              onChange={value => {
                                onChange(value);
                                //handleSelectOpm((value as unknown) as OPMs);
                              }}
                              onBlur={onBlur}
                              w="30vw"
                              options={optionsOPMs}
                            />
                          )}
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
                          render={({ field: { onChange, onBlur } }) => (
                            <Button
                              onClick={value => {
                                const v = getValues('select_opm');
                                onChange(value);
                                if (v !== undefined || v !== null || v !== '')
                                  handleSelectOpm((v as unknown) as OPMs);
                              }}
                              bgColor=" #38A169"
                              color={'#fff'}
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
                    minH="200px"
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
                          <Flex flexWrap={'wrap'} key={index}>
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
                </TabPanel>
                <TabPanel>
                  <FormEfetivo />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="ghost"
              bgColor="#38A169"
              color="#fff"
              type="submit"
              onClick={reset}
            >
              Importar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
