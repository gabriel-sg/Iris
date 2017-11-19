
import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

export default class ContextMenuTrigger extends React.Component{

	constructor(props){
		super(props);
	}

	handleMouseDown(e){
		e.preventDefault();
		e.stopPropagation();
		this.props.onTrigger(e);
	}

	handleTouchEnd(e){
		e.preventDefault();
		e.stopPropagation();
		this.props.onTrigger(e);
	}

	render(){
		var className = 'context-menu-trigger'
		if (this.props.className){
			className += ' '+this.props.className
		}
		return (
			<span className={className}
				onMouseDown={e => this.handleMouseDown(e)}
				onTouchEnd={e => this.handleTouchEnd(e)}>
					<span className="dot"></span>
					<span className="dot"></span>
					<span className="dot"></span>
			</span>
		);
	}
}
