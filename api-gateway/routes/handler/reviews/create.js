const apiAddapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE
} = process.env;

const api = apiAddapter(URL_SERVICE_COURSE);
module.exports = async(req,res) =>{
    try {
        const userId = req.user.data.id;
        const reviews = await api.post('/api/reviews', {
            user_id: userId,
            ...req.body
        });
        return res.json(reviews.data);
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
