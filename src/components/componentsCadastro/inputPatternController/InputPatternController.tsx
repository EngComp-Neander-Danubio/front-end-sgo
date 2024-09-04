import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface IInput extends InputProps {
  error?: FieldError | { message?: string };
  children?: React.ReactNode; // Define a prop children corretamente
}

export const InputPatternController: React.FC<IInput> = ({
  error,
  children, // Corrige para "children"
  ...props
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <InputGroup>
        {children && (
          <InputLeftElement pointerEvents="none">{children}</InputLeftElement>
        )}
        <Input type={props.type} placeholder={props.placeholder} {...props} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </InputGroup>
    </FormControl>
  );
};
