import React, { useState } from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { FooterCetic } from '../../../components/componentsCadastro/footerImgCETIC';
import { ConteinerEditarCadastro } from '../../../components/componentsCadastro/accordion/ConteinerEditarCadastro';

export const EditarPostoServico: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <>
      <Flex
        bgColor="rgba(248, 249, 250, 1)"
        w={'100%'}
        //h={'content'}
        //border={'1px solid red'}
        //maxH={'100vh'}
        maxH={'100vh'}
        overflow="hidden"
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav footer"`}
          gap={{ lg: 4, md: 2, sm: 2 }}
          mt={{ lg: 2, md: 2, sm: 2 }}
          ml={{ lg: 4, md: 4, sm: 0 }}
          mr={{ lg: 4, md: 4, sm: 0 }}
          gridTemplateRows={'80px 1fr 35px'}
        >
          <GridItem area={'header'} h={'fit-content'}>
            <DashHeader isOpen={isOpen} handleToggle={handleToggle} />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral isOpen={isOpen} handleToggle={handleToggle} />
          </GridItem>
          <GridItem area={'main'}>
            <ConteinerEditarCadastro
              isOpen={isOpen}
              handleToggle={handleToggle}
            />
          </GridItem>
          <GridItem
            area={'footer'}
            alignContent={'center'}
            // border={'1px solid red'}
          >
            <Flex justify={'center'}>
              <FooterCetic />
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
