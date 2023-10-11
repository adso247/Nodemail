// Importa la librería 'nodemailer' para enviar correos electrónicos
const nodemailer = require("nodemailer");

// Carga las variables de entorno desde el archivo '.env' ubicado en la carpeta 'app/environment'
require('dotenv').config({ path: './app/enviroment/.env' });

// Define una función llamada 'sendEmail' para enviar correos electrónicos
const sendEmail = async (message, receiverEmail, subject) => {

    // Crea un objeto 'transporter' para configurar el envío de correos
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',          // Servidor SMTP de Gmail
        service: 'gmail',               // Nombre del servicio (en este caso, Gmail)
        secure: false,                  // No usar una conexión segura (false)
        auth: {
            user: process.env.EMAIL,    // Dirección de correo electrónico desde el archivo .env
            pass: process.env.PASSWORD, // Contraseña de correo electrónico desde el archivo .env
        },
    });
    
    // Define la información del correo electrónico a enviar
    let info = await transporter.sendMail({
        from: process.env.EMAIL,     // Dirección de correo electrónico del remitente
        to: receiverEmail,           // Dirección de correo electrónico del destinatario
        subject: subject,            // Asunto del correo electrónico
        text: message                // Cuerpo del correo electrónico
    })
    
    // Muestra un mensaje en la consola indicando que el mensaje fue enviado con éxito
    console.log("Mensaje enviado correctamente: %s", info.messageId);
}

// Llama a la función 'sendEmail' con argumentos específicos para enviar un correo de prueba
sendEmail('Hola desde nodemailer', 'santi.0528@hotmail.com', 'Test Subject');