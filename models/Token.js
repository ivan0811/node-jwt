const fs = require('fs')

const dataPath = `${__dirname.replace(/models/, '')}/_data/token.json`

async function getToken() {
    return await JSON.parse(
        fs.readFileSync(dataPath, 'utf-8')
    )
}

exports.readToken = getToken()

exports.saveToken = async (token) => {    
    try {
        const dataToken = await getToken()
            .then(res => res)
            .catch(err => console.error(err))
        console.log(dataToken)
        dataToken.push(token)
        fs.writeFileSync(dataPath, JSON.stringify(dataToken))
        return true
    } catch (err) {
        console.error(err)
        return false
    }    
}

exports.deleteToken = async (token) => {
    try {
        let dataToken = await getToken()
            .then(res => res)
            .catch(err => console.error(err))        
        dataToken = dataToken.filter(item => item !== token)        
        fs.writeFileSync(dataPath, JSON.stringify(dataToken))
        return true
    } catch (err) {
        console.error(err)
        return false
    }    
}