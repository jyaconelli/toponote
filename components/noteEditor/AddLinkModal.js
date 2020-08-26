
import React, { useState } from 'react'

import { Overlay, Input, Button, Icon } from 'react-native-elements'

export const AddLinkModal = ({visible, onDone, onCancel}) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')


  const onDismiss = () => {
    setLinkUrl('')
    setLinkUrl('')
  }

  const onAddPress = () => {
    onDone(linkText || linkUrl, linkUrl)
    onDismiss()
  }

  const onBackdropPress = () => {
    onCancel()
    onDismiss()
  }
  
  const inputStyle = {

  }

  return (
  <Overlay isVisible={visible} overlayStyle={{width: 300, marginBottom: 200}} onBackdropPress={onBackdropPress}>
    <Input placeholder="URL" placeholderTextColor="#00000066" value={linkUrl} onChangeText={setLinkUrl} />
    <Input placeholder="Text (optional)" placeholderTextColor="#00000066" value={linkText} onChangeText={setLinkText} />
    <Button buttonStyle={{backgroundColor: '#34C759'}} icon={<Icon size={16} style={{paddingRight: 3}} color="#fff" name="plus" type="font-awesome-5" />} title="Add" onPress={onAddPress} />
  </Overlay>
  )
}