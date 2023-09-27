const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: "TEST-7892170650311300-092620-68944e98596d2d82b3bfbcc82e49fece-178309020",
});


// Define la función mercadopago
const createPreference = (req, res) => {
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: 1,
        },
      ],
      back_urls: {
        success: "http://localhost:3000",
        failure: "http://localhost:3000",
        pending: "",
      },
      auto_return: "approved",
    };
  
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en la integración con MercadoPago' });
      });
}

module.exports = {
    createPreference
}