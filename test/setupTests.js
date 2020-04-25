/**
 * Setup Enzyme with the React adapter.
 * @author Andrew Jarombek
 * @since 4/18/2020
 */

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill'
import dotenv from 'dotenv';

configure({ adapter: new Adapter() });
dotenv.config();
