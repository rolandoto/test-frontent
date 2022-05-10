import * as Yup from "yup"

const Usevalidation =() => {

    const LoginShema = Yup.object().shape({
        username:Yup.string()
            .min(3,"min length")
            .required("required"),
        passsword:Yup.string()
            .min(6,"min length")
            .required("required"),
        hotel:Yup.string()
            .min(3,"min length")
            .required("required")
    })
    return {
        LoginShema
    }

}

export default Usevalidation