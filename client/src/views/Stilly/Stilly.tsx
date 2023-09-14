import React from 'react';
import './Stilly.css'; // Asegúrate de que la ruta sea correcta

export const Stilly = () => {
  return (
    <div className="about-us-container">
      <h1>Stilly Indurmentaria</h1>

      <section>
        <h2>Nuestra Historia</h2>
        <p>
          Stilly comenzó como un pequeño proyecto de la mano de dos personas con el afán de incursionar y progresar en el competitivo mundo de la indumentaria. La confianza que pusieron en nosotros cada uno de nuestros familiares y amigos nos hizo dar el salto y emprender esta aventura.
          <br/>
          Los primeros pasos del emprendimiento fueron modestos. Empezamos por investigar tendencias y comprender las necesidades de nuestros posibles clientes. Nos lanzamos a la búsqueda de proveedores que pudieran compartir su calidad e innovación.
          <br/>
          Pusimos en práctica lo que no era más que un sueño y hoy, es un emprendimiento dispuesto a cumplir las necesidades de nuestros clientes y brindarles la mejor atención.
        </p>
      </section>

      <section>
        <h2>Nuestra Misión</h2>
        <p>
          En Stilly, nuestra misión es [Describe tu misión]. Nos esforzamos por brindar a nuestros clientes prendas de vestir de la más alta calidad, que reflejan las últimas tendencias de la moda, al tiempo que promovemos la sostenibilidad y la responsabilidad en la industria de la moda.
        </p>
      </section>

      <section>
        <h2>Nuestros Objetivos</h2>
        <p>
          En cada paso que damos, nos guían nuestros objetivos fundamentales:
        </p>
        <ul className="value-list">
          <li>Mantener una amplia gama de prendas, tallas y precios para atraer a un público diverso.</li>
          <li>Fomentar la fidelidad del cliente.</li>
          <li>Eficaz experiencia de compra .</li>
          <li>Garantizar la calidad de los productos.</li>
        </ul>
      </section>

      <section>
        <h2>Agradecimientos</h2>
        <p className="thank-you">
        Nos hace felices ofrecer ropa y accesorios para vos y tu familia!
        <br/>
        Nuestra gratitud a los que nos siguen desde el día uno, nuestros cercanos, la gente no tan conocida, es decir, a cada uno que con su pequeño granito de arena que nos ayudo y nos ayuda a seguir creciendo.
        </p>
      </section>
    </div>
  );
}
