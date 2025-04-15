import admin from 'firebase-admin'
import serviceAccount from '../../horarios-56eb1-firebase-adminsdk-fbsvc-3893677fa6.json' with { type: 'json' };
import cors from 'cors'
import express from 'express'


const app = express()
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const verifyIdToken = async (idToken) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Usuario autenticado:', decodedToken);
        return decodedToken;
    } catch (error) {
        console.error('Error al verificar el ID Token:', error);
        throw new Error('Autenticación fallida');
    }
};

app.post('/auth', async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await verifyIdToken(idToken);
        console.log('Usuario autenticado:', decodedToken);
        // Aquí puedes guardar el usuario en la base de datos
        res.status(200).send({ message: 'Autenticación exitosa', user: decodedToken });
    } catch (error) {
        res.status(401).send({ message: 'Autenticación fallida' });
    }
});

export default verifyIdToken; 