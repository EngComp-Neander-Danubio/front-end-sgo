import React from 'react';
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { BotaoAlert, IconeDeletar, IconeEditar } from '../../ViewLogin';
import { useNavigate } from 'react-router-dom';
import { IconeVisualizar } from '../../componentesFicha/registrosMedicos/icones/iconeVisualizarSolicitacao';
import { IconeRedistribuir } from '../../componentesFicha/registrosMedicos/icones/iconeRedistribuir';

interface ITable {
  isOpen?: boolean;
  isView?: boolean;
  isActions?: boolean;
  columns: string[]; // Array de strings que representa os nomes das colunas
  registers: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  label_tooltip?: string;
  handleDelete: (id?: string, index?: string) => {};
  handleUpdate?: (data: any, id: string) => Promise<void>;
  isCheckBox?: boolean;
  //customIcons?: React.ReactNode[];
  openModalAdd?: () => void;
  openModalSend?: () => void;
  height: string | number;
}

export const TableSolicitacoes: React.FC<ITable> = ({
  isActions,
  isView,
  columns,
  registers,
  label_tooltip,
  height,
  handleDelete,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        //overflowY={'auto'}
        w="100%"
      >
        <TableContainer
          //pt={2}
          w="100%"
          transitionDuration="1.0s"
          h={registers.length ? `${height}` : 'fit-content'}
          //minH={'30vh'}
          //overflowY={'auto'}
          mb={10}
          border={'1px solid rgb(160, 174, 192)'}
          borderRadius={'8px'}
        >
          <Table variant="simple" fontSize={'14px'}>
            <Thead
            //border={'1px solid red'}
            //bgColor={'rgba(0, 0, 0, 0.32)'}
            >
              <Tr
                borderTop="1px solid rgba(234, 236, 240, 1)"
                borderBottom="1px solid rgba(234, 236, 240, 1)"
                bg="rgba(252, 252, 253, 1)"
              >
                {columns?.map(column => (
                  <ThTable
                    key={column}
                    title={column}
                    customIcon={<AiOutlineArrowDown />}
                    //borderBottom={'1px solid #EAECF0'}
                  />
                ))}
                {isActions && <ThTable title="Ações" customIcon={undefined} />}
              </Tr>
            </Thead>
            <Tbody>
              {registers?.map((register, index) => (
                <Tr key={index}>
                  {columns?.map(column => (
                    <TdTable
                      key={column}
                      text={
                        typeof register[column] === 'string' ||
                        typeof register[column] === 'number'
                          ? register[column] === 'Pendente' ||
                            register[column] === 'Completa' ||
                            register[column] === 'Alerta'
                            ? ''
                            : register[column]
                          : typeof register[column] === 'object'
                          ? JSON.stringify(register[column])
                          : ''
                      }
                      customIcons={[
                        register[column] === 'Pendente' ? (
                          <BotaoAlert text="Pendente" />
                        ) : register[column] === 'Completa' ? (
                          <BotaoAlert text="Completa" />
                        ) : register[column] === 'Alerta' ? (
                          <BotaoAlert text="Alerta" />
                        ) : null,
                      ]}
                    />
                  ))}
                  <TdTable
                    customIcons={
                      isActions &&
                      label_tooltip?.includes('Solicitação de Postos')
                        ? [
                            <IconeVisualizar
                              key="viewPostos"
                              label_tooltip={label_tooltip}
                              onOpen={() =>
                                navigate('/listar-solicitacao-posto')
                              }
                            />,
                          ]
                        : !isView
                        ? [
                            <IconeVisualizar
                              key="viewPMs"
                              label_tooltip={label_tooltip}
                              onOpen={() => navigate('/listar-solicitacao-pms')}
                            />,
                            <IconeRedistribuir
                              key="redistribuir"
                              label_tooltip={label_tooltip}
                            />,
                          ]
                        : isView &&
                          label_tooltip?.includes('Solicitações de Postos')
                        ? [
                            <IconeDeletar
                              key="Deletar"
                              label_tooltip={label_tooltip}
                              handleDelete={async () => {
                                //console.log(index);
                                handleDelete(
                                  register.id,
                                  index === 0
                                    ? '0'
                                    : ((index as unknown) as string),
                                );
                              }}
                            />,
                            <IconeEditar
                              key="Editar"
                              label_tooltip={label_tooltip}
                              /* onOpen={() => {
                                loadEventsById(register.Ord);
                                //onOpenFormEditarEvent();
                                navigate(`/servico/${register.Ord}`);
                              }} */
                            />,
                          ]
                        : [
                            <IconeDeletar
                              key="Deletar"
                              label_tooltip={label_tooltip}
                              handleDelete={async () => {
                                //console.log(index);
                                handleDelete(
                                  register.id,
                                  index === 0
                                    ? '0'
                                    : ((index as unknown) as string),
                                );
                              }}
                            />,
                            <IconeEditar
                              key="Editar"
                              label_tooltip={label_tooltip}
                              /* onOpen={() => {
                                loadEventsById(register.Ord);
                                //onOpenFormEditarEvent();
                                navigate(`/servico/${register.Ord}`);
                              }} */
                            />,
                          ]
                    }
                  />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
