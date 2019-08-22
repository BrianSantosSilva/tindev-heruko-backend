
const Dev = require('../models/Devs')

module.exports = {
    async store(req,res) {

        console.log(req.io, req.connectUsers)

        const { devId} = req.params;
        const { user} = req.headers;

        const loggegDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error:'Dev not exists'});
        }

        if (targetDev.likes.includes(loggegDev._id)){

            const loggedSocket = req.connectUsers[user];
            const targetSocket = req.connectUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggegDev);
            }
            
        }

        loggegDev.likes.push(targetDev._id);

        await loggegDev.save();

        return res.json(loggegDev);
    }
};