import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "01a2f6e887b0d9",
        pass: "68b6a83cb7302f",
    },
});

export const enviarEmail = async (datos) => {
    const { name, products, weigth, email, from, to, price } = datos;

    try {
        await transporter.sendMail({
            from: "<noreplay@muevelo.com>", // sender address
            to: email, // list of receivers
            subject: "Cotización Realizada Correctamente", // Subject line
            text: "Cotización Realizada Correctamente", // plain text body
            html: crearEmailCotizacion(name, products, weigth, from, to, price), // html body
        });

        console.log("Email enviado");
    } catch (error) {
        console.log(error);
        console.log("Algo salió mal al enviar el email");
    }
};

const crearEmailCotizacion = (nombre, servicio, peso, origen, destino, precio) => {

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 15);
    const fechaLimiteFormateada = fechaLimite.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
  <style>
  /* Estilos generales */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1,
  p {
    margin: 0;
  }
  /* Estilos específicos */
  .header {
    background-color: cornflowerblue;
    color: white;
    text-align: center;
    padding: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .content {
    padding: 20px 0;
  }
  .name {
    font-weight: bold;
  }
  .btn {
    display: inline-block;
    margin: 15px 0;
    padding: 12px;
    border-radius: 5px;
    background-color: cornflowerblue;
  }  
  .btn a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  .btn:hover{
    cursor: pointer;
    background-color: rgb(82, 118, 185);
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }
  .footer {
    text-align: center;
    padding-top: 20px;
    border-top: 2px solid #ccc;
  }
</style>

<div class="container">
  <div class="header">
    <h1>¡Hola!</h1>
  </div>
  <div class="content">
    <p>
      Hola <span class="name">${nombre}</span>, tu cotización ha sido realizada con éxito.
    </p>

    <br>
    
    <h3 style="text-align: center;">Datos Cotización</h3>

    <table>                      
            <tr>
                <td>Fecha Cotización</td>
                <td>${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr> 
            <tr>
                <td>Servicio</td>
                <td>${servicio}</td>
            </tr>   
            <tr>
                <td>Peso</td>
                <td>${peso}</td>
            </tr>   
            <tr>
                <td>Origen</td>
                <td>${origen}</td>
            </tr>   
            <tr>
                <td>Destino</td>
                <td>${destino}</td>
            </tr>   
            <tr>
                <td>Precio Final</td>
                <td>$${precio}</td>
            </tr>           
    </table>       

    <br>
    <p style="text-align: center;">Si tu no realizaste esta cotización, puedes ignorar este mensaje.</p>    
  </div>

  <br>
  <div class="footer">
    <p>Gracias por utilizar nuestro servicio.</p>
    <p>Cotización Válida hasta el ${fechaLimiteFormateada}</p>
  </div>
</div>

  `;
};
