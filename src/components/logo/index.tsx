import React, { FC } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

import { META_DATA, WEB_NAME, WEB_NAME_BRIEF } from '../../constant'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary',
  size?:'sm'|'md'|'lg'|'xl'
}

const Logo: FC<Props> = ({ onClick, variant, size}) => {
  const theme = useTheme()


  return (
    <Box onClick={onClick} sx={{ cursor: "pointer", width: '100%', px: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      {size=='sm' && <img width={130} height={40} src={META_DATA.logo_two} alt='logo' />}
      {size=='md' && <img width={180} height={50} src={META_DATA.logo_two} alt='logo' />}
      {size=='lg' && <img width={240} height={80} src={META_DATA.logo_two} alt='logo' />}
      {size=='xl' && <img width={340} height={100} src={META_DATA.logo_two} alt='logo' />}
    </Box>
  )
}


export default Logo
