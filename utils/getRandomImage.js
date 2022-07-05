module.exports = {
    async get(bot) {
        return new Promise(function (resolve, reject) {
            const { MessageAttachment } = require('discord.js');
            const config = require('../config.json');
            const canvasjs = require('canvas');
            const randomInt = require('../utils/randomInt.js')
            const randomItemFromArray = require('../utils/randomItemFromArray.js');
            const fs = require('fs');

            const filecount = fs.readdirSync('./IMG_REPO').length;
            const fileindx = randomInt.get(filecount);
            const filename = fs.readdirSync('./IMG_REPO')[fileindx];
            const filefullname = `./IMG_REPO/${filename}`;

            const descs = fs.readFileSync('./desclist.txt', 'utf-8').split('\n');
            const overlays = fs.readFileSync('./imgoverlaylist.txt', 'utf-8').split('\n');

            const resbuff = fs.readFileSync(filefullname); //await sharp(fs.readFileSync(filefullname)).resize(200, 200).toBuffer();

            const w = 350;
            const h = 350;
            const maxletters = 28;
            const canvas = canvasjs.createCanvas(w, h);
            const ctx = canvas.getContext('2d');


            canvasjs.loadImage(resbuff).then((image) => {
                const overlay = randomItemFromArray.get(overlays);

                const x = w / 2;
                const y = (h / 2) - (h / 10);
                var pretxt = overlay;
                var i = 0;
                var txt = "";
                if (pretxt.length >= maxletters) pretxt.split(' ').forEach((letter) => {
                    if (i >= maxletters) {
                        txt += '\n';
                        i = 0;
                    }
                    txt += ' ' + letter;
                    i += letter.length;
                });
                ctx.drawImage(image, 0, 0, w, h);
                ctx.miterLimit = 3;
                ctx.font = '20px Impact';
                ctx.textAlign = 'center';
                ctx.fillStyle = '#fff';
                ctx.fillText(txt, x, y);
                ctx.lineWidth = 3;
                ctx.strokeText(txt, x, y);
                ctx.lineWidth = 1;
                ctx.fillText(txt, x, y);
                const buff = canvas.toBuffer();
                fs.writeFileSync('./tmp.png', buff);
            }).then(async () => {
                const desc = randomItemFromArray.get(descs);
                const url = bot.user.displayAvatarURL();
                resolve({ title: 'Cumanız mübarek olsun', description: desc, color: '#FFFFFF', footer: `${config.name} • ${config.owner}`, footer2: url, attachment: `attachment://${filename}`, fn: filename });
            });
        });
    }
}