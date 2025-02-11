/*
 *       .                             .o8                     oooo
 *    .o8                             "888                     `888
 *  .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
 *    888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
 *    888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
 *    888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
 *    "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 *  ========================================================================
 *  Author:     Chris Brame
 *  Updated:    2/10/19 2:43 AM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'

class DropdownItem extends React.Component {
  onClick (e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }

  render () {
    const { closeOnClick, text, href, extraClass } = this.props
    return (
      <li className={closeOnClick ? 'uk-dropdown-close' : ''}>
        <a
          // tabIndex={0}
          href={href === undefined ? "#" : href}
          close-uk-dropdown={closeOnClick.toString()}
          className={(!href ? 'no-ajaxy' : '') + (extraClass ? ' ' + extraClass : '')}
          onClick={this.props.onClick}
        >
          {text}
        </a>
      </li>
    )
  }
}

DropdownItem.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  onClick: PropTypes.func,
  closeOnClick: PropTypes.bool
}

DropdownItem.defaultProps = {
  closeOnClick: true
}

export default DropdownItem
