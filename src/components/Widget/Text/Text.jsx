import React, { memo, useEffect, useRef } from "react";

const Text = memo(({ widget,
}) => {

  const textRef = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.innerHTML = widget.name;
    }
  }, [textRef, widget.name]);

  return (
    <>
      <div className="pl-2 pr-2 d-flex align-items-center h-100" ref={textRef} />
    </>
  )
})

export default Text;