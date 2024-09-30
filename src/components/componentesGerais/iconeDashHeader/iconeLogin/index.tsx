import { PiUserCircleFill } from 'react-icons/pi';
import React from 'react';
import { IconProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoPerson } from 'react-icons/io5';
interface IIconLogin extends IconProps {
  handleLogout: () => void;
}
export const IconeLogin: React.FC<IIconLogin> = ({ handleLogout }) => {
  const navigate = useNavigate();
  return (
    <>
      <IoPerson
        color="#A0AEC0"
        size={'24px'}
        onClick={() => {
          handleLogout();
          navigate('/login');
        }}
      />
    </>
  );
};
