import React, {ReactNode} from 'react'
import MuiButton from '@mui/material/Button'

export type ButtonProps = {
  ariaLabel?: string
  autoFocus?: boolean
  children?: ReactNode
  className?: string
  color?:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
  fullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: 'small' | 'medium' | 'large'
  startIcon?: ReactNode
  type?: 'submit' | 'button' | 'reset'
  variant?: 'contained' | 'outlined' | 'text'
}

const Button = ({
  ariaLabel,
  autoFocus,
  children,
  className,
  color,
  fullWidth,
  isDisabled,
  isLoading,
  onClick,
  size,
  startIcon,
  type,
  variant = 'contained'
}: ButtonProps) => (
  <MuiButton
    aria-label={ariaLabel}
    autoFocus={autoFocus}
    className={className}
    color={color}
    disabled={isDisabled}
    fullWidth={fullWidth}
    loading={isLoading}
    loadingPosition="end"
    onClick={onClick}
    size={size}
    type={type}
    variant={variant}
    startIcon={startIcon}
  >
    {children}
  </MuiButton>
)

export default Button
