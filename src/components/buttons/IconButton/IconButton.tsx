import React, { type ComponentProps } from 'react'
import theme from '../../../theme/theme'
import Button from '../Button/Button'

type Props = {
  icon: React.ReactElement
} & ComponentProps<'button'>

function IconButton({ icon, ...props }: Props) {
  return (
    <Button
      variant="text"
      style={{ padding: '0 0.4em', color: theme.palette.common.black }}
      {...props}
    >
      {icon}
    </Button>
  )
}

export default IconButton
