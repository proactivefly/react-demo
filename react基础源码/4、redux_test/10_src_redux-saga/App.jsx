import React, { Component } from 'react'
import Count from './view/Count' //引入的Count的容器组件
import Person from './view/Person' //引入的Person的容器组件
export default class App extends Component {
	render() {
		return (
			<div>
				<Count/>
				<hr/>
				<Person/>
				<hr />
			</div>
		)
	}
}
