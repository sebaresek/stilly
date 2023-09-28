import React from "react"

export const Payments = () => {

    return(
        <div>
            <div className="container-contentF"> 
            <h1>Formas de Pago</h1>
            <br />
            <h2>1 ¿Con qué medios puedo pagar?</h2>
            <p>Los medios de pago disponibles en <a href="http://localhost:3000">http://localhost:3000</a> son los siguientes:</p>
            <p><span>Tarjetas de crédito:</span> Visa, Mastercard, American Express, Cabal, Tarjeta Naranja.</p>
            <p><span>Tarjetas de débito:</span> Visa débito, Maestro y Mastercard.</p>
            <p><span>MODO:</span> Escaneando el código QR desde la aplicación MODO o desde tu aplicación bancaria preferida.</p>
            <br />
            <h2>2 ¿Qué costo de financiación tienen las tarjetas?</h2>
            <p>Podés abonar tus compras con <span>3 cuotas sin interés en todo el sitio.</span></p>
            <p>Las 6 <span>cuotas sin interés</span> aplican solamente <span>para compras mayores a $50.000</span></p>
            <p>En el caso de querer abonar en <span>12 cuotas fijas</span> lo podrás hacer en compras superiores a $60.000 y <span>con un porcentaje de interés.</span></p>
            <p>También podés abonar en un pago sin recargo en todas tus compras.</p>
            <br />
            <h2>3 ¿Hay alguna promoción por pago con tarjeta de crédito?</h2>
            <p>Las promociones vigentes con las tarjetas de crédito son las comunicadas en el sitio web. Estás promociones cambian constantemente, por lo que estate atento a las promociones comunicadas en nuestro sitio.</p>
            <p>En la mayoría de los casos, salvo que se aclare lo contrario, <span>los reintegros son por parte del banco</span> en el resumen de la tarjeta. Muchas de estas promociones cuentan a su vez con un tope de reintegro que depende de cada acción particular.</p>
            <br />
            <h2>4 ¿El precio de los productos es el mismo que en los locales?</h2>
            <p> Sí. Los locales y la Tienda Online tienen los mismos precios de lista, aunque pueden existir promociones exclusivas en nuestra Tienda Online. ¡Estate atent@!</p>
            {/* <p>Te recomendamos suscribirte a nuestro Newsletter para enterarte.</p> */}
            </div>

        </div>
    )
}