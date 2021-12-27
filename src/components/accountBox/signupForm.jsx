
import { useState } from "react"
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import Axios from "axios";
import { AccountContext } from "./accountContext";
import React, { useContext } from "react";





export function SignupForm(props) {
    const [usernameReg, setusernmaeReg] = useState("")
    const [passwordReg, setpasswordReg] = useState("")
    const [nameReg, setnameReg] = useState("")
    const [emailReg, setemailReg] = useState("")

    const { switchToSignin } = useContext(AccountContext);


    const addUser = () => {
        console.log(nameReg, emailReg, usernameReg, passwordReg)
        Axios.post("https://googlekepper.herokuapp.com/register", {
            name: nameReg,
            email: emailReg,
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            console.log(response)
            alert(response.data)
        })

        setnameReg("")
        setemailReg("")
        setusernmaeReg("")
        setpasswordReg("")
        

    }

    return (
        <BoxContainer>
            <FormContainer>

                    <Input type="username"
                    value={nameReg}
                 
                    onChange={(e) => {

                        setnameReg(e.target.value)
                    }}
                    placeholder="Name" />


                <Input type="email"
                    
                    value={emailReg}
                    onChange={(e) => {

                        setemailReg(e.target.value)
                    }}
                    placeholder="Email" />


                <Input
                type="text"
                    value={usernameReg}
                    onChange={(e) => {

                        setusernmaeReg(e.target.value)
                    }}
                    placeholder="User name" />


                <Input
                type="password"
                    value={passwordReg}
                    onChange={(e) => {

                        setpasswordReg(e.target.value)
                    }}

                    type="password" placeholder="Password" />


            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton onClick={addUser} type="submit">Signup</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>
                    Signin
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}
