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
 *  Updated:    4/3/19 12:51 AM
 *  Copyright (c) 2014-2019. All rights reserved.
 */

import React from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'

class TitlePagination extends React.Component {
  componentDidMount () {}
  componentDidUpdate () {
    $(this.parent).ajaxify()
  }

  static formatNumber (num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  static calcStartEnd (page, limit) {
    page = Number(page)
    limit = Number(limit)
    const start = page === 0 ? '1' : page * limit
    const end = page === 0 ? limit : page * limit + limit

    return { start, end }
  }

  render () {
    const { limit, total, prevEnabled, nextEnabled, currentPage, prevPage, nextPage, type, filter } = this.props
    const link = page => {
      if (!type) return '#'
      if (type.toLowerCase() === 'filter') {
        return `${filter.raw}&page=${page}`
      } else {
        return `/tickets/${type}/page/${page}/`
      }
    }

    const startEnd = TitlePagination.calcStartEnd(currentPage, limit)

    return (
      <nav className={'pagination uk-float-left uk-clearfix'} ref={r => (this.parent = r)} aria-label="Pagination">
        <div className={'pagination-info'} aria-live="polite">
          Showing {TitlePagination.formatNumber(startEnd.start)} - {TitlePagination.formatNumber(startEnd.end)} of{' '}
          {TitlePagination.formatNumber(total)} items
        </div>
        <ul className={'button-group'} role="list">
          <li className='pagination' role="listitem">
            <a
              href={prevEnabled ? link(prevPage) : '#'}
              className={'btn md-btn-wave-light' + (!prevEnabled ? ' no-ajaxy' : '')}
              aria-label="Go to previous page"
              aria-disabled={!prevEnabled}
            >
              <i className='fa fa-large fa-chevron-left' aria-hidden="true" />
              <span className="sr-only">Previous Page</span>
            </a>
          </li>
          <li className='pagination' role="listitem">
            <a
              href={nextEnabled ? link(nextPage) : '#'}
              className={'btn md-btn-wave-light' + (!nextEnabled ? ' no-ajaxy' : '')}
              aria-label="Go to next page"
              aria-disabled={!nextEnabled}
            >
              <i className='fa fa-large fa-chevron-right' aria-hidden="true" />
              <span className="sr-only">Next Page</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

TitlePagination.propTypes = {
  limit: PropTypes.number,
  total: PropTypes.string,
  type: PropTypes.string,
  filter: PropTypes.object,
  prevEnabled: PropTypes.bool.isRequired,
  nextEnabled: PropTypes.bool.isRequired,
  currentPage: PropTypes.string,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number
}

TitlePagination.defaultProps = {
  limit: 50,
  prevPage: 0,
  nextPage: 1
}

export default TitlePagination
