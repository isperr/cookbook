import {ToggleButton, ToggleButtonGroup} from '@mui/material'
import {forwardRef} from 'react'
import {twMerge} from 'tailwind-merge'

export type ComponentProps = {
  disabled?: boolean
  isSearch: boolean
  onBlur?: React.FocusEventHandler<HTMLDivElement>
  onChange?: (value: any) => void
  value?: string
}

const Component = forwardRef<React.Ref<unknown> | undefined, ComponentProps>(
  ({disabled, isSearch, onBlur, onChange, value}, ref) => {
    return (
      <ToggleButtonGroup
        className="w-full"
        color="secondary"
        disabled={disabled}
        value={value}
        exclusive
        onBlur={onBlur}
        onChange={(__, newValue) => {
          if (newValue) {
            onChange?.(newValue)
          } else if (!isSearch) {
            onChange?.('unknown')
          }
        }}
        aria-label="duration"
        size="small"
        ref={ref}
      >
        <ToggleButton
          fullWidth
          className={twMerge(
            !isSearch && 'sm:uppercase xs:normal-case',
            value === 'long' && 'border-secondary-light'
          )}
          value="long"
          aria-label="long"
          size="small"
        >
          Lang
        </ToggleButton>
        <ToggleButton
          fullWidth
          className={twMerge(
            !isSearch && 'sm:uppercase xs:normal-case',
            value === 'medium' && 'border-secondary-light'
          )}
          value="medium"
          aria-label="medium"
          size="small"
        >
          Mittel
        </ToggleButton>
        <ToggleButton
          fullWidth
          className={twMerge(
            !isSearch && 'sm:uppercase xs:normal-case',
            value === 'short' && 'border-secondary-light'
          )}
          value="short"
          aria-label="short"
          size="small"
        >
          Kurz
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }
)

export default Component
