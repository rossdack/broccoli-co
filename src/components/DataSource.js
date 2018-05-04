import axios from 'axios';

class DataSource {

    requestInvitation(userName, email) {
        return axios.post('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
            {
                name: userName,
                email: email
            });
    }
}

export default DataSource;