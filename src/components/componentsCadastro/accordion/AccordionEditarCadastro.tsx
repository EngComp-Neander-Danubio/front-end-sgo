import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  AccordionProps,
  Flex,
  Button,
  useDisclosure,
  Divider,
  FlexboxProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BiPencil } from 'react-icons/bi';
import { ModalRequesitos } from '../modal/ModalRequesitos';
import { BotaoCadastrar } from '../botaoCadastrar';

import { TableFicha } from '../../componentesFicha/table';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { FaFileUpload } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import React, { useEffect } from 'react';
import { ModalRelatorio } from '../modal/ModalRelatorio';
import { ModalRestantes } from '../modal/ModalRestantes';
import { ModalSAPM } from '../modal/ModalSAPM';
import { OPMs } from '../../../types/typesOPM';
import { useEvents } from '../../../context/eventContext/useEvents';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';
import { ModalServices } from '../modal/ModalServices';
import {
  columnsMapMilitar,
  handleSortByPostoGrad,
} from '../../../types/typesMilitar';
import { columnsMapPostos } from '../../../types/yupPostos/yupPostos';
import { FormEditarGrandeEvento } from '../formGrandeEvento/FormEditarGrandeEvento';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { PostoForm } from '../../../context/postosContext/PostosContex';
interface IAccordion extends AccordionProps {
  handleSubmit?: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}

interface IForm extends FlexboxProps {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}
export const AccordinEditarCadastro: React.FC<IAccordion> = ({ isOpen }) => {
  const {
    isOpen: isOpenRequesitos,
    onOpen: onOpenRequesitos,
    onClose: onCloseRequesitos,
  } = useDisclosure();

  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRelatorio,
    onOpen: onOpenModalRelatorio,
    onClose: onCloseModalRelatorio,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRestantes,
    onOpen: onOpenModalRestantes,
    onClose: onCloseModalRestantes,
  } = useDisclosure();
  const {
    isOpen: isOpenModalSAPM,
    onOpen: onOpenModalSAPM,
    onClose: onCloseModalSAPM,
  } = useDisclosure();
  const {
    isOpen: isOpenModalServices,
    onOpen: onOpenModalServices,
    onClose: onCloseModalServices,
  } = useDisclosure();
  const {
    postos,
    postosByAPI,
    loadMore,
    currentPosition,
    loadLess,
    handleClick,
    handleOnChange,
    handleOnSubmitP,
    uploadPostoEmLote,
  } = usePostos();
  const {
    militares,
    militaresByAPI,
    currentPositionMilitar,
    loadLessMilitar,
    loadMoreMilitar,
    handleClickMilitar,
    handleOnChangeMilitar,
    handleOnSubmitMilitar,
  } = useMilitares();

  const {
    handleRandomServices,
    services,
    totalMilitar,
    totalMilitarEscalados,
    militaresRestantes,
  } = useRequisitos();

  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });
  const { eventById, updateEvent } = useEvents();

  const { setValue, reset } = methodsInput;
  useEffect(() => {
    if (eventById) {
      setValue('comandante', eventById?.comandante);
      setValue('nomeOperacao', eventById?.nomeOperacao);
      setValue('dataInicio', new Date(eventById?.dataInicio));
      setValue('dataFinal', new Date(eventById?.dataFinal));
    }
  }, [eventById, setValue]);
  const onSubmit = async (data: IForm) => {
    await updateEvent(data, eventById?.id);
    reset();
  };

  // Primeiro, transforme os registros dos militares com as novas chaves
  const transformedMiltitares = militaresByAPI.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });

  const transformedPostos = postosByAPI.map(posto => {
    const transformedPosto: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapPostos).forEach(([newKey, originalKey]) => {
      transformedPosto[newKey] = posto[originalKey];
    });
    return transformedPosto;
  });

  return (
    <>
      <Accordion
        alignItems={'center'}
        w={{
          xl: isOpen ? '85vw' : '92vw',
          lg: isOpen ? '85vw' : '92vw',
          md: isOpen ? '85vw' : '92vw',
          sm: isOpen ? '85vw' : '92vw',
        }}
        //border={'1px solid black'}
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                Operação
              </Box>

              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            w={{
              lg: isOpen ? '85vw' : '90vw',
              md: isOpen ? '85vw' : '90vw',
              sm: isOpen ? '85vw' : '90vw',
            }}
          >
            <FormProvider {...methodsInput}>
              <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
                <Flex
                  flexDirection={'column'}
                  align={'center'}
                  //justify={'center'}
                  justifyContent={'space-between'}
                  gap={8}
                  h={'100%'}
                  //border={'1px solid green'}
                >
                  <FormEditarGrandeEvento />
                  <BotaoCadastrar
                    type="submit"
                    /* handleSubmit={() => onSubmit} */
                    label="Atualizar"
                  />
                </Flex>
              </form>
            </FormProvider>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                Postos de Serviço
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            w={{
              lg: isOpen ? '85vw' : '90vw',
              md: isOpen ? '85vw' : '90vw',
              sm: isOpen ? '85vw' : '90vw',
            }}
            maxH={'40vh'}
            overflowY={'auto'}
          >
            <Flex
              flexDirection={'row'}
              justifyContent={'space-between'}
              align={'center'}
              justify={'center'}
            >
              <Flex
                flexDirection={'row'}
                w={{
                  lg: isOpen ? '85vw' : '88vw',
                  md: isOpen ? '85vw' : '88vw',
                  sm: isOpen ? '85vw' : '88vw',
                }}
                gap={2}
                //border={'1px solid red'}
                justifyContent={'space-between'}
              >
                {' '}
                <Flex></Flex>
                <Flex gap={2}>
                  <Flex flexDirection={'column'}>
                    <Tooltip
                      label={`Campos essencias: Rua, Número, Bairro, Cidade`}
                      aria-label="A tooltip"
                      placement="top"
                      borderRadius={'5px'}
                    >
                      <span>
                        <InputCSVpapparse
                          nameInput="postoInput"
                          handleClick={handleClick}
                          handleOnChange={handleOnChange}
                          handleOnSubmit={handleOnSubmitP}
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                  <Button
                    color={'white'}
                    rightIcon={<BiPencil size={'16px'} />}
                    bgColor=" #38A169"
                    variant="ghost"
                    onClick={onOpenFormAddPosto}
                  >
                    Adicionar Individual
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              pt={2}
              gap={4}
              flexDirection={'column'}
              align={'center'}
              /* w={{
              lg: isOpen ? '78vw' : '98vw',
              md: isOpen ? '78vw' : '98vw',
              sm: isOpen ? '78vw' : '98vw',
            }} */
              overflowX={'auto'}
              // border={'1px solid red'}
            >
              {postosByAPI.length > 0 && (
                <TableFicha
                  isOpen={postosByAPI.length > 0}
                  columns={['Local', 'Rua', 'Número', 'Bairro', 'Cidade']}
                  registers={transformedPostos}
                  moreLoad={loadMore}
                  lessLoad={loadLess}
                  currentPosition={currentPosition}
                  rowsPerLoad={100}
                />
              )}
              <Divider />
              <BotaoCadastrar
                handleSubmit={uploadPostoEmLote}
                label="Atualizar"
                type="submit"
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                Efetivo Policial
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            w={{
              lg: isOpen ? '85vw' : '90vw',
              md: isOpen ? '85vw' : '90vw',
              sm: isOpen ? '85vw' : '90vw',
            }}
            maxH={'40vh'}
            overflowY={'auto'}
          >
            <Flex
              //gap={4}
              flexDirection={'row'}
              justifyContent={'space-between'}
              align={'center'}
              justify={'center'}
            >
              <Flex
                flexDirection={'row'}
                w={{
                  lg: isOpen ? '85vw' : '88vw',
                  md: isOpen ? '85vw' : '88vw',
                  sm: isOpen ? '85vw' : '88vw',
                }}
                gap={2}
                //border={'1px solid red'}
                justifyContent={'space-between'}
              >
                {' '}
                <Flex></Flex>
                <Flex gap={2}>
                  <Flex flexDirection={'column'}>
                    <Tooltip
                      label={`Campos essencias: Posto/Graduação, Matrícula, OPM, Nome Completo`}
                      aria-label="A tooltip"
                      placement="top"
                      borderRadius={'5px'}
                    >
                      <span>
                        <InputCSVpapparse
                          nameInput="militarInput"
                          handleClick={handleClick}
                          handleOnChange={handleOnChangeMilitar}
                          handleOnSubmit={handleOnSubmitMilitar}
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                  <Button
                    //color={'white'}
                    rightIcon={<FaFileUpload size={'16px'} />}
                    bgColor=" #38A169"
                    variant="ghost"
                    color={'#fff'}
                    onClick={onOpenModalSAPM}
                  >
                    Importar SAPM
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              pt={2}
              gap={4}
              flexDirection={'column'}
              align={'center'}
              /* w={{
              lg: isOpen ? '78vw' : '98vw',
              md: isOpen ? '78vw' : '98vw',
              sm: isOpen ? '78vw' : '98vw',
            }} */
              overflowX={'auto'}
              // border={'1px solid red'}
            >
              {militaresByAPI.length > 0 && (
                <TableFicha
                  isOpen={militaresByAPI.length > 0}
                  columns={[
                    'Matrícula',
                    'Posto/Graduação',
                    'Nome Completo',
                    'Unidade',
                  ]}
                  registers={handleSortByPostoGrad(transformedMiltitares, '1')}
                  currentPosition={currentPositionMilitar}
                  rowsPerLoad={100}
                  lessLoad={loadLessMilitar}
                  moreLoad={loadMoreMilitar}
                />
              )}

              <Divider />
              <BotaoCadastrar
                handleSubmit={function(): void {
                  throw new Error('Function not implemented.');
                }}
                label="Atualizar"
              />
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontWeight={'bold'}>
                Escala
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            w={{
              lg: isOpen ? '85vw' : '90vw',
              md: isOpen ? '85vw' : '90vw',
              sm: isOpen ? '85vw' : '90vw',
            }}
          >
            <Flex
              flexDirection={'column'}
              justifyContent={'space-around'}
              align={'center'}
              justify={'center'}
              //border={'1px solid black'}
            >
              <Flex
                flexDirection={'row'}
                //border={'1px solid black'}
                justifyContent={'space-between'}
                w={{
                  lg: isOpen ? '85vw' : '88vw',
                  md: isOpen ? '85vw' : '88vw',
                  sm: isOpen ? '85vw' : '88vw',
                }}
                gap={2}
                h={'fit-content'}
              >
                <Flex></Flex>
                <Flex
                  //gap={2}
                  //border={'1px solid red'}
                  //w={'100%'}
                  align={'center'}
                  justifyContent={'space-between'}
                  w={{
                    lg: isOpen ? '85vw' : '88vw',
                    md: isOpen ? '85vw' : '88vw',
                    sm: isOpen ? '85vw' : '88vw',
                  }}
                  p={4}
                >
                  <Flex gap={2}>
                    <Text fontWeight={'bold'}>Total:</Text>
                    {totalMilitar}
                    <Text fontWeight={'bold'}>Escalados: </Text>
                    {totalMilitarEscalados}
                    <Text
                      _hover={{
                        cursor: 'pointer',
                        //backgroundColor: '#ebf8ff',
                        //borderColor: '#2b6cb0',
                        //border: '1px solid #4299e1',
                        borderRadius: '5px',
                        borderWidth: '',
                        padding: 1,
                      }}
                      onClick={onOpenModalRestantes}
                      fontWeight={'bold'}
                    >
                      Restantes{' '}
                    </Text>
                    <Text>{militaresRestantes.length}</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Button
                      //color={'white'}
                      rightIcon={<CiCircleList size={'16px'} />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={onOpenRequesitos}
                    >
                      Requisitos
                    </Button>

                    <Button
                      color={'white'}
                      rightIcon={<BiPencil size={'16px'} />}
                      bgColor=" #38A169"
                      variant="ghost"
                      onClick={() => {
                        handleRandomServices(), onOpenModalServices();
                      }}
                    >
                      Gerar Escala
                    </Button>
                  </Flex>
                </Flex>
              </Flex>

              <Flex>
                <BotaoCadastrar
                  handleSubmit={function(): void {
                    throw new Error('Function not implemented.');
                  }}
                  label="Atualizar"
                />
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <ModalRequesitos
        isOpen={isOpenRequesitos}
        onOpen={onOpenRequesitos}
        onClose={onCloseRequesitos}
      />
      <ModalFormAddPosto
        isOpen={isOpenFormAddPosto}
        onOpen={onOpenFormAddPosto}
        onClose={onCloseFormAddPosto}
        uploadPosto={function(data: PostoForm): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
        uploadPM={function(data: any): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
      <ModalRelatorio
        isOpen={isOpenModalRelatorio}
        onOpen={onOpenModalRelatorio}
        onClose={onCloseModalRelatorio}
      />
      <ModalRestantes
        isOpen={isOpenModalRestantes}
        onOpen={onOpenModalRestantes}
        onClose={onCloseModalRestantes}
        militaresRestantes={militaresRestantes}
      />
      <ModalSAPM
        isOpen={isOpenModalSAPM}
        onOpen={onOpenModalSAPM}
        onClose={onCloseModalSAPM}
        opms={[]}
        select_opm={'' as OPMs}
        militaresRestantes={[]}
      />
      <ModalServices
        isOpen={isOpenModalServices}
        onOpen={onOpenModalServices}
        onClose={onCloseModalServices}
      />
    </>
  );
};
