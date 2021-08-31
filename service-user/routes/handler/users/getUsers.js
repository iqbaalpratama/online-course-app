const { User } = require('../../../models');

module.exports = async(req,res) =>{
    const userIds = req.query.user_ids || [];
    const sqlOptions = {
        attributes: ['id', 'name', 'email', 'role', 'profession']
    }
    if(userIds.length){
        sqlOptions.where = {
            id: userIds
        }
    }
    const users = await User.findAll(sqlOptions);

    if(!users)
    {
        return res.status(404).json({
            status: 'error',
            message: 'users not found'
        })
    }

    return res.status(200).json({
        status: 'success',
        data: users
    })
}