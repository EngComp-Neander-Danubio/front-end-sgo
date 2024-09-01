import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { ModalFormAddPosto } from '../../../../componentsCadastro/modal/ModalFormAddPosto';
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
          <BiPencil color="#A0AEC0" size="20px" onClick={onOpen} />
        </span>
      </Tooltip>
    </>
  );
};
