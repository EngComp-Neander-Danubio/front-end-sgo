import React, { useState } from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { FooterCetic } from '../../../components/componentsCadastro/footerImgCETIC';
import { FlexConteudo } from '../../../components/componentsCadastro/flexCadastrar';

export const PostoServico: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <>
      <Flex
        bgColor="rgba(248, 249, 250, 1)"
        //bgColor="#205b95"
        w={'100%'}
        //h={'content'}
        // border={'1px solid red'}
        maxH={'100vh'}
        overflow="hidden"
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav main"`}
          gap={{ lg: 4, md: 2, sm: 2 }}
          mt={{ lg: 2, md: 2, sm: 2 }}
          ml={{ lg: 4, md: 4, sm: 0 }}
          mr={{ lg: 4, md: 4, sm: 0 }}
          gridTemplateRows={'80px 1fr'}
        >
          <GridItem area={'header'} h={'fit-content'}>
            <DashHeader isOpen={isOpen} handleToggle={handleToggle} />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral isOpen={isOpen} handleToggle={handleToggle} />
          </GridItem>
          <GridItem area={'main'}>
            <FlexConteudo isOpen={isOpen} handleToggle={handleToggle} />
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};
