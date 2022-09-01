module.exports.getB64Auth = function (req) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const decrypted = Buffer.from(b64auth, 'base64').toString().split(':');

    return { username: decrypted[0], password: decrypted[1] };
}