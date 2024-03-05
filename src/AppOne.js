import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { VscVerified,VscSymbolEvent} from "react-icons/vsc";
import HttpClient from './HttpClient';
import { toast } from "react-hot-toast";
import { CiFileOn } from "react-icons/ci";
import { PiSignature } from "react-icons/pi";
import { Button, Spacer } from "@nextui-org/react"
import { PiSignatureLight } from "react-icons/pi";
const btnStyle = {
	height: "15mm",
  width: "35mm",
  fontSize: "20px",
}

const boxStyle = {
	height: "70mm",
	width: "120mm",
	border: "1px solid #d3d3d3",
}

const textStyle = {
  textAlign: "left",
  marginLeft: "10px",
}

const textBoxStyle = {
	marginLeft: "15px",
	padding:"10px 10px",
	textAlign:"left"
} 

const loading = false


export class ImageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: "",
      height: 270,
      width: 460
    };
    this.imageRef = React.createRef();
  }

  handleOnChange = (event) => {
    this.setState({
      imageSrc: event.target.value,
    });
    console.log(event.target.value);
    console.log("imageSrc changed");
  };

  handleOnChangeButton(event) {
	if (this.props.id === "Restore")
	{
		// Disable the Restore button when required
		this.setState({
			disabled: event.target.value
		})
	}
}
  


  render() {

	

	const logTrimmedCanvasDataURL = () => {
		const savedData = localStorage.getItem('contracto');
		const numbyiD= (parseInt(savedData))
		HttpClient.UploadImageFirma({ ID: numbyiD, file1: this.state.imageSrc })
		.then((index) => {
			toast.success("exitoso")
		  setTimeout(() => {
			window.location.href = `/DetailDashboard/${numbyiD}`;
		  }, 1000);
		})
		.catch((e) => {
		  toast.error("es obligaotoria la firma")
		});
	  };

	const handCLickContracto =() =>{
		const linkSource = `https://47medellinstreethotel.com/contratodehospedaje.pdf`;
		const downloadLink = document.createElement("a");
		const fileName = "file.pdf";
		downloadLink.href = linkSource;
		downloadLink.target = "_blank";
		downloadLink.download = fileName;
		downloadLink.click();
	}

	/**/

    return (
      <div>

		<div className="checkin2-contracto">
			<div className='Row-bar'>
				{this.state.imageSrc  ?
					<img
					ref={this.imageRef} // Assigning the reference to the element
					
					src={this.state.imageSrc}
					
					style={boxStyle}
					/>
					

				: <PiSignature fontSize={100} />
			}
			
				
	</div>
		</div>

		<Button     
		onClick={logTrimmedCanvasDataURL}
		style={{width:"100%"}}
		color={"success"}  
		icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Finalizar  check in</span></Button>


		<Button     
		onClick={handCLickContracto}
		style={{width:"100%",marginTop:"10px"}}
		color={"success"}  
		icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Descargar contracto</span></Button>
	
		
      </div>
    );
  }
}


export class ButtonStartStopWizard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {disabled: false, value:"Start Wizard"};
  }
	handleOnChange(event) {
		if (this.props.id === "Restore")
		{
			// Disable the Restore button when required
			this.setState({
				disabled: event.target.value
			})
		}
  }
  render()

  /**
   * <input type="button" id={this.props.id} value={this.props.value} disabled={this.state.disabled} style={btnStyle} 
					onChange={(event) => this.handleOnChange(event)}  
					onClick={this.props.funcName} />
   * 
   */
  {
    return (
			<div>
				
			<Button     

			style={{width:"100%",marginTop:"10px"}}
			color={"error"}  
			type="button" id={this.props.id} value={this.props.value} disabled={this.state.disabled} 

			onChange={(event) => this.handleOnChange(event)}  
			onClick={this.props.funcName}
			icon={<PiSignatureLight  color="white" fontSize={35}  />}  > <span>Inciar firma</span></Button>
			</div>
    );
  }
}


