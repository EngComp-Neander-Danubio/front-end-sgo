import React, { useState } from 'react';
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
  Center,
  FormControl,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';
import api from '../../../services/api';

type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};
interface IAccordionCheckbox {
  setDatasOpmFilhas: React.Dispatch<React.SetStateAction<opmSaPM[]>>;
  opm: opmSaPM[];
  children?: React.ReactNode;
}
export const AccordionCheckbox: React.FC<IAccordionCheckbox> = ({
  setDatasOpmFilhas,
  opm = [],
}) => {
  const { control } = useFormContext();
  const [loadingResponse, setResponseLoading] = useState<boolean>();

  const rec_opm = async (param: number, new_opm: opmSaPM[], opm: opmSaPM) => {
    if (!opm) return;

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
        opm.opm_filha.map(async opm_filha => {
          await rec_opm(param, opmForm, opm_filha);
        }),
      );
    }
    return;
  };

  const handleLoadOpmFilhas = async (param: number) => {
    try {
      if (!opm || opm.length === 0) return;
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
          return opm.some(filha => rec_add_opm(param, filha));
        }
        if (opm.uni_codigo === param) {
          return true;
        }
        return opm.opm_filha ? rec_add_opm(param, opm.opm_filha) : false;
      };
      setResponseLoading(true);
      setDatasOpmFilhas(prev => [
        ...prev,
        ...updatedOpm.filter(item => !rec_add_opm(item.uni_codigo, prev)),
      ]);
    } catch (error) {
      setResponseLoading(false);
      console.error('Erro ao carregar as unidades:', error);
    }
  };
  return (
    <FormControl>
      {opm?.map((item, index) => (
        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem border="none" w={'100%'} key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Checkbox
                  key={item?.uni_codigo || index}
                  size="md"
                  defaultChecked
                  colorScheme="green"
                  onChange={e => {
                    if (e.currentTarget.checked) {
                      !!e.currentTarget.checked;
                    }
                  }}
                >
                  {item?.uni_sigla}
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

            {item?.opm_filha && loadingResponse ? (
              <AccordionPanel ml={'auto'}>
                <AccordionCheckbox
                  setDatasOpmFilhas={setDatasOpmFilhas}
                  opm={item?.opm_filha}
                />
              </AccordionPanel>
            ) : (
              <AccordionPanel ml={'auto'}>
                <Center>
                  <Spinner
                    alignSelf={'center'}
                    size={'lg'}
                    justifyContent={'center'}
                  />
                </Center>
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </FormControl>
  );
};
