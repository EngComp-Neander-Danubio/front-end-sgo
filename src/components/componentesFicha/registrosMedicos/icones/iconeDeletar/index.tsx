import { IconProps, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
interface IIcone extends IconProps {
  label_tooltip?: string;
}

export const IconeDeletar: React.FC<IIcone> = ({
  label_tooltip,
}) => {
  return (
    <>
      <Tooltip
        label={`Deletar ${label_tooltip}`}
        aria-label="A tooltip"
        placement="top"
      >
        <span>
          <BiTrash color="#A0AEC0" size={'20px'} />
        </span>
      </Tooltip>
    </>
  );
};
