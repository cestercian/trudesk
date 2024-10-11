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

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { isArray } from 'lodash'

const SingleSelect = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.defaultValue || (props.multiple ? [] : ''))
  const selectRef = useRef(null)

  useEffect(() => {
    if (props.defaultValue !== value && !value) {
      setValue(props.defaultValue)
    }
  }, [props.defaultValue, value])

  useImperativeHandle(ref, () => ({
    selectize: {
      items: props.multiple ? (isArray(value) ? value : [value]) : [value],
      options: props.items,
      addOption: (items) => {
        
      },
      refreshOptions: () => {
      },
      addItem: (item) => {
      },
      updateOption: (value, item) => {
      },
      disable: () => {
        if (selectRef.current) selectRef.current.disabled = true
      },
      enable: () => {
        if (selectRef.current) selectRef.current.disabled = false
      },
      destroy: () => {
      },
      removeOption: (value) => {
      }
    },
    value: value
  }))

  const onSelectChange = (e) => {
    let newValue;
    if (props.multiple) {
      const selectedValue = e.target.value;
      newValue = [...value];
      if (e.target.checked) {
        newValue.push(selectedValue);
      } else {
        newValue = newValue.filter(v => v !== selectedValue);
      }
    } else {
      newValue = e.target.value;
    }

    setValue(newValue);

    if (props.onSelectChange) {
      props.onSelectChange(e, newValue);
    }
  }

  const width = props.width || '100%'

  return (
    <div className={'uk-clearfix'}>
      <div className='uk-width-1-1 uk-float-right' style={{ paddingRight: '10px', width: width }}>
        {props.multiple ? (
          <div className="uk-form-controls uk-margin-small-top">
            {props.items.map(item => (
              <label key={item.value} className="uk-form-label">
                <input
                  className="uk-checkbox"
                  type="checkbox"
                  value={item.value}
                  checked={value.includes(item.value)}
                  onChange={onSelectChange}
                  disabled={props.disabled}
                /> {item.text}
              </label>
            ))}
          </div>
        ) : (
          <select
            ref={selectRef}
            className='selectize'
            value={value}
            onChange={onSelectChange}
            disabled={props.disabled}
            style={{ width: '100%' }}
          >
            {props.showTextbox && <option value="">Select...</option>}
            {props.items.map(item => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
})

// Add display name to resolve linter error
SingleSelect.displayName = 'SingleSelect';

SingleSelect.propTypes = {
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool,
  showTextbox: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSelectChange: PropTypes.func
}

SingleSelect.defaultProps = {
  showTextbox: true,
  disabled: false,
  multiple: false
}

export default SingleSelect
