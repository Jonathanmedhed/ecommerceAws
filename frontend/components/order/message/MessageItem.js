import React from 'react'

const MessageItem = ({ message }) => {
	return (
		<span className="msg-item">
			<i className="fas fa-circle mr-half"></i>
			<span>{message}</span>
		</span>
	)
}

export default MessageItem
