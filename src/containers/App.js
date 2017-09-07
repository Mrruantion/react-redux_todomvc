import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({ todos, actions }) => (
    <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
    </div>
)

App.PropTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
// console.log(TodoActions, 'TodoActions')

const mapStateToProps = state => ({
    todos: state.todos
})
// console.log(mapStateToProps(),'mapStateToProps')
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
// console.log(mapDispatchToProps(),'mapDispatchToProps')

export default connect(mapStateToProps, mapDispatchToProps)(App)