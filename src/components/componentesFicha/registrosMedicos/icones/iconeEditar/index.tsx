import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
interface IIcone extends IconProps {
  label_tooltip?: string;
  isOpen?: boolean;
  onOpen?: () => void;
}
export const IconeEditar: React.FC<IIcone> = ({ label_tooltip, onOpen }) => {
  return (
    <>
      <Tooltip
        label={`Editar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <AiOutlinePlusCircle color="#A0AEC0" size="20px" onClick={onOpen} />
        </span>
      </Tooltip>
    </>
  );
};
