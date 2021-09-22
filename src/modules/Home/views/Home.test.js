import { mount } from 'enzyme';
import { DragDropContext } from 'react-beautiful-dnd';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { Footer } from '../../global/Footer';
import { Header } from '../../global/Header';
import { TodosReducer } from "../state/reducer";
import { FormTodo } from './components/FormTodo';
import List from './components/List';
import { Home } from './Home';

describe( "Visual Tests of Home Component" , ()=>{

    let mockStore;
    let wrapper;

    beforeAll(()=>{
        const reducers = combineReducers({
            TodosReducer:
            TodosReducer,
        });
        mockStore = createStore(reducers);
        wrapper = mount( 
            <Provider store={mockStore}>
                <Home /> 
            </Provider>
        );
    });

    test('should render Home component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('should find one home classname', () => {
        expect(wrapper.find('.home')).toHaveLength(1);
    })
    
    test('should find a DragDropContext component', () => {
        expect(wrapper.find(DragDropContext)).toHaveLength(1);
    })
    
    test('should find one main classname', () => {
        expect(wrapper.find('.main')).toHaveLength(1);
    })
    
    test('should find a FormTodo component', () => {
        expect(wrapper.find(FormTodo)).toHaveLength(1);
    })
    
    test('should find a Header component', () => {
        expect(wrapper.find(Header)).toHaveLength(1);
    })
    
    test('should find one content-body classname', () => {
        expect(wrapper.find('.content-body')).toHaveLength(1);
    })

    test('should find three List component', () => {
        expect(wrapper.find(List)).toHaveLength(3);
    })
    
    test('should find three Footer component', () => {
        expect(wrapper.find(Footer)).toHaveLength(1);
    })
});

describe( "Functinonality Tests of Home Component" , ()=>{
   
    let mockStore;
    let wrapper;

    beforeAll(()=>{
        const reducers = combineReducers({
            TodosReducer:
            TodosReducer,
        });
        mockStore = createStore(reducers);
        wrapper = mount( 
            <Provider store={mockStore}>
                <Home /> 
            </Provider>
        );
    });

    test('should add a new todo', () => {
        // wrapper.find(".form-title").simulate("change", { target: { value: "New todo" } });
    })
    

});