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
  ButtonGroup,
  useDisclosure,
  Divider,
  FlexboxProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FormGrandeEvento } from '../formGrandeEvento/FormGrandeEvento';
import { BiPencil, BiSearch } from 'react-icons/bi';
import { ModalRequesitos } from '../modal/ModalRequesitos';
import { BotaoAddMilitarLote } from '../botaoAddMilitarRandom/BotaoAddMilitarRandom';
import { BotaoCadastrar } from '../botaoCadastrar';
import { TableFicha } from '../../componentesFicha/table';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useMilitares } from '../../../context/militares/useMilitares';
import { FaFileUpload } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import React, { useEffect } from 'react';
import { CardService } from '../cardServices/CardService';
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
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { InputPatternController } from '../inputPatternController/InputPatternController';
import { ModalSolicitacarPostos } from '../modal/ModalSolicitarPostos';
import { ModalSolicitarEfetivo } from '../modal/ModalSolicitarEfetivo';
interface IAccordion extends AccordionProps {
  handleSubmit: () => void;
  isOpen: boolean;
  handleToggle: () => void;
}

interface IForm extends FlexboxProps {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}
export const AccordinCadastro: React.FC<IAccordion> = ({ isOpen }) => {
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
    isOpen: isOpenModalSolicitarPostos,
    onOpen: onOpenModalSolicitarPostos,
    onClose: onCloseModalSolicitarPostos,
  } = useDisclosure();
  const {
    isOpen: isOpenModalSolicitarMilitares,
    onOpen: onOpenModalSolicitarMilitares,
    onClose: onCloseModalSolicitarMilitares,
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
    handleRandomServicesNewTable,
    services,
    totalMilitar,
    totalMilitarEscalados,
    militaresRestantes,
  } = useRequisitos();

  const { searchServices, searchServicesById } = useRequisitos();
  const { control, watch } = useForm();
  const inputUser = watch('searchService');

  useEffect(() => {
    const handler = setTimeout(() => {
      searchServicesById(inputUser);
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [inputUser]);

  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });
  const { uploadEvent } = useEvents();

  const { reset } = methodsInput;

  const onSubmit = async (data: IForm) => {
    await uploadEvent(data);
    reset();
  };

  // Primeiro, transforme os registros dos militares com as novas chaves
  const transformedMiltitares = militares.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });

  const transformedPostos = postos.map(posto => {
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
                Evento/Operação
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
                  <FormGrandeEvento />
                  <BotaoCadastrar
                    type="submit"
                    /* handleSubmit={() => onSubmit} */
                    label="Salvar"
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
            maxH={'48vh'}
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
                      label={`Campos essencias: Local, Rua, Número, Bairro, Cidade, Modalidade`}
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
                    //color={'white'}
                    rightIcon={<FaFileUpload size={'16px'} />}
                    bgColor="#3182CE"
                    variant="ghost"
                    color={'#fff'}
                    onClick={onOpenModalSolicitarPostos}
                  >
                    Solicitar Postos
                  </Button>
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
              //overflowX={'auto'}
              // border={'1px solid red'}
            >
              <TableFicha
                isOpen={postos.length > 0}
                columns={[
                  'Local',
                  'Rua',
                  'Número',
                  'Bairro',
                  'Cidade',
                  'Modalidade',
                  'Qtd Efetivo',
                  /* 'Coronel',
                  'Ten Cel',
                  'Major',
                  'Capitão',
                  '1º Ten',
                  '2º Ten',
                  'Sub tenente',
                  '1º Sgt',
                  '2º Sgt',
                  '3º Sgt',
                  'Cb',
                  'Sd',
                  'Al Sd', */
                ]}
                registers={transformedPostos}
                moreLoad={loadMore}
                lessLoad={loadLess}
                currentPosition={currentPosition}
                rowsPerLoad={100}
              />

              <Divider />
              <BotaoCadastrar
                handleSubmit={uploadPostoEmLote}
                label="Salvar"
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
            maxH={'48vh'}
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
                    bgColor="#3182CE"
                    variant="ghost"
                    color={'#fff'}
                    onClick={onOpenModalSolicitarMilitares}
                  >
                    Solicitar Militares
                  </Button>
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
              //overflowX={'auto'}
              // border={'1px solid red'}
            >
              <TableFicha
                isOpen={militares.length > 0}
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

              <Divider />
              <BotaoCadastrar
                handleSubmit={function(): void {
                  throw new Error('Function not implemented.');
                }}
                label="Salvar"
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
                      Restantes
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
                  label="Salvar"
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
      />
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
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
      <ModalSolicitacarPostos
        isOpen={isOpenModalSolicitarPostos}
        onOpen={onOpenModalSolicitarPostos}
        onClose={onCloseModalSolicitarPostos}
        opms={[]}
        select_opm={'' as OPMs}
        militaresRestantes={[]}
      />
      <ModalSolicitarEfetivo
        isOpen={isOpenModalSolicitarMilitares}
        onOpen={onOpenModalSolicitarMilitares}
        onClose={onCloseModalSolicitarMilitares}
        //opms={[]}
        //select_opm={'' as OPMs}
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
