import cors from 'cors'

const allowedOrigins = ['*']

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

export default options

