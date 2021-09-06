const apiAddapter = require('../../apiAdapter');
const {
    URL_SERVICE_MEDIA
} = process.env;

const api = apiAddapter(URL_SERVICE_MEDIA);
module.exports = async(req,res) =>{
    try {
        const id = req.params.id;
        const imageCourses = await api.delete(`/api/image-courses/${id}`);
        return res.json(imageCourses.data);
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
