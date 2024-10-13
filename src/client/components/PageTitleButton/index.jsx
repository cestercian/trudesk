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
 *  Updated:    4/5/19 12:17 AM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'

class PageTitleButton extends React.Component {
  getAriaLabelFromIcon(fontAwesomeIcon, mdIcon) {
    if (fontAwesomeIcon) {
      switch (fontAwesomeIcon) {
        case 'fa-plus':
          return 'Add new item'
        case 'fa-refresh':
          return 'Refresh page'
        case 'fa-print':
          return 'Print page'
        case 'fa-search':
          return 'Search'
        case 'fa-filter':
          return 'Filter'
        case 'fa-tasks':
          return 'View Tasks'
        default:
          return 'Perform action'
      }
    } else if (mdIcon) {
      switch (mdIcon) {
        case 'add':
          return 'Add new item'
        case 'refresh':
          return 'Refresh page'
        case 'print':
          return 'Print page'
        case 'search':
          return 'Search'
        default:
          return 'Perform action'
      }
    }
    return 'Page action button'
  }

  render () {
    const { href, fontAwesomeIcon, mdIcon, onButtonClick, ariaLabel } = this.props
    const defaultAriaLabel = this.getAriaLabelFromIcon(fontAwesomeIcon, mdIcon)

    return (
      <div className={'pagination uk-float-left'}>
        <ul className='button-group uk-float-left' role="list">
          <li className='pagination relative' role="listitem">
            <a
              href={href}
              className={'btn no-ajaxy'}
              style={{ borderRadius: 3 }}
              onClick={onButtonClick}
              aria-label={ariaLabel || defaultAriaLabel}
            >
              {fontAwesomeIcon && (
                <i className={`fa fa-large ${fontAwesomeIcon}`} aria-hidden="true" />
              )}
              {mdIcon && (
                <i className={'material-icons'} aria-hidden="true">{mdIcon}</i>
              )}
              <span className="sr-only">{ariaLabel || defaultAriaLabel}</span>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

PageTitleButton.propTypes = {
  href: PropTypes.string.isRequired,
  fontAwesomeIcon: PropTypes.string,
  mdIcon: PropTypes.string,
  onButtonClick: PropTypes.func,
  ariaLabel: PropTypes.string
}

PageTitleButton.defaultProps = {
  href: '#'
}

export default PageTitleButton
