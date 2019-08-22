
const Dev = require('../models/Devs')

module.exports = {
    async store(req,res) {

        const { devId} = req.params;
        const { user} = req.headers;

        const loggegDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error:'Dev not exists'});
        }


        loggegDev.dislikes.push(targetDev._id);

        await loggegDev.save();

        return res.json(loggegDev);
    }
};