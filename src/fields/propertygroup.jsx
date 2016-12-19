import React from 'react'
import { ZoomSpecField } from './spec.jsx'
import Immutable from 'immutable'
import GlSpec from 'mapbox-gl-style-spec/reference/latest.min.js'
import theme from '../theme.js'

console.log(ZoomSpecField)

function getFieldSpec(layerType, fieldName) {
  const paint  = GlSpec['paint_' + layerType] || {}
  const layout = GlSpec['layout_' + layerType] || {}
  if (fieldName in paint) {
    return paint[fieldName]
  } else {
    return layout[fieldName]
  }
}

export default class PropertyGroup extends React.Component {
  static propTypes = {
    layer: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    groupFields: React.PropTypes.instanceOf(Immutable.OrderedSet).isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  render() {
    const fields = this.props.groupFields.map(fieldName => {
      console.log(fieldName)
      const fieldSpec = getFieldSpec(this.props.layer.get('type'), fieldName)
      const fieldValue = this.props.layer.getIn(['paint', fieldName], this.props.layer.getIn(['layout', fieldName]))

      return <ZoomSpecField
        onChange={this.props.onChange}
        key={fieldName}
        fieldName={fieldName}
        value={fieldValue}
        fieldSpec={fieldSpec}
      />
    }).toIndexedSeq()

    return <div style={{
      padding: theme.scale[2],
      paddingRight: 0,
      backgroundColor: theme.colors.black,
      marginBottom: theme.scale[2],
    }}>
      {fields}
    </div>
  }
}