export class RadioButtonType extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {checked: true, optionSelected: 'standard'}
	}
	
	getInitialState()
	{
		return {
			optionSelected: 'standard'
		}
	}
	
	handleOptionChange(changeEvent) {
		this.setState({
			optionSelected: changeEvent.target.value
		});
		this.setState({
			checked: !this.state.checked
		});
	}
	
	render()
	{
		return (
			<div>
				<div>
					<input type="radio" name="buttontype" id="radio_standard" value="standard"
						labeltext="Use standard buttons" checked={this.state.optionSelected === "standard"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="standard" >Standard</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_utf8" value="utf8"
						labeltext="Display UTF-8 text (e.g. for languages using logograms)" checked={this.state.optionSelected === "utf8"}
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="UTF8" >Display UTF-8 text (e.g. for languages using logograms)</label>
				</div>
				<div>
					<input type="radio" name="buttontype" id="radio_remote" value="remote" checked={this.state.optionSelected === "remote"}
						labeltext="Use remote (URL) images"
						onChange={(event) => this.handleOptionChange(event)}/>
					<label htmlFor="remote" >Use remote (URL) images</label>
				</div>
			</div>
		);
	}
}
		
export class ChkBoxDisplayWizard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: true}
	}
	handleOnChange(event) {
		this.setState({
			checked: event.target.value
		})
	}
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkDisplayWizard" defaultChecked="true" onChange={(event) => this.handleOnChange(event)}/>Display wizard control window 
		</div>
		);
	}
}

export class ChkBoxLargeCheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}
	handleOnChange(event) {
		this.setState({
			checked: event.target.value
		})
	}
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkLargeCheckbox" onChange={(event) => this.handleOnChange(event)}/>Use enlarged checkbox 
		</div>
		);
	}
}

export class ChkBoxSigText extends React.Component {
	constructor(props) {
		super(props);
		this.state = {checked: false}
	}
	handleChange = () => {
		this.setState({
      checked: !this.state.checked
    })
	}
	
	render()
	{
		return(
		<div>
			<input type="checkbox" id="chkShowSigText" 
				checked={this.props.checked} 
				onChange={(event) => this.handleChange(event)} 
				/>Output SigText to browser text window
		</div>
		);
	}
}

// This is the class for the scrolling text area showing progress messages to the user
export class UserMsgs extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			userMessage: ""
		};
		this.textLog = React.createRef();
  }
	
	componentDidUpdate()
	{
		this.textLog.current.scrollTop = this.textLog.current.scrollHeight; // Auto-scrolls to the bottom
	}
	
	handleOnChange(event) {
    this.setState({
      userMessage: event.target.value
    })
  }

	render()
	{
		return(
			<textarea ref={this.textLog} cols="125" rows="15" value={this.state.userMessage} onChange={(event) => this.handleOnChange(event)} style={textBoxStyle}/>
		);
	}
}


class AppONe extends React.Component {
	
	state={data:""}
	
	changeState = () => {
		this.setState({data:'mytest' });
	};

