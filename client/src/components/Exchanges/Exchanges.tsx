import React from "react";
import './Exchanges.css'



export const Exchanges = () => {

    return(
        <div>
            <div className="container-contentF">
                <h1 className="">Cambios y devoluciones</h1><br />
                <h2 className="">DISPONIBILIDAD</h2> <br />
                <p className="">Antes de realizar la compra a través del sitio web, debés tener en cuenta que los productos seleccionados pueden no encontrarse en stock a la hora de preparar la órden. Toda compra se encuentra sujeta a disponibilidad.</p>
                <p className="">En caso de que él o los productos seleccionados se encontrasen agotados o demorados, Stilly se comunicará con el cliente y lo invitará a elegir entre las siguientes opciones: </p> <br />

                <ol className=""> 
                    <p><li className="">Continuar esperando la entrega del producto elegido (en caso de demora).</li></p>
                    <p><li className="">Optar por un producto alternativo que le ofrezca Stilly para el caso particular.</li></p>
                    <p><li className="">Cancelación de la compra y devolución del importe por el medio de pago original.</li></p>
                </ol> <br />

                <p className=""> Si optás por cancelar la compra, se devolverá el importe abonado según el medio de pago que se haya elegido oportunamente.</p>
                <p className="">En el caso de que optes por el producto alternativo, éste deberá contener características iguales o superiores.
                    En caso de que el producto tenga un precio superior, te solicitaremos que abones la diferencia mediante un botón de pago.</p>
                <p className=""><span className="">Importante:</span> para las situaciones contempladas aquí, tenés un plazo de diez días para elegir una de las opciones mencionadas. En caso de que no obtengamos respuesta, Stilly podrá presumir que has optado por la cancelación de la compra, y procederá a la devolución del importe abonado por el medio de pago original.</p><br />

                <h2 className="">CAMBIOS</h2><br />
                <p className="">En stilly podés realizar cambios y devoluciones de cualquier artículo que compres dentro de los 15 días corridos y posteriores a la recepción del artículo. Para solicitar un cambio, el producto deberá tener la etiqueta original y estar sin uso y en perfectas condiciones junto con el ticket de cambio (o factura electrónica) que se envía al realizar la compra.</p>
                <p className="">Hacé <a className="" href="/location">click aquí</a> para ver los locales autorizados para cambios. </p>
                <p className=""> <span className="">De haberse modificado el precio del producto al momento de realizar el cambio, se tomará el precio abonado en la compra, que figurará en el ticket de cambio o factura electrónica.</span> </p>
                <p className=""> En caso de no tener un local cercano para realizar el cambio, podés optar por la opción de cambio a domicilio siguiendo estos pasos:</p> <br />

                <ol className="">
                    <li className=""><p className="">Enviar mail a <a className="" href="mailto:indurmentariastilly@gmail.com">indurmentariastilly@gmail.com</a>  dentro de los 15 días corridos de haber recibido la compra.</p></li>
                    <li className=""><p className="">En el asunto debés indicar <span className="">“Cambio - Nombre - Nro de Pedido”.</span> </p></li>
                    <li className=""><p className="">En el cuerpo del mail debés indicar qué artículo querés cambiar y por qué (tratá de especificar los detalles). Si querés devolver el artículo por fallas, necesitamos por favor que adjuntes fotos.</p></li>
                    <li className=""><p className="">También debés indicar por qué artículo querés realizar el cambio pegando el link de este último en cuerpo de mail.</p></li>
                    <li className=""><p className="">Te responderemos con el procedimiento para enviarnos el artículo fácilmente.</p></li>
                    <li className=""><p className="">El correo pasará a retirar el artículo por tu domicilio y te entregará el nuevo.</p></li>
                </ol> <br />

                <p className=""> <span className="">En los cambios de talle, color y/o prenda con retiro o entrega acordados previamente en tu domicilio, deberás afrontar los costos de recupero y re-envío de los productos, salvo que exista una promoción expresamente publicada en el sitio que te exima de dicho cargo y se cumplan las condiciones estipuladas por la misma.</span> </p><br />


                <h2 className="">DEVOLUCIONES</h2> <br />
                <p className="">Las devoluciones se realizarán dentro de los 10 días corridos y posteriores de recibida la compra cualquiera sea el motivo, siempre y cuando presentes el ticket de compra (o factura electrónica impresa) y las condiciones del producto sean las mismas que para un cambio. Para esto, deberás poner a disposición de Stilly el o los artículos que deseas devolver, siguiendo estos pasos:</p><br />
                <ol className="">
                    <li className=""><p className="">Enviar mail a <a className="" href="mailto:indurmentariastilly@gmail.com">indurmentariastilly@gmail.com</a> dentro de los 10 días corridos de haber recibido la compra.</p></li>
                    <li className=""><p className="">En el asunto debés indicar <span className="">“Devolución -  Nro de Pedido”.</span> </p></li>
                    <li className=""><p className="">En el cuerpo del mail nos debés indicar qué artículo querés devolver y por qué (tratá de especificar los detalles). Si querés devolver el artículo por fallas, necesitamos por favor que adjuntes fotos.</p></li>
                    <li className=""><p className="">Te responderemos con el procedimiento para enviarnos el artículo fácilmente.</p></li>
                </ol><br />
                <p className="">En caso de que la devolución sea por arrepentimiento, deberás asumir el costo de envío correspondiente a la gestión logística de retiro del artículo. <span className="">En caso de devoluciones o cambios por fallas en el artículo, el cargo correspondiente a la gestión logística será asumido por stilly.</span></p>
                <p className="">Si decidís devolver el artículo, tenés las siguientes opciones:</p><br />
                <ol className="">
                    <li className=""><p className="">Obtener un cupón por el valor del artículo adquirido para utilizar en <a className="" href="http://localhost:3000/">http://localhost:3000/</a> </p></li>
                    <li className=""><p className="">Obtener la devolución del importe del producto adquirido, a través del mismo medio de pago original. En este caso no se reintegran los gastos de envío. </p></li>
                </ol><br />
                <p className=""> <span className="">IMPORTANTE: Durante Hot Sale, Cyber Monday, y fechas especiales de la industria NO se realizan cambios y/o devoluciones en la tienda online. Se podrán hacer pasadas las 2 semanas del evento en cuestión.</span></p>
                </div>

        </div>
    )
}