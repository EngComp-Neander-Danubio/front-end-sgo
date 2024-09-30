import { Button, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { InputBuscaFicha } from '../inputs/inputBusca';
import { InputCSVpapparse } from '../../../componentsCadastro/inputCSVpapaparse/InputCSVpapaparse';
import { BiPencil } from 'react-icons/bi';
interface IFunction {
  openModalAdd?: () => void;
  openModalSend?: () => void;
  handleClick?: () => void;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit?: (e: React.FormEvent) => void;
}
export const DashButtons: React.FC<IFunction> = ({
  openModalAdd,
  handleClick,
  handleOnChange,
  handleOnSubmit,
}) => {
  return (
    <>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        align={'center'}
        //w={'83vw'}
        w={'100%'}
        //border={'1px solid red'}
        justify={'center'}
      >
        <InputBuscaFicha />
        <Flex gap={2} align={'center'} justify={'center'}>
          {/* <IconeCadastrarSol onOpen={openModalAdd} /> */}
          <Button
            color={'white'}
            rightIcon={<BiPencil size={'16px'} />}
            bgColor=" #38A169"
            variant="ghost"
            onClick={openModalAdd}
          >
            Adicionar Individual
          </Button>
          <Flex flexDirection={'column'}>
            <Tooltip
              //label={`Campos essencias: Local, Rua, Número, Bairro, Cidade, Modalidade`}
              aria-label="A tooltip"
              placement="top"
              borderRadius={'5px'}
            >
              <span>
                <InputCSVpapparse
                  nameInput="postoInput"
                  handleClick={handleClick}
                  handleOnChange={handleOnChange}
                  handleOnSubmit={handleOnSubmit}
                />
              </span>
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
