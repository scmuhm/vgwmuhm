import Link from 'next/link';
import { FC, FocusEventHandler, KeyboardEventHandler, MouseEventHandler, ReactNode } from 'react';

type ButtonTypes = 'link' | 'submit' | 'button' | 'reset';

type ContainerElement = HTMLButtonElement | HTMLAnchorElement;

export type ButtonProps = {
  id?: string;
  className?: string;
  disabled?: boolean;
  href?: string;
  target?: string;
  buttonType?: ButtonTypes;
  title?: string;
  onKeyDown?: KeyboardEventHandler<ContainerElement>;
  onKeyUp?: KeyboardEventHandler<ContainerElement>;
  onClick?: MouseEventHandler<ContainerElement>;
  onMouseDown?: MouseEventHandler<ContainerElement>;
  onMouseUp?: MouseEventHandler<ContainerElement>;
  onMouseLeave?: MouseEventHandler<ContainerElement>;
  onBlur?: FocusEventHandler<ContainerElement>;
  children?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  className = '',
  children,
  buttonType = 'button',
  href = '#',
  target,
  ...rest
}) => {
  const renderLink = () => (
    <Link href={href} target={target} className={className}>
      {children}
    </Link>
  );

  return buttonType === 'link' ? (
    renderLink()
  ) : (
    <button {...rest} className={`Button ${className}`} type={buttonType}>
      {children}
    </button>
  );
};

export default Button;
