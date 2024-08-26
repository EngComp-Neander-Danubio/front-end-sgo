import React, { useEffect } from 'react';
import {
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  border,
  Td,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { IconeRelatorio, IconeEditar, IconeDeletar } from '../../ViewLogin';
import { IconeBusca } from '../registrosMedicos/icones/iconeBusca';

interface ITable {
  isOpen?: boolean;
  columns?: string[]; // Array de strings que representa os nomes das colunas
  registers?: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
}

export const TableFicha: React.FC<ITable> = ({
  isOpen,
  columns,
  registers,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
}) => {
  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;
  /* useEffect(() => {
    if (columns && registers) {
      // Verifica se "Ações" já não foi adicionada
      if (!columns.includes('Ações')) {
        // Adiciona "Ações" ao array de colunas
        columns.push('Ações');
      }

      // Itera sobre os registros e adiciona a propriedade "Ações" se ainda não existir
      registers.forEach(register => {
        if (!register['Ações']) {
          register['Ações'] = ''; // Adiciona a coluna "Ações" com um valor padrão
        }
      });
    }
  }, [columns, registers]); */

  return (
    <TableContainer pt={4} w="100%" transitionDuration="1.0s">
      <Table variant="simple">
        <TableCaption textAlign="left" p={0}>
          <Flex justify="space-between">
            {start}-{end} de {currentPosition} itens
            <Flex p={0} color="rgba(52, 64, 84, 1)">
              <Button
                mr={2}
                fontSize="12px"
                fontWeight="none"
                bg="none"
                border="1px solid"
                borderColor="rgba(208, 213, 221, 1)"
                borderRadius="8px"
                color="rgba(52, 64, 84, 1)"
                onClick={lessLoad}
                disabled={currentPosition <= rowsPerLoad} // Desabilita se estiver na primeira página
              >
                Anterior
              </Button>
              <Button
                ml={2}
                fontSize="12px"
                fontWeight="none"
                bg="none"
                border="1px solid"
                borderColor="rgba(208, 213, 221, 1)"
                color="rgba(52, 64, 84, 1)"
                borderRadius="8px"
                onClick={moreLoad}
              >
                Próximo
              </Button>
            </Flex>
          </Flex>
        </TableCaption>

        <Thead>
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
              />
            ))}
            {/* {registers && registers.length > 0 && (
              <ThTable title="Ações" customIcon={undefined} />
            )} */}
          </Tr>
        </Thead>
        <Tbody>
          {registers?.map((register, index) => (
            <Tr key={index}>
              {columns?.map((column, i) => (
                <TdTable
                  key={column}
                  text={
                    typeof register[column] === 'string' ||
                    typeof register[column] === 'number'
                      ? register[column]
                      : JSON.stringify(register[column])
                  }
                  /* customIcons={
                    false
                      ? [
                          <IconeBusca key="busca" />,
                          <IconeRelatorio key="relatorio" />,
                          <IconeEditar key="editar" />,
                          <IconeDeletar key="deletar" />,
                        ]
                      : undefined
                  } */
                />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
