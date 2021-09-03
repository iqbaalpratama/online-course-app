const apiAddapter = require('../../apiAdapter');
const {
    URL_SERVICE_USER
} = process.env;

const api = apiAddapter(URL_SERVICE_USER);
module.exports = async(req,res) =>{
    try {
        id = req.user.data.id;
        const user = await api.get(`/users/${id}`);
        return res.json(user.data);
    } catch (error) {
        if(error.code === 'ECONNREFUSED')
        {
            return res.status(500).json({ status: 'error', message: 'service unavailable' })
        }
        const {
            status, data
        } = error.response;
        return res.status(status).json(data);
    }
}
