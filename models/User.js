const fs = require('fs')

exports.users = async () => {    
    return await JSON.parse(
        fs.readFileSync(`${__dirname.replace(/models/, '')}/_data/users.json`)
    )           
}