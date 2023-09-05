const nodemailer = require('nodemailer');
const { User } = require("../db"); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD,
  },
});

const recoveryPass = async (req, res) => {
  try {
    const { recipient_email, OTP } = req.body; // Obtener la dirección de correo electrónico y el OTP del cuerpo de la solicitud

    if (!recipient_email) {
      return res.status(400).json({ error: 'La dirección de correo electrónico es obligatoria' });
    }

    // Configurar el contenido del correo electrónico
    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: 'Recuperación de Contraseña',
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
        
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">STILLY</a>
          </div>
          <p style="font-size:1.1em">Hola,</p>
          <p>Gracias por elegir Stilly. Utilice el siguiente código OTP para completar su procedimiento de recuperación de contraseña. El código es válido por 5 minutos.
          </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Koding 101 Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mail_configs);

    return res.status(200).json('Email enviado correctamente');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const updatePass= async (req, res) =>{
  try {
    const { email, newPassword } = req.body;

    // Buscar al usuario por su dirección de correo electrónico
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Generar un hash de la nueva contraseña
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: newPassword });

    return res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }

}


module.exports = {
    recoveryPass,
    updatePass
}