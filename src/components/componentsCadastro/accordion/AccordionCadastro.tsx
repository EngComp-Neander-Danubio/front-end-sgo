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
import { BiPencil } from 'react-icons/bi';
import { ModalRequesitos } from '../modal/ModalRequesitos';
import { BotaoAddMilitarLote } from '../botaoAddMilitarRandom/BotaoAddMilitarRandom';
import { BotaoCadastrar } from '../botaoCadastrar';
import { ModalFormAddMilitar } from '../modal/ModalFormAddMilitar';
import { TableFicha } from '../../componentesFicha/table';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useMilitares } from '../../../context/militares/useMilitares';
import { FaFileUpload } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import React from 'react';
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
    isOpen: isOpenModalServices,
    onOpen: onOpenModalServices,
    onClose: onCloseModalServices,
  } = useDisclosure();
  const {
    postos,
    loadMore,
    currentPosition,
    loadLess,
    handleClick,
    handleOnChange,
    handleOnSubmitP,
  } = usePostos();
  const {
    militares,
    currentPositionMilitar,
    loadLessMilitar,
    loadMoreMilitar,
    handleClickMilitar,
    handleOnChangeMilitar,
    handleOnSubmitMilitar,
  } = useMilitares();
  const methodsInput = useForm<IForm>({
    resolver: yupResolver(eventoSchema),
  });
  const {
    handleRandomServices,
    services,
    totalMilitar,
    totalMilitarEscalados,
    militaresRestantes,
  } = useRequisitos();
  const { uploadEvent } = useEvents();
  const onSubmit = async (data: IForm) => {
    uploadEvent(data);
  };

  const headerKeys =
    postos.length > 0
      ? Object.keys(postos[0]).filter(key =>
          ['Local', 'Rua', 'Numero', 'Bairro', 'Cidade'].includes(key),
        )
      : [];
  const headerKeysMilitar =
    militares.length > 0
      ? Object.keys(militares[0]).filter(key =>
          ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
        )
      : [];
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
          lg: isOpen ? '80vw' : '90vw',
          md: isOpen ? '80vw' : '90vw',
          sm: isOpen ? '80vw' : '90vw',
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
              lg: isOpen ? '78vw' : '88vw',
              md: isOpen ? '78vw' : '88vw',
              sm: isOpen ? '78vw' : '88vw',
            }}
          >
            <FormProvider {...methodsInput}>
              <form onSubmit={methodsInput.handleSubmit(onSubmit)}>
                <Flex
                  flexDirection={'column'}
                  align={'center'}
                  justify={'center'}
                  gap={8}
                  h={'100%'}
                >
                  <Flex
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    w={{
                      lg: isOpen ? '78vw' : '88vw',
                      md: isOpen ? '78vw' : '78vw',
                      sm: isOpen ? '78vw' : '78vw',
                    }}
                    //border={'1px solid red'}
                    ml={6}
                  >
                    <Flex pl={2}>
                      <FormGrandeEvento />
                    </Flex>
                    {/* <Flex border={'1px solid green'} w={'60vw'}></Flex> */}
                    <Flex
                      align={'center'}
                      justify={'right'}
                      w={'500px'}
                      pr={2}
                      //border={'1px solid green'}
                    >
                      {/* <Button
                  rightIcon={<BiPencil size={'16px'} />}
                  //color={'white'}
                  colorScheme="blue"
                  variant="outline"
                  // onClick={onOpenFormAddMilitar}
                  >
                  Editar
                  </Button> */}
                    </Flex>
                  </Flex>
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
            gap={2}
            /* w={{
            lg: isOpen ? '78vw' : '88vw',
            md: isOpen ? '78vw' : '88vw',
            sm: isOpen ? '78vw' : '88vw',
          }} */
          >
            <Flex
              flexDirection={'row'}
              justifyContent={'space-between'}
              align={'center'}
              justify={'center'}
              //w={'100%'}
            >
              <Flex
                flexDirection={'row'}
                align={'center'}
                w={{
                  lg: isOpen ? '78vw' : '88vw',
                  md: isOpen ? '78vw' : '88vw',
                  sm: isOpen ? '78vw' : '88vw',
                }}
                gap={2}
                //border={'1px solid red'}
                justifyContent={'space-between'}
              >
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
                    bg=" #38A169"
                    variant="outline"
                    onClick={onOpenFormAddPosto}
                  >
                    Adicionar Individual
                  </Button>
                </Flex>
              </Flex>

              <Flex></Flex>
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
              <TableFicha
                isOpen={postos.length > 0}
                columns={['Local', 'Rua', 'Número', 'Bairro', 'Cidade']}
                registers={transformedPostos}
                moreLoad={loadMore}
                lessLoad={loadLess}
                currentPosition={currentPosition}
                rowsPerLoad={100}
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
                Efetivo Policial
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            w={{
              lg: isOpen ? '78vw' : '88vw',
              md: isOpen ? '78vw' : '88vw',
              sm: isOpen ? '78vw' : '88vw',
            }}
          >
            <Flex
              gap={4}
              flexDirection={'column'}
              justifyContent={'space-between'}
              align={'center'}
              justify={'center'}
            >
              <ButtonGroup variant="outline" spacing="6">
                <Flex></Flex>
                <Flex
                  flexDirection={'row'}
                  // align={'center'}
                  // border={'1px solid black'}
                  justifyContent={'space-between'}
                  w={{
                    lg: isOpen ? '78vw' : '88vw',
                    md: isOpen ? '78vw' : '88vw',
                    sm: isOpen ? '78vw' : '88vw',
                  }}
                >
                  <Flex></Flex>
                  <Flex gap={2}>
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
              </ButtonGroup>
              <Flex
                overflowX={'auto'}
                overflowY={'auto'}
                align={'center'}
                w={'100%'}
                //justify={'center'}
                /* w={{
              lg: isOpen ? '78vw' : '98vw',
              md: isOpen ? '78vw' : '98vw',
              sm: isOpen ? '78vw' : '98vw',
            }} */
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
                  registers={handleSortByPostoGrad(transformedMiltitares)}
                  currentPosition={currentPositionMilitar}
                  rowsPerLoad={100}
                  lessLoad={loadLessMilitar}
                  moreLoad={loadMoreMilitar}
                />
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
              lg: isOpen ? '78vw' : '88vw',
              md: isOpen ? '78vw' : '88vw',
              sm: isOpen ? '78vw' : '88vw',
            }}
          >
            <Flex
              gap={4}
              flexDirection={'column'}
              justifyContent={'space-around'}
              align={'center'}
              justify={'center'}
              //border={'1px solid black'}
              w={'100%'}

              //overflowY={'scroll'}
            >
              <Flex
                flexDirection={'row'}
                //border={'1px solid black'}
                justifyContent={'space-between'}
                w={{
                  lg: isOpen ? '80vw' : '90vw',
                  md: isOpen ? '80vw' : '90vw',
                  sm: isOpen ? '80vw' : '90vw',
                }}
                h={'fit-content'}
              >
                <Flex align={'center'} justify={'center'} gap={2} ml={8}>
                  <Text fontWeight={'bold'}>Total:</Text>
                  {totalMilitar}
                  <Text fontWeight={'bold'}>Escalados: </Text>
                  {totalMilitarEscalados}
                  <Text
                    _hover={{
                      cursor: 'pointer',
                      backgroundColor: '#ebf8ff',
                      borderColor: '#2b6cb0',
                      border: '1px solid #4299e1',
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
              <Flex
                align={'center'}
                w={'100%'}
                gap={2}

                // border={'1px solid red'}
              ></Flex>
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
      />
      <ModalServices
        isOpen={isOpenModalServices}
        onOpen={onOpenModalServices}
        onClose={onCloseModalServices}
      />
    </>
  );
};
