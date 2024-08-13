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
 *  Updated:    4/3/19 1:23 AM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'

class TableRow extends React.Component {
  render() {
    const { clickable, onClick, style, className, children } = this.props;
    const clickableStyle = clickable ? { cursor: 'pointer' } : { cursor: 'default' };

    // Enhanced style management for accessibility
    const enhancedStyle = {...style, ...clickableStyle};

    // Set tabIndex and role for accessibility
    const tabIndex = clickable ? 0 : -1; // Make the row focusable only if it's clickable
    const role = clickable ? 'button' : undefined; // Semantic role for assistive technologies
    const ariaClickable = clickable ? true : undefined; // ARIA attribute to indicate interactivity

    return (
      <tr
        className={className}
        style={enhancedStyle}
        onClick={onClick}
        tabIndex={tabIndex}
        role={role}
        aria-clickable={ariaClickable}
        onKeyDown={(e) => {
          // Allow interaction with the Enter key
          if (e.key === 'Enter' && clickable) {
            onClick(e);
          }
        }}
      >
        {children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

TableRow.defaultProps = {
  clickable: false
}

export default TableRow;