	handFinalizar  =() =>{
		this.history.push("/Home")
	}
  render() 
  {
    return (
      <div >
        <div style={{width:"100%"}}>
			<table style={{padding: "10px 10px", cellspacing: "30"}}>
			<tbody>
			<tr>  
				<td rowSpan="2">
					<ImageBox ref={ImageBox => { window.ImageBox = ImageBox }}   />
					<ButtonStartStopWizard value="Start Wizard" funcName = {window.wizardEventController.start_stop} title = "Starts/stops a wizard script" 
						ref={ButtonStartStopWizard => { window.ButtonStartStopWizard = ButtonStartStopWizard }}/>
					<div className="checkin2-contracto"  >
		
		<p  >CONTRATO DE HOSPEDAJE. 1. Conforme a los artículos 79 y 81 de la Ley 300 de 1996, la Tarjeta de Registro Hotelero conforma el contrato de hospedaje celebrado entre el HOTEL y el HUÉSPED. El contrato es aceptado por la firma del HUÉSPED. El presente contrato es de adhesión, por tal motivo el HUÉSPED se adhiere a las estipulaciones aquí contenidas. 2. El HUÉSPED conoce y acepta el tipo de habitación, la tarifa cobrada por el servicio de hospedaje así como las fechas de ingreso y de salida consignadas en esta Tarjeta de Registro Hotelero. 3. La hora para efectuar el check in es a partir de las 15:00 horas y para efectuar el check out es hasta las 13:00 horas y que el ingreso temprano (early check in) o salida  tarde (late check out) podrá generar costos adicionales. La mora en el pago causara intereses de mora a la tasa máxima permitida, conforme al articulo 884 del código de comercio. 4. El HUÉSPED acepta que la suma liquida de dinero que conste en la factura presta merito ejecutivo. 5. El HUÉSPED conoce que la tarifa del hospedaje deberá ser prepagada y los consumos adicionales garantizados mediante tarjeta de crédito o depósito. En caso que la garantía sea tarjeta de crédito, el HUÉSPED autoriza el diligenciamiento del voucher y su presentación ante la respectiva entidad bancaria. 6. El HOTEL a su discrecionalidad se reserva el derecho de admitir el ingreso de huéspedes adicionales o acompañantes. Todo menor de edad debe hospedarse en compañía de los padres y portar sus respectivos documentos de identificación. 7. El HOTEL se reserva el derecho de ingreso de mascotas a sus instalaciones. El HOTEL es 100% libre de humo Su incumplimiento da lugar a la terminación del contrato y a la imposición de multas establecidas en el contrato. 8. El HUÉSPED puede ejercer derecho al retracto únicamente en compras no presenciales realizadas a través de portales web o en la central de reservas telefónica. La solicitud debe realizarla en máximo cinco (5) días hábiles posteriores a la confirmación de la compra. Si la fecha de ingreso es antes de los cinco días, no procederá el derecho al retracto y en caso de cancelación se aplicaran las condiciones de cancelación y devolución y que son: 
                             Si la cancelación de la reserva se realiza de 8 o mas días antes de la fecha de check in, se realizará una devolución del 80% correspondiente al valor depositado. - Si la cancelación de la reserva se realiza dentro de 8 a 3 días antes del check in se cobrara el 50% del valor depositado. - Si la cancelación de la reserva se realiza dentro de las 48 horas antes del check in se cobrara la totalidad del valor depositado. - En caso que estando alojado tenga una salida anticipada y se haya realizado el pago total del alojamiento, tendrá un saldo a favor que podrá utilizar en cualquier establecimiento operado por Grupo Hoteles en las ciudades de Medellín y Cartagena, que deberá redimirse en 1 año. Una vez recibida la solicitud, te reintegraremos el valor de devolución en un término máximo de 30 días calendarios contados a partir de tu solicitud. Lo realizaremos mediante consignación bancaria al titular de la reserva o mediante reversión de tarjeta de crédito. 9. El HUÉSPED autoriza irrevocablemente al HOTEL, sus titulares y operadores para recolectar, usar y tratar los datos personales suministrados por el HUÉSPED en la Tarjeta de Registro Hotelero con fines comerciales y de conformidad con las políticas de tratamiento de datos personales. El HUÉSPED autoriza la consulta y reporte ante centrales de riesgo de información sobre el cumplimiento de las obligaciones y/o pago de los servicios de hospedajes u hoteleros. El HUÉSPED, en su condición de titular de los datos personales, gozará de todos los derechos de ley y en particular tendrá derecho a conocer, acceder, actualizar y rectificar sus datos personales, revocar la autorización concedida o solicitar la supresión de información cuando ello sea procedente. El HUÉSPED declara que conoce las políticas de tratamiento de datos personales y que pueden ser consultadas en la página https://www.grupohoteles.co 10. El HUÉSPED se adhiere a la totalidad de las estipulaciones contractuales del contrato de hospedaje y que obran en el sitio web wwww.galleryhotel.co/contratodehospedaje.pdf. El HUÉSPED declara que conoce la totalidad de las estipulaciones contractuales detalladas en la pagina web. El HOTEL, su titular y/o su operador pueden variar o modificar la versión de las condiciones del contrato de hospedaje en cualquier momento. Es obligación del HUÉSPED asegurarse de verificar las condiciones integras y actuales en el sitio web. 
        </p>
		</div>
				</td>
				<td>
				
				</td>
			</tr>
			</tbody>
			</table>
               
                <div>
                    
						<div>
								
							<div style={textStyle}>
								<ChkBoxDisplayWizard ref={ChkBoxDisplayWizard => { window.ChkBoxDisplayWizard = ChkBoxDisplayWizard }}/>
								<ChkBoxLargeCheckBox ref={ChkBoxLargeCheckBox => { window.ChkBoxLargeCheckBox = ChkBoxLargeCheckBox }}/>
								<ChkBoxSigText ref={ChkBoxSigText => { window.ChkBoxSigText = ChkBoxSigText }}/>
							</div>

							<h3 style={textStyle}>Button type</h3>

							<div style={textStyle}>
								<RadioButtonType ref={RadioButtonType => { window.RadioButtonType = RadioButtonType }}/>
								<br/>
							</div>
								
							</div>
							</div> 
                     <UserMsgs ref={UserMsgs => { window.UserMsgs = UserMsgs }}/>
                </div>
      </div>
    );
  }
}

export default AppONe;