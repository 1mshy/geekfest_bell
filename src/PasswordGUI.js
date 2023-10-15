import { Component } from "react";
import React from "react";
import { Button, Container, List, TextField, Tooltip, Typography } from "@mui/material";
import "./container.css";
import { checkPassword, isStrong } from "./calculation";

class PasswordGUI extends Component {
    // constructor for the password checker page
    constructor(props) {
        super(props);
        // set the initial state of the password checker page with an empty text field and an empty showcase
        this.state = { textField: "", showcase: [] };

        // bind the functions to the password checker page
        this.textFieldChange = this.textFieldChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.postPassword = this.postPassword.bind(this);
        this.suggested_length = 3;
    }

    textFieldChange(e) {
        // update the text field and showcase when the text field is changed
        let textField = e.target.value;
        let showcase = this.makeShowcase();
        this.setState({ ...this.state, textField: textField, showcase: showcase });
        // navigator.clipboard.writeText(textField);
    }

    makeShowcase() {
        // make a showcase of suggested passwords
        let showcase = [];
        for (let i = 0; i < this.suggested_length; i++) {
            showcase.push(checkPassword(this.state.textField));
        }
        return showcase;
    }

    onButtonClick(e) {
        // update the showcase when the button is clicked
        e.preventDefault();
        console.log("button clicked");
        this.setState({ ...this.state, showcase: this.makeShowcase() });
    }

    //made it async so that it waits for the response from the server
    async postPassword() {
        // post the password to the server when the button is clicked
        const { textField } = this.state;
        await fetch("http://localhost:8080/passwords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                password: textField ,
                website: "website"
            })
        }).then((response) => {
            //If the response is ok, alert the user that the password was posted successfully
            //Otherwise, alert the user that the password failed to post
            if (response.status === 200) {
                alert("Password posted successfully");
            } else {
                alert("Password failed to post");
            }
        });
    }

    render() {
        const { textField } = this.state;
        return (
            // create a container for the password checker page
            <Container className={"centered"}>
                <h2 className="title" >
                    Website 🙌
                </h2>
                <TextField />

                <h2 className="title" >
                    Password 🔑
                </h2>
                <TextField onChange={this.textFieldChange} value={textField} />

                {!(isStrong(textField) || textField === "") && <>
                    <Typography component="h2" variant="h5">
                        Suggested Passwords:
                    </Typography>
                    <List>
                        {this.state.showcase.map((password, index) => (
                            <Tooltip title="Click to set" key={index} arrow>
                                <Typography className="pass"

                                    onMouseDown={(e) => {
                                        console.log("clicked");
                                        this.setState({ ...this.state, textField: password });
                                    }}>
                                    {password}
                                </Typography>
                            </Tooltip>
                        ))
                        }

                    </List>
                    <Button onClick={this.onButtonClick}>Generate new</Button>
                </>}
                <br></br>
                {isStrong(textField) &&
                    <Button onClick={this.postPassword}>Post password</Button>}
            </Container>

        );
    }
}

export default PasswordGUI;