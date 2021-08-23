import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import '@testing-library/jest-dom';
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
