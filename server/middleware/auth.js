import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return req;
        } else {
            const token = req.headers.authorization.split(' ')[1];
            let decodedData;
            if (token) {
                decodedData = jwt.verify(token, process.env.SECRET_KEY);
                req.userId = decodedData?.id;
            }
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

export default auth;