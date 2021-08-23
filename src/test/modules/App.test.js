import App from '../../modules/App';
import { Home } from '../../modules/Home/Home';
import { mount, shallow } from 'enzyme';

describe('Testing App Component', ()=>{

  let wrapper = shallow( <App /> );

  test('should render App component correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  })

  test('should find one App className', () => {
    wrapper = mount(<App/>);
    expect(wrapper.find('.App')).toHaveLength(1);
  })

  test('should render Home component correctly', () => {
    wrapper = mount(<App/>);
    expect(wrapper.find(Home)).toHaveLength(1);
  })

})
