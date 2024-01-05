import cors from 'cors'

const allowedOrigins = ['http://localhost:5173']

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

export default options

