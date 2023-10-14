import { Component } from "react";
import React from "react";
import { Button, Container, List, TextField, Typography } from "@mui/material";
import "./container.css";
import { checkPassword } from "./calculation";


class PasswordGUI extends Component {
    constructor(props) {
        super(props);
        this.state = { textField: "", show_password: false, showcase: [] };

        this.textFieldChange = this.textFieldChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.suggested_length = 3;
    }

    textFieldChange(e) {
        let textField = e.target.value;
        let showcase = [];
        for (let i = 0; i < this.suggested_length; i++) {
            showcase.push(checkPassword(textField));
        }
        this.setState({ textField: textField, showcase: showcase });
        // navigator.clipboard.writeText(textField);
    }

    onButtonClick(e) {
        e.preventDefault();
        console.log("button clicked");
        this.setState({ show_password: true });
    }

    render() {
        const { show_password } = this.state;
        return (
            // create a container for the password checker page
            <Container className={"centered"}
            >
                <Typography component="h1" variant="h5">
                    Password 🔑
                </Typography>
                <TextField onChange={this.textFieldChange} />
                {/* <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={this.onButtonClick}
                >

                   
                    
                    Check Passowrd
                </Button> */}
                <Typography component="h2" variant="h5">
                    Suggested Passwords:
                </Typography>
                <List>
                    {this.state.showcase.map((password) => (
                        <Typography className="pass" onClick={(e) => {
                            this.setState({ textField: password });
                        }}>
                            {password}
                        </Typography>
                    ))
                    }

                </List>

                <Button onClick={this.onButtonClick}>Generate new</Button>
            </Container>

        );
    }
}

export default PasswordGUI;