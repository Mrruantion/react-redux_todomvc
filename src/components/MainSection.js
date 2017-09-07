import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'


const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_COMPLETED]: todo => !todo.completed,
    [SHOW_ACTIVE]: todo => todo.completed
}
console.log([SHOW_ALL], SHOW_COMPLETED, SHOW_ACTIVE, '123')
console.log(TODO_FILTERS, 'totofilter')
export default class MainSection extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    }

    state = {
        filter: SHOW_ALL
    }

    handleClearCompleted = () => {
        this.props.actions.clearCompleted()
    }

    handleShow = filter => {
        this.setState({ filter })
    }

    renderToggleAll(completedCount) {
        // const { todos, actions } = this.props
        const { todos, actions } = this.props
        if (todos.length > 0) {
            // return (
            //     <input className="toggle-all"
            //         type="checkbox"
            //         checked={completedCount === todos.length}
            //         onChange={actions.completeAll} />
            // )
            return (<input
                className="toggle-all"
                type="checkbox"
                checked={completedCount === todos.length}
                onChange={actions.completeAll}
            />)
        }
    }
    renderFooter(completedCount) {
        const { todos } = this.props
        const { filter } = this.state
        const activeCount = todos.length - completedCount;
        if (todos.length) {
            return (<Footer
                completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow}
            />)
        }
    }
    render() {
        //todos 数据
        //actions func
        const { todos, actions } = this.props
        console.log(this.props, 'todos.actions')
        const { filter } = this.state
        console.log(filter, 'filter')
        const filteredTodos = todos.filter(TODO_FILTERS[filter])
        console.log(filteredTodos, 'filteredTodos')
        const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)

        return (
            <section className="main">

                <div className="todo-list"><li>{this.renderToggleAll(completedCount)}</li></div>
                <ul className="todo-list">
                    {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} {...actions} />)}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        )
    }
}
