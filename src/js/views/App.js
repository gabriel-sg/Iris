
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Sidebar from '../components/Sidebar'
import ContextMenu from '../components/ContextMenu'

import * as uiActions from '../services/ui/actions'
import * as mopidyActions from '../services/mopidy/actions'
import * as spotifyActions from '../services/spotify/actions'


/**
 * Root level application
 **/
class App extends React.Component{

	constructor(props){
		super(props);

		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentWillMount(){
		this.props.mopidyActions.connect();
		window.addEventListener("keyup", this.handleKeyUp, false);
	}

	componentWillUnmount(){
		window.removeEventListener("keyup", this.handleKeyUp, false);
	}

	handleKeyUp(e){
		switch(e.keyCode){			
			case 32: // spacebar
				if( this.props.mopidy.state == 'playing' ){
					this.props.mopidyActions.pause();
				}else{
					this.props.mopidyActions.play();
				}
				break;
		}
	}

	render(){
		return (
			<div>
		        <Sidebar />
		        <main>
		      		{this.props.children}
		        </main>
		        { this.props.ui.context_menu.test }
		        <ContextMenu state={this.props.ui.context_menu} />
	        </div>
		);
	}
}

/**
 * Export our component
 *
 * We also integrate our global store, using connect()
 **/

const mapStateToProps = (state, ownProps) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		uiActions: bindActionCreators(uiActions, dispatch),
		mopidyActions: bindActionCreators(mopidyActions, dispatch),
		spotifyActions: bindActionCreators(spotifyActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)