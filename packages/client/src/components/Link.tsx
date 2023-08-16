import React from 'react'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

const Link: React.FC<LinkProps> = ({ to, children, ...rest }) => {
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

export default Link
