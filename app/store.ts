import {getString, setString, hasKey} from '@nativescript/core/application-settings';
import * as _ from 'lodash';
import {Map, List} from 'immutable'

interface TTodo {
    id: string
    name: string
    isDo: boolean
    discription: string
}

interface TStore {
    todos: List<TTodo>
}

let store: TStore = {
    todos: <List<TTodo>>List([
        {
            id: '123',
            name: 'Задача 1',
            discription: 'Надо сдать лабу',
            isDo: false,
        }
    ]),
};


function getState() {
    return store.todos;
}

function setState(newState: List<TTodo>) {
    store.todos = newState;
    saveStateToDisk()
}

function getStateById(id: string) {
    let idx = getState().findIndex(((val) => val.id === id))
    if (idx != -1) {
        return store.todos.get(idx);
    } else {
        console.log('Not found')
    }
}

function setStateById(id: string, newState: TTodo) {
    let idx = getState().findIndex(((val) => val.id === id))
    if (idx != -1) {
        setState(store.todos.set(idx, newState));
    } else {
        console.log('Not found')
    }
}

function appendState(newState: TTodo) {
    setState(store.todos.push(newState))
}

function removeState(id: string) {
    let idx = getState().findIndex(((val) => val.id === id))
    setState(getState().remove(idx))
}

function saveStateToDisk() {
    let dump = JSON.stringify(store.todos.toArray())
    setString('todos', dump)
}

function loadStateFromDisk() {
    if (hasKey('todos')) {
        let dump = getString('todos')
        store.todos = List(JSON.parse(dump));
    }
}

export {TTodo, getState, setState, getStateById, setStateById, appendState, removeState, loadStateFromDisk};