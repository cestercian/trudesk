import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import helpers from 'lib/helpers'

@observer
class Input extends React.Component {
  @observable value = ''

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    helpers.UI.inputs()
  }

  handleChange = e => {
    this.value = e.target.value
    if (this.props.onChange) this.props.onChange(this.value)
  }


  render () {
    const { name, type, defaultValue, labelledby } = this.props
    console.log(name) 
    return (
      <div>
        <input
          className={'md-input'}
          name={name}
          type={type}
          defaultValue={defaultValue}
          aria-labelledby={labelledby}
          aria-label={name}
          onChange={e => this.handleChange(e)}
        />
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  labelledby: PropTypes.string,
  onChange: PropTypes.func
}

Input.defaultProps = {
  type: 'text'
}

export default Input
