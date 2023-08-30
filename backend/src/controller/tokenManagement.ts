import jwt from 'jsonwebtoken';

class TokenManager {
    secretKey = "BISITE"

    generateToken = (payload: Object) => {
        const token = jwt.sign(payload, this.secretKey, { expiresIn: '1000d' });
        return token;
    };

    decodeToken = (token: string) => {
        return jwt.verify(token, this.secretKey)
    };
}

export default new TokenManager();