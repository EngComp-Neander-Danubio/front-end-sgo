import { GridProps, Grid, GridItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FooterCetic } from '../../components/componentsCadastro/footerImgCETIC';
import { DashHeader, MenuLateral } from '../../components/ViewLogin';

interface IGrid extends GridProps {
  contentOfPages: React.ReactNode;
}

export const GridPattern: React.FC<IGrid> = ({ contentOfPages }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <Grid
      templateAreas={`"nav header"
                      "nav main"
                      "nav footer"`}
      gap={{ lg: 4, md: 2, sm: 2 }}
      mt={{ lg: 2, md: 2, sm: 2 }}
      ml={{ lg: 4, md: 4, sm: 0 }}
      mr={{ lg: 4, md: 4, sm: 0 }}
      gridTemplateRows="80px 1fr 35px"
    >
      <GridItem area="header" h="fit-content">
        <DashHeader isOpen={isOpen} handleToggle={handleToggle} />
      </GridItem>

      <GridItem area="nav">
        <MenuLateral isOpen={isOpen} handleToggle={handleToggle} />
      </GridItem>

      <GridItem area="main">
        {/* <ToListEvents isOpen={isOpen} handleToggle={handleToggle} /> */}
        {contentOfPages}
      </GridItem>

      <GridItem area="footer" alignContent="center">
        <FooterCetic />
      </GridItem>
    </Grid>
  );
};
