const apiAddapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAddapter(URL_SERVICE_COURSE);
module.exports = async(req,res) =>{
    try {
        const id = req.params.id;
        const lessons = await api.get(`/api/lessons/${id}`);
        return res.json(lessons.data);
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
