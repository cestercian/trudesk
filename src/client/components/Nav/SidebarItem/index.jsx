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
 *  Updated:    1/20/19 4:46 PM
 *  Copyright (c) 2014-2019. All rights reserved.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Helpers from 'modules/helpers'

class NavButton extends Component {
  constructor(props) {
    super(props)
    this.announcementRef = React.createRef()
  }

  componentDidMount() {
    this.setupClickHandler()
  }

  componentDidUpdate() {
    Helpers.UI.bindAccordion()
    Helpers.UI.tetherUpdate()
    this.setupClickHandler()
  }

  setupClickHandler() {
    const anchor = this.anchorRef.querySelector('a')
    if (anchor) {
      anchor.removeEventListener('click', this.handleClick)
      anchor.addEventListener('click', this.handleClick)
    }
  }

  handleClick = (event) => {
    event.preventDefault()
    const announcement = `Moving to ${this.props.text} page`
    if (this.announcementRef.current) {
      this.announcementRef.current.innerHTML = announcement
      setTimeout(() => {
        this.announcementRef.current.innerHTML = ''
      }, 1000)
    }
    setTimeout(() => {
      window.location.href = this.props.href
    }, 100)
  }

  renderAnchorLink() {
    return (
      <a href={this.props.href} className={this.props.class} target={this.props.target || ''}>
        <i className='material-icons' aria-hidden='true'>{this.props.icon}</i>
        {this.props.text}
      </a>
    )
  }

  render() {
    const { hasSubmenu, active, subMenuTarget, children } = this.props

    return (
      <>
        <li
          ref={(el) => this.anchorRef = el}
          className={`${hasSubmenu ? 'hasSubMenu' : ''} ${active ? 'active' : ''}`}
          data-nav-id={subMenuTarget}
          data-nav-accordion
          data-nav-accordion-target={hasSubmenu ? `side-nav-accordion-${subMenuTarget}` : undefined}
        >
          {this.renderAnchorLink()}
          {children}
        </li>
        <div 
          ref={this.announcementRef}
          aria-live="assertive" 
          className="sr-only" 
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0'
          }}
        ></div>
      </>
    )
  }
}

NavButton.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  class: PropTypes.string,
  hasSubmenu: PropTypes.bool,
  subMenuTarget: PropTypes.string,
  active: PropTypes.bool,
  target: PropTypes.string,
  children: PropTypes.node
}

export default NavButton