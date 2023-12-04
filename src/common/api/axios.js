import axios from 'axios';
import { API_URL } from './initProperties';

export default axios.create({
    baseURL: API_URL
});