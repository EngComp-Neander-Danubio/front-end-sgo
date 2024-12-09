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
import { FormGrandeEvento } from '../formGrandeEvento/FormGrandeEvento';
import { BiPencil } from 'react-icons/bi';
import { ModalRequesitos } from '../modal/ModalRequesitos';
import { BotaoCadastrar } from '../botaoCadastrar';
import { InputCSVpapparse } from '../inputCSVpapaparse/InputCSVpapaparse';
import { usePostos } from '../../../context/postosContext/usePostos';
import { useMilitares } from '../../../context/militaresContext/useMilitares';
import { FaFileUpload } from 'react-icons/fa';
import { CiCircleList } from 'react-icons/ci';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventoSchema } from '../../../types/yupEvento/yupEvento';
import { useRequisitos } from '../../../context/requisitosContext/useRequesitos';
import React, { useEffect, useState } from 'react';
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
import { ModalSolicitacarPostos } from '../modal/ModalSolicitarPostos';
import { ModalSolicitarEfetivo } from '../modal/ModalSolicitarEfetivo';
import { HiPencil } from 'react-icons/hi';
import { Pagination } from '../pagination/Pagination';
import { TableSolicitacoes } from '../table-solicitacoes';
import { PostoForm } from '../../../context/postosContext/PostosContex';
import { IconeRedistribuir } from '../../componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import TableMain, { ColumnProps } from '../TableMain/TableMain';
import { DataPostos } from '../../../types/typesPostos';
import { AccordionItemPostos } from './AccordionItemPostos';
import { AccordionItemEfetivo } from './AccordionItemEfetivo';
import { AccordionItemEscala } from './AccordionItemEscala';
import { AccordionItemOperacao } from './AccordionItemOperacao';
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
  return (
    <>
      <Accordion
        alignItems={'center'}
        w={{
          xl: isOpen ? '84vw' : '92vw',
          lg: isOpen ? '84vw' : '92vw',
          md: isOpen ? '84vw' : '92vw',
          sm: isOpen ? '84vw' : '92vw',
        }}
        transitionDuration="1.0s"
        //border={'1px solid black'}
      >
        <AccordionItemOperacao />
        <AccordionItemPostos />
        <AccordionItemEfetivo />
        <AccordionItemEscala />
      </Accordion>
    </>
  );
};
