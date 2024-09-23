import {
  Flex,
  TableContainer,
  TableCaption,
  Button,
  Thead,
  Tr,
  Tbody,
  Td,
  Input,
  Table,
  Checkbox,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ThTable } from '../tableOPMs/th';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { TdTable } from '../tableOPMs/td';
import { IconeDeletar } from '../../componentesFicha/registrosMedicos/icones/iconeDeletar';
import { OPMs, optionsOPMs } from '../../../types/typesOPM';
import { useEfetivoOPMs } from '../../../context/efetivoOPMs/useEfetivoOPMs';

interface ITable {
  isOpen?: boolean;
  isActions?: boolean;
  lengthData: number;
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
  label_tooltip?: string;
  handleDelete?: () => void;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate?: (data: any, id: string) => Promise<void>;
  isCheckBox?: boolean;
  customIcons?: React.ReactNode[];
  handleDeleteOpm: (option: any) => void;
  opmDatas: string[];
}

export type IForm = {
  input: string[];
  opmDatas: string[];
};

export const TableInput: React.FC<ITable> = ({
  isActions,
  isCheckBox,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
  handleDeleteOpm,
  lengthData,
  opmDatas,
}) => {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext();
  const { fields, remove, append, insert } = useFieldArray({
    control,
    name: 'input',
  });
  useEffect(() => {
    if (fields.length < opmDatas.length) {
      // Adiciona novos fields até que o tamanho de fields corresponda a opms
      for (let i = fields.length; i < opmDatas.length; i++) {
        append('');
      }
    } else if (fields.length > opmDatas.length) {
      // Remove fields extras até que o tamanho de fields corresponda a opms
      for (let i = fields.length; i > opmDatas.length; i--) {
        remove(i - 1); // Remove o último field
      }
    }
  }, [opmDatas, append, remove]);

  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(opmDatas.length).fill(false),
  );

  // Handler para selecionar/desmarcar todos os checkboxes
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(Array(opmDatas.length).fill(checked));
  };

  // Handler para selecionar/desmarcar um checkbox individual
  const handleCheck = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = e.target.checked;
    setCheckedItems(updatedCheckedItems);

    // Se todos os itens estão selecionados, também marca o checkbox geral
    setIsAllChecked(updatedCheckedItems.every(Boolean));
  };

  return (
    <Flex overflowY="auto" w="100%">
      <TableContainer
        pt={4}
        w="100%"
        transitionDuration="1.0s"
        h={opmDatas.length > 0 ? '30vh' : 'fit-content'}
        maxH="60vh"
        overflowY="auto"
      >
        <Table variant="simple">
          <TableCaption textAlign="left" p={0}>
            <Flex justify="space-between">
              {start}-{end} de {opmDatas.length} itens
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
                  disabled={currentPosition <= rowsPerLoad}
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
              {isCheckBox && (
                <Flex align="center" justify="center">
                  <Checkbox
                    isChecked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                  <ThTable title="Total Efetivo" customIcon={undefined} />
                </Flex>
              )}
              <ThTable title="OPM" customIcon={<AiOutlineArrowDown />} />
              {isActions && <ThTable title="Ações" customIcon={undefined} />}
            </Tr>
          </Thead>
          <Tbody>
            {opmDatas.length > 0 &&
              fields.slice(0, opmDatas.length).map((item, index) => (
                <Tr key={item.id}>
                  <Td>
                    <Flex align="center" justify="center" gap={2}>
                      <Checkbox
                        isChecked={checkedItems[index]}
                        onChange={handleCheck(index)}
                      />
                      <Controller
                        name={`input.${index}` as const}
                        control={control}
                        render={({ field }) => (
                          <Input
                            w="5.5vw"
                            h="30px"
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          />
                        )}
                      />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" justify="center" gap={2}>
                      {optionsOPMs
                        .filter(op => opmDatas[index] === op.value)
                        .map(filteredOption => (
                          <span key={filteredOption.value}>
                            {filteredOption.label}
                          </span>
                        ))}
                    </Flex>
                  </Td>
                  {isActions && (
                    <TdTable
                      customIcons={[
                        <IconeDeletar
                          key={index}
                          label_tooltip="OPM"
                          handleDelete={async () => {
                            handleDeleteOpm(opmDatas[index]);
                            remove(index);
                          }}
                        />,
                      ]}
                    />
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
