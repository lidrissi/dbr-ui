import React, { useState, useEffect, memo } from "react";
import { notificationService } from '../../../widgets/GenericWidget/NotificationService';


const InputTypeText = memo((props) => {
  const { tag } = props
  const [notification, setNotification] = useState({ appParamsValue: {} })
  const [text, setText] = useState(tag.configuration.inputText)

  useEffect(() => {
    notificationService.getNotification().subscribe(widgetNotification => {
      setNotification(widgetNotification)
      if (tag.configuration?.appParam?.value) {
        setText(widgetNotification.appParamsValue[tag.configuration.appParam.value] || tag.configuration.inputText)
      }
    })

  }, [notification])


  return (
    <div>
      {text}
    </div>
  )
});

export default InputTypeText