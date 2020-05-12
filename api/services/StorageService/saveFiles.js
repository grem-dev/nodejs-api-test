
const fs = require('fs');
const os = require('os');


module.exports = async (files = []) => {
    const output = [];

    files.forEach(async (file) => {
        const { originalname, buffer, mimetype } = file;
        const name = "files/" + Date.now() + originalname + "";
        await fs.writeFileSync('public/' + name, buffer)
        output.push({
            name: originalname,
            uri: name,
            type: mimetype
        })
    })

    return output;
}