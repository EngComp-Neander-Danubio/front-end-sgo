import { PiUserCircleFill } from 'react-icons/pi';
import React from 'react';
import { IconProps } from '@chakra-ui/react';
interface IIconLogin extends IconProps {}
export const IconeLogin: React.FC<IIconLogin> = () => {
  return (
    <>
      <PiUserCircleFill color="#A0AEC0" size={'24px'} />
    </>
  );
};
