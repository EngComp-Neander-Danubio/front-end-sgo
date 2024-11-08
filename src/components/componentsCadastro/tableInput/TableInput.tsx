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
type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
};
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
  opmDatas: opmSaPM[];
}

export type IForm = {
  input: string[];
  opmDatas: opmSaPM[];
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
    watch,
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
  useEffect(() => {}, [isAllChecked]);

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
                    colorScheme={'green'}
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
                      <Controller
                        name={`checkbox.${index}` as const}
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isChecked={field.value || checkedItems[index]}
                            onChange={e => {
                              field.onChange(e.target.checked);
                              handleCheck(index)(e);
                            }}
                            colorScheme={'green'}
                          />
                        )}
                      />

                      <Controller
                        name={`input.${index}` as const}
                        control={control}
                        render={({ field }) => (
                          <Input
                            w="5.5vw"
                            //w={'fit-content'}
                            h="30px"
                            isDisabled={
                              watch(`checkbox.${index}`) || isAllChecked
                            }
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
                      <span key={opmDatas[index].uni_sigla}>
                        {opmDatas[index].uni_sigla}
                      </span>
                    </Flex>
                  </Td>
                  {isActions && (
                    <TdTable
                      customIcons={[
                        <IconeDeletar
                          key={index}
                          label_tooltip="OPM"
                          handleDelete={async () => {
                            handleDeleteOpm(opmDatas[index].uni_codigo);
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
