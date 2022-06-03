import React, { useState, useEffect,useRef} from "react"
import { ButtonStartStopWizard } from "../../component/Button";
import { ChkBoxDisplayWizard } from "../../component/CheckBox/CheckBox";
import { ChkBoxSigText } from "../../component/CheckBox/CheckBoxTwo";
import { ChkBoxLargeCheckBox } from "../../component/CheckBox/CheckoBoxOne";
import { RadioButtonType } from "../../component/RadioButton";
import { ImageBox } from "../../component/ImagImbox";
import { UserMsgs } from "../../component/UserMsgs";

const CheckingProcessThree =(props) =>{
  
const textStyle = {
	marginLeft: "15px",
};

const textBoxStyle = { 
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
} 

const btnStyle = {
	height: "10mm",
	width: "35mm",
};

const boxStyle = {
	height: "35mm",
	width: "60mm",
	border: "1px solid #d3d3d3",
};

    return (
        <div className="Container-contract" >
                    <p> TÉRMINOS Y CONDICIONES - CONTRATO DE HOSPEDAJE
    1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero es prueba de la
    celebración del contrato de hospedaje entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del
    HUÉSPED. El presente contrato es de adhesión, por tal motivo el HUÉSPED se adhiere a las estipulaciones aquí
    contenidas.
    2. El HUÉSPED conoce y acepta la conformidad del tipo de habitación, la tarifa cobrada por el servicio de
    hospedaje así como las fechas de llegada y de salida consignadas en la Tarjeta de Registro Hotelero. Al huésped
    se le presta servicio de alojamiento en la habitación y sus accesorios, a cambio de un precio, por el número de
    días indicados en la Tarjeta de Registro Hotelero. En ningún caso el término podrá ser superior a 30 días
    consecutivos. El HOTEL podrá efectuar un cambio de habitación si se trata de una habitación de iguales o
    mejores condiciones, o ante una situación de caso fortuito o fuerza mayor. El alojamiento se prestará con
    independencia del tiempo que efectivamente permanezca el HUÉSPED en la habitación. El uso parcial causa el
    pago de la tarifa plena. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el check
    out es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida tarde(late check out) podrá
    generar costos adicionales. El ingreso anticipado o la salida con posterioridad a la hora indicada estará sujeta a
    disponibilidad y el HUÉSPED deberá pagar el valor correspondiente.
    3. PRECIO. La habitación y el precio o tarifa por noche será la que se indique en la Tarjeta de Registro Hotelero y
    que corresponde a la reserva. 3.1.- El precio del hospedaje corresponde al canon por noche que el HUÉSPED se
    obliga a pagar y que asciende a la suma que se indica en la Tarjeta de Registro Hotelero y corresponde a la
    reserva efectuada. 3.2.- El HUÉSPED deberá pagar también todos los cargos por concepto de alimentos,
    bebidas, lavandería y en general por todos aquellos que se generen durante su estadía y que decida cargar a su
    cuenta. 3.3.- El HUÉSPED declara que ha sido informado de las tarifas, cánones y en general precios de las
    habitaciones por noche. 3.4.- El incumplimiento del pago acordado generará a cargo del HUÉSPED intereses de
    mora a la tasa máxima permitida, conforme al articulo 884 del código de comercio. 3.5.- El HUÉSPED, sus
    acompañantes y las agencia de viajes son solidariamente responsables conforme al articulo 81 de la Ley 300 de
    1996. 3.6. El pago podrá ser exigido por adelantado y/o de manera parcial, a juicio del HOTEL. El HUÉSPED
    podrá garantizar el pago al hotel mediante la firma de un pagare o voucher de alguna tarjeta de crédito
    aceptada por el HOTEL. 3.7. El HUÉSPED autoriza el envió de la factura al correo electrónico informado. 3.8. El
    HUÉSPED conoce y acepta la tarifa del hospedaje deberá ser prepagada y los consumos adicionales
    garantizados (tarjeta de crédito o depósito). En caso que la garantía sea tarjeta de crédito, autorizo el
    diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.
    4. OBLIGACIONES DEL HUÉSPED. 4.1.- Identificarse para registrarse en el HOTEL con documento de identidad
    idóneo, presentando su cédula de ciudadanía en caso de ser colombiano o su pasaporte o documento aplicable
    tratándose de extranjeros. Para menores de edad, deberá presentarse documento de identificación válido. 4.2.-
    Pagar el valor del hospedaje más los impuestos correspondientes. 4.3.- Pagar el valor de todos los consumos y
    cargos que haya hecho a su cuenta. 4.4.- Observar una conducta decorosa y vestir de manera apropiada. 4.5.-
    Responder hasta la culpa leve de sus obligaciones y las de sus acompañantes o invitados. 4.6.- Registrar en la
    recepción del hotel a todos los acompañantes o invitados del HUÉSPED que se dirijan a su habitación y pagar el
    canon o valor correspondiente por cada uno de ellos. 4.7.- Respetar el número de personas por habitación. 4.8.-
    EL HUÉSPED reconoce que la práctica de deportes, ejercicios físicos, conducción de naves o vehículos,
    utilización de instrumentos o herramientas y en general toda actividad que signifique un riesgo o que pueda
    considerarse como actividad peligrosa, será decisión suya, bajo su exclusiva responsabilidad e implica que el 
    HUÉSPED cuente con las habilidades y el conocimiento que le permite asumir dichos riesgos, exonerando al
    HOTEL y a sus funcionarios o empleados de cualquier responsabilidad en caso de que sufra cualquier daño o
    lesión. 4.9.- Utilizar los muebles, enseres, equipos y en general las facilidades tanto de la habitación como del
    HOTEL, de manera adecuada conservándolas en el estado en que se encuentren y por tanto responderá por
    cualquier daño o pérdida de los elementos y bienes del HOTEL, hasta por la culpa leve. En caso de pérdida o
    daño total o parcial de los bienes del HOTEL por causa atribuible al HUÉSPED o a sus acompañantes, el
    HUÉSPED deberá pagar el precio correspondiente a su reparación o reposición, según el caso. 4.10.- Respetar la
    autoridad del Gerente del HOTEL. 4.11.- Permitir el derecho de inspección y/o vigilancia a la habitación por
    parte de funcionarios del HOTEL. Este derecho se ejercerá de manera razonable e incluye la facultad de
    penetrar o registrar la habitación cuando a juicio del Gerente del HOTEL sea preciso. 4.12.- Permitir a los
    empleados y funcionarios del HOTEL el acceso para labores de rutina y limpieza de la habitación.
    5. TERMINACIÓN DEL CONTRATO. El contrato de hospedaje terminará por: 5.1- Por vencimiento del plazo
    pactado. 5.2.- Por incumplimiento de cualquiera de las obligaciones a cargo de las partes y puntualmente por el
    incumplimiento del pago del precio o canon a cargo del HUÉSPED o por incumplimiento del pago de los
    alimentos y bebidas o demás servicios complementarios que el HUÉSPED hubiera cargado a la habitación o a su
    cuenta personal. 5.3.- En los eventos en que, a juicio exclusivo del HOTEL, el comportamiento o la indumentaria
    del HUÉSPED atente contra la tranquilidad y/o salubridad de los demás huéspedes o de los visitantes del
    HOTEL. 5.4.- Por fumar en la habitación o en cualquier otro espacio libre de humo del hotel, cuando se afecten
    otros huéspedes, visitantes o usuarios y sin perjuicio del pago que deberá hacer en los términos que se
    establecen más adelante. Parágrafo: La terminación del contrato no exonera ni libera al HUÉSPED del pago de
    los saldos pendientes.
    6. EFECTOS DE LA TERMINACIÓN. 6.1.- A la terminación del contrato el HOTEL podrá disponer libremente de la
    habitación. 6.2.- A la terminación del contrato y con independencia de la causa de terminación, el HOTEL queda
    facultado para ingresar a la habitación, elaborar y suscribir un inventario de los efectos y equipaje del huésped
    y retirarlos de la habitación para dejarlos en depósito seguro y adecuado, sin responsabilidad del HOTEL y por
    cuenta y riesgo del HUÉSPED. 6.3.- Si el HUÉSPED no pagaré la cuenta o parte de ella, el HOTEL podrá disponer
    y vender el equipaje y objetos del HUÉSPED y sus acompañantes en los términos del artículo 1199 del Código
    de Comercio, para cubrir con su producto las obligaciones pendientes. El excedente si lo hubiere, será puesto a
    disposición del HUÉSPED. En caso de déficit, el HOTEL podrá iniciar las acciones correspondientes para
    conseguir el pago total de la suma adeudada.
    7. CUSTODIA DE DINERO Y OBJETOS DE VALOR. El HUÉSPED conoce y acepta la exclusión de responsabilidad
    del establecimiento hotelero por la perdida o sustracción de los bienes que no sea entregados al hotel a titulo
    de depósito o guardados con las debidas medidas de seguridad. Conforme al artículo 1195 del Código de
    Comercio, los HUÉSPEDES podrán entregar bajo recibo al HOTEL dinero y objetos de valor para su custodia. La
    entrega deberá hacerse ante el funcionario designado por el HOTEL y deberá levantarse un acta donde se
    relacione el dinero o los objetos entregados. La responsabilidad del HOTEL será la del depositario, en los
    términos del artículo 1196 del Código de Comercio. Los objetos de valor como joyas, cámaras, dinero,
    computadores, celulares, equipos o utensilios que permanezcan en la habitación o áreas de servicios diferentes
    a las que el HOTEL dispone para depósito, estarán bajo el único riesgo del HUÉSPED ya que en este caso el
    HOTEL no asume responsabilidad alguna, en caso de pérdida o deterioro.
    8. El HUÉSPED conoce y acepta las medidas políticas comerciales y de seguridad establecidas por el HOTEL para
    el ingreso de visitantes y huéspedes adicionales. EL HUÉSPED conoce y acepta que el ingreso de personas o 
    huéspedes adicionales genera y causa el cobro de tarifas de hospedaje por dichos huéspedes que no fueron
    incluidos en la reserva. El HOTEL se reserva el derecho de admitir el ingreso de huéspedes adicionales o
    acompañantes a su simple discrecionalidad. Se debe demostrar por cualquier medio probatorio idóneo el
    parentesco con el menor (es) cuando el (los) hagan uso de la misma habitación asignada. Todo menor de edad
    debe hospedarse en compañía de los padres y portar sus respectivos documentos de identificación. En caso de
    no estar en compañía de sus padres, podrá ser realizado por el mayor de edad responsable del menor,
    debidamente autorizado por al menos uno de los padres. La autorización deberá constar por escrito firmado y
    notariado por uno de los padres e indicar que el menor se encuentra bajo su cuidado. El HOTEL rechaza y no
    permite la explotación sexual ni cualquier forma de abuso sexual. El HOTEL rechaza y no permite el turismo
    sexual ni permite la explotación ni el abuso sexual de niñas, niños ni adolecentes. El HUÉSPED no podrá
    ingresar a su habitación menores de dieciocho (18) años de edad para el turismo sexual y quien lo haga
    incurrirá en las sanciones penales que consagre la ley colombiana.
    9. El establecimiento hotelero se reserva el derecho de prorrogar el presente contrato de hospedaje a su
    finalización.
    10.El HUÉSPED acepta que la suma liquida de dinero que conste en la factura prestara merito ejecutivo.
    11.El HUÉSPED conoce que la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados
    mediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza el
    diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria.
    12.Salvo los casos expresamente regulados por la Ley, el HOTEL se reserva el derecho de ingreso de mascotas a
    sus instalaciones. No se admiten mascotas y su incumplimiento podrá dar lugar a la terminación del contrato y
    a la imposición de multas establecidas en el contrato.
    13.El HOTEL es 100% libre de humo. La falta a esta regla esta sancionada por la ley colombiana y su
    incumplimiento podrá dar lugar a la terminación del contrato y a la imposición de multas establecidas en el
    contrato.
    14.El HUÉSPED conoce y acepta ser trasladado a utilizar otro hotel de características similares cuando en el hotel
    no haya disponibilidad inmediata.
    15.Cualquier afectación que haga el HUÉSPED y sus acompañantes al mobiliario del hotel e infraestructura,
    deberá ser asumida y pagada a los costos valorizados de estas afectaciones.
    16.Conforme a la Ley 1336 de 2009 y su reglamento que regula la materia, se combate y rechaza cualquier forma,
    método o procedimiento que implique o conlleve a la explotación sexual y/o pornográfica de niños, niñas y
    adolescentes, y en tal virtud de tener conocimiento de la mera intención de llevar a cabo tales actividades
    dentro de las instalaciones del hotel, procederá a informarlo a las autoridades competentes.
    17.Conforme a los establecido en la Ley 17 de 1981 y sus reglamentarios combate toda forma de comercialización
    y trafico de fauna y flora así como el trafico ilícito de bienes. El HOTEL promueve el cumplimiento de la
    resolución 572 de 2005 y demás normas de conservación de Flora y Fauna así como la conservación del
    patrimonio cultural y de los bienes de interés cultural y contribuye y promueve el cumplimiento de la ley 397
    de 1997 y demás normas aplicables. El HOTEL rechaza cualquier forma de discriminación, distinción, exclusión, 
    restricción o preferencia por motivos de género, raza, color, origen nacional o étnico, religión, opinión político o
    por cualquier otro motivo o condición que tenga como propósito o que produzca como efecto deteriorar,
    restringir o limitar el goce completo de los derechos y libertades fundamentales.
    18.TÉRMINOS Y CONDICIONES DE CANCELACIÓN Y POLÍTICAS DE DEVOLUCIONES. El HUÉSPED puede ejercer
    derecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la central
    de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la
    confirmación de la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto
    y en caso de cancelación se aplicaran las condiciones de cancelación y devolución y que son: - Si la cancelación
    de la reserva se realiza de 8 o mas días antes de la fecha de check in, se realizará una devolución del 80%
    correspondiente al valor depositado. – Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del
    check in se cobrara el 50% del valor depositado. – Si la cancelación de la reserva se realiza dentro de las 48
    horas antes del check in se cobrara la totalidad del valor depositado. - En caso que estando alojado tenga una
    salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en
    cualquier establecimiento operado por Grupo Hoteles SAS, que deberá redimirse en 1 año. Una vez recibida la
    solicitud, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados a
    partir de tu solicitud. Lo realizaremos mediante consignación bancaria al titular de la reserva o mediante
    reversión de tarjeta de crédito.
    19.MULTAS. Fumar en la habitación o en cualquier otro espacio del hotel constituye un incumplimiento grave del
    contrato de hospedaje que da lugar a su terminación y podrá ser retirado del HOTEL si ha afectado a otros
    huéspedes, visitantes o usuarios. Si el HUÉSPED fuma en la habitación, por cada día que lo haga deberá pagar
    (i) el costo en el que debe incurrir el HOTEL para desodorizar y limpiar la habitación, que se estima en una
    suma equivalente a USD 25, liquidados a la tasa representativa del mercado del día del pago, y (ii) el valor de
    (2) noches a la tarifa correspondiente a su alojamiento, como quiera que el proceso de limpieza y
    desodorización implica que el HOTEL no pueda utilizar la habitación durante las siguientes dos (2) noches. Si
    fuma en cualquier área del hotel distinta de la habitación, deberá pagar el costo en que debe incurrir el HOTEL
    para desodorizar y limpiar el área en la que haya fumado, que equivale a USD 25, liquidados a la tasa
    representativa del mercado del día del pago. El ingreso de mascotas se sancionara con multa de $ 100.000 por
    cada noche o ingreso de mascota no autorizada.
    20.El HUÉSPED conforme con lo establecido en la Ley 1581 de 2012 y sus reglamentarias, AUTORIZA
    irrevocablemente al HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales
    suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con
    las políticas de tratamiento de datos personales. El HUÉSPED autoriza la consulta y reporte ante centrales de
    riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u
    hoteleros. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley y
    en particular tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la
    autorización concedida o solicitar la supresión de información cuando ello sea procedente. El HUÉSPED declara
    que conoce las políticas de tratamiento de datos personales y que pueden ser consultadas en la página
    www.47medellinstreethotel.com/politicasdatospersonales.pdf. El HUÉSPED autoriza expresamente al
    HOTEL y sus operadores, para recolectar y utilizar la información y los datos personales suministrados por el
    HUÉSPED en la Tarjeta de Registro Hotelero tales como nombre, dirección, identificación, nacionalidad, fecha
    de nacimiento, dirección de correo electrónico, número de teléfono fijo y móvil o celular, preferencias e
    intereses personales, trabajo o actividad, de conformidad con las políticas de tratamiento seguro de la
    información establecidas por el propio Hotel y por las leyes vigentes con el propósito de consultar y reportar 
    ante centrales de riesgo como PROCREDITO y DATACREDITO sobre el incumplimiento de obligaciones y/o
    pago de los servicios de hospedajes u hoteleros, realizar actividades de fidelización y contactar al titular de la
    información para enviarle encuestas de servicios luego de cada estadía que permitan la calificación del servicio
    prestado, y comunicarle las invitaciones, ofertas, promociones, portafolio de servicios o información general
    que este dirigida a que siga haciendo uso del Hotel o de otros hoteles afiliados y a ofrecerle los servicios
    correspondientes. El HUÉSPED autoriza que la información sea transferida, transmitida, compartida y
    suministrada al HOTEL, exclusivamente para los propósitos descritos previamente. El HUÉSPED, en su
    condición de titular de los datos personales, gozará de todos los derechos de ley, de los expresamente descritos
    en el artículo 8 de la Ley 1581 de 2012 y en particular tendrá derecho en todo momento a conocer, acceder,
    actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de
    información cuando ello sea procedente. Autorizo también para que “la notificación” a que hace referencia el
    decreto 2952 del 06 de agosto de 2010 en su artículo 2°, se pueda surtir a través de mensaje de datos al correo
    electrónico informado en Tarjeta de Registro Hotelero.
    21.El HUÉSPED se adhiere a la totalidad de las estipulaciones contractuales del contrato de hospedaje y que obran
    en el sitio web www.47medellinstreethotel.com/contratodehospedaje.pdf. El HUÉSPED declara que
    conoce la totalidad de las estipulaciones contractuales detalladas en la pagina web. El HOTEL, su titular y/o su
    operador pueden variar o modificar la versión de las condiciones del contrato de hospedaje en cualquier
    momento. Es obligación del HUÉSPED asegurarse de verificar las condiciones integras y actuales en el sitio
    web. </p>
        <div>   
            <ImageBox ref={ImageBox => { window.ImageBox = ImageBox }}/>
            <ButtonStartStopWizard value="Start Wizard" funcName = {window.wizardEventController.start_stop} title = "Starts/stops a wizard script" 
            ref={ButtonStartStopWizard => { window.ButtonStartStopWizard = ButtonStartStopWizard }}/>
            <ChkBoxDisplayWizard ref={ChkBoxDisplayWizard => { window.ChkBoxDisplayWizard = ChkBoxDisplayWizard }}/>
            <ChkBoxLargeCheckBox ref={ChkBoxLargeCheckBox => { window.ChkBoxLargeCheckBox = ChkBoxLargeCheckBox }}/>
            <ChkBoxSigText ref={ChkBoxSigText => { window.ChkBoxSigText = ChkBoxSigText }}/>
            <RadioButtonType ref={RadioButtonType => { window.RadioButtonType = RadioButtonType }}/>
            <UserMsgs ref={UserMsgs => { window.UserMsgs = UserMsgs }}/>
        </div>
    </div>
    )
}
export default CheckingProcessThree