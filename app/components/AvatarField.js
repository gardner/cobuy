import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-fela'
import AvatarEditorCanvas from 'react-avatar-editor'

import styles from '../styles/AvatarField'

// TODO move somewhere better
class FileInput extends React.Component {
  render () {
    return (
      <input
        type='file'
        accept='image/*'
        onChange={(ev) => this.handleFile(ev)}
      />
    )
  }

  handleFile (ev) {
    var reader = new FileReader()
    var file = ev.target.files[0]

    if (!file) return

    reader.onload = (img) => {
      this.props.onChange(img.target.result)
    }
    reader.readAsDataURL(file)
  }
}

class AvatarEditor extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      image: props.image
    }
  }

  componentWillReceiveProps (nextProps) {
    const { image: nextImage } = nextProps
    const { image: prevImage } = this.state
    if (nextImage !== prevImage) {
      this.setState({ image: nextImage })
    }
  }

  handleFileChange (image) {
    this.setState({ image })
  }

  render () {
    const canvasStyle = styles.canvas(this.props) // we can't use special fela magic here
    const { editor } = this.props
    const { image } = this.state

    return (
      <div>
        <AvatarEditorCanvas
          style={canvasStyle}
          {...editor}
          image={image}
        />
        <FileInput
          onChange={dataUrl => this.handleFileChange(dataUrl)}
        />
      </div>
    )
  }
}

// http://redux-form.com/6.8.0/examples/fieldLevelValidation/
function AvatarField (props) {
  const { input, label, type, meta, editor } = props
  const { name, value } = input
  const { touched, error, warning } = meta

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
      </label>
      <AvatarEditor
        editor={editor}
        image={value}
      />
      {
        touched
        ? error
          ? <span className={styles.error}>{error}</span>
          : warning
            ? <span className={styles.warning}>{warning}</span>
            : null
        : null
      }
    </div>
  )
}

export default connect(styles)(AvatarField)