import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiPencil } from 'react-icons/bi';
interface IIcone extends IconProps {
  label_tooltip?: string;
}
export const IconeEditar: React.FC<IIcone> = ({
  label_tooltip
}) => {
  return (
    <Tooltip
      label={`Editar ${label_tooltip}`}
      aria-label="A tooltip"
      placement="top"
    >
      <span>
        <BiPencil color="#A0AEC0" size="20px" />
      </span>
    </Tooltip>
  );
};
