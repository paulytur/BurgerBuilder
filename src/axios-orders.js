import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-51a2e.firebaseio.com/'
});

export default instance;