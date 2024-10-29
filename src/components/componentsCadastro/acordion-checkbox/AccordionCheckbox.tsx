import React, { useEffect, useState } from 'react';
import {
  Flex,
  Input,
  Checkbox,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  InputGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';
import api from '../../../services/api';
import { AxiosResponse } from 'axios';

interface opmSaPM {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
}

interface IAccordionCheckbox {
  handleDeleteOpmModal: (item: opmSaPM) => void;
  setDatasOpmFilhas: React.Dispatch<React.SetStateAction<opmSaPM[]>>;
  opm: opmSaPM[];
  children?: React.ReactNode;
}

export const AccordionCheckbox: React.FC<IAccordionCheckbox> = ({
  handleDeleteOpmModal,
  setDatasOpmFilhas,
  opm = [],
}) => {
  const { control } = useFormContext();

  const rec_opm = async (param: number, new_opm: opmSaPM[], opm: opmSaPM) => {
    if (!opm) return; // Verifique se `opm` está definido

    const opmForm = new_opm.map(o => ({
      ...o,
      opm_filha: o.opm_filha || [],
    }));

    if (opm.uni_codigo === param) {
      opm.opm_filha = opmForm;
      return opm;
    }

    if (opm.opm_filha && Array.isArray(opm.opm_filha)) {
      await Promise.all(
        opm.opm_filha.map(async childOpm => {
          await rec_opm(param, opmForm, childOpm);
        }),
      );
    }

    return;
  };
  const rec_add_opm = async (param: number, opm: opmSaPM) => {
    if (!opm) return; // Verifique se `opm` está definido

    if (opm.uni_codigo === param) {
      return rec_add_opm(param, opm.opm_filha);
    }
    return;
  };
  const handleLoadOpmFilhas = async (param: number) => {
    try {
      if (!opm || opm.length === 0) return;

      const indexExists = opm.some(o => o.uni_codigo === param);

      const response = await api.get<opmSaPM[]>(`/unidadesfilhas/${param}`);
      const updatedOpm = await Promise.all(
        opm.map(async o => {
          const result = await rec_opm(param, response.data, o);
          return result ?? o;
        }),
      );

      const rec_add_opm = (
        param: number,
        opm: opmSaPM | opmSaPM[] | undefined,
      ): boolean => {
        if (!opm) return false;

        if (Array.isArray(opm)) {
          return opm.some(child => rec_add_opm(param, child));
        }
        if (opm.uni_codigo === param) {
          return true;
        }

        return opm.opm_filha ? rec_add_opm(param, opm.opm_filha) : false;
      };

      // Atualização de estado usando `rec_add_opm` para evitar duplicados
      setDatasOpmFilhas(prev => [
        ...prev,
        ...updatedOpm.filter(item => !rec_add_opm(item.uni_codigo, prev)),
      ]);
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    }
  };
  return (
    <>
      <Flex flexDirection={'column'}>
        {opm.length > 0 &&
          opm.map((item, index) => (
            <Accordion defaultIndex={[1]} allowMultiple key={index}>
              <AccordionItem border="none" w={'100%'}>
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Checkbox
                        size="md"
                        defaultChecked
                        onChange={async e => {
                          //await handleDeleteOpmModal(item);
                          if (e.currentTarget.checked)
                            !!e.currentTarget.checked;
                        }}
                        colorScheme={'green'}
                      >
                        <InputGroup>
                          <Controller
                            name={`input-${item?.uni_codigo}`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                value={
                                  item?.uni_sigla.includes('CMTE-GERAL')
                                    ? 'ADM'
                                    : item?.uni_sigla
                                }
                                onChange={e => onChange(e.target.value)}
                                border="none"
                                w="40vw"
                                h="2vh"
                              />
                            )}
                          />
                        </InputGroup>
                      </Checkbox>
                    </Box>
                    <AccordionIcon
                      as={HiPlusCircle}
                      color="#A0AEC0"
                      display={item?.opm_filha ? 'flex' : 'none'}
                      onClick={async () => {
                        await handleLoadOpmFilhas(item?.uni_codigo);
                      }}
                    />
                  </AccordionButton>
                  {item?.opm_filha && item?.opm_filha.length > 0 && (
                    <AccordionPanel pb={4} ml={'auto'}>
                      <AccordionCheckbox
                        handleDeleteOpmModal={handleDeleteOpmModal}
                        setDatasOpmFilhas={setDatasOpmFilhas}
                        opm={item?.opm_filha}
                      />
                    </AccordionPanel>
                  )}
                </>
              </AccordionItem>
            </Accordion>
          ))}
      </Flex>
    </>
  );
};
/* {
  <Spinner alignSelf={'center'} size={'lg'} justifyContent={'center'} />;
}
 */
