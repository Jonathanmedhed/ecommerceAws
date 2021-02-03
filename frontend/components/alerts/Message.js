import React from 'react'
import { Message as MessagePrime } from 'primereact/message'

const Message = ({ severity, text }) => {
	return <MessagePrime severity={severity} text={text}></MessagePrime>
}

Message.defaultProps = {
	severity: 'info',
}

export default Message
