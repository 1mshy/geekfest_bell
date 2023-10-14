import { Component } from "react";
import React from "react";
import { Button, Container, List, TextField, Tooltip, Typography } from "@mui/material";
import "./container.css";
import { checkPassword, isStrong } from "./calculation";


class PasswordGUI extends Component {
    constructor(props) {
        super(props);
        this.state = { textField: "", showcase: [] };

        this.textFieldChange = this.textFieldChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.suggested_length = 3;
    }

    textFieldChange(e) {
        let textField = e.target.value;
        let showcase = this.makeShowcase();
        this.setState({ ...this.state, textField: textField, showcase: showcase });
        // navigator.clipboard.writeText(textField);
    }

    makeShowcase() {
        let showcase = [];
        for (let i = 0; i < this.suggested_length; i++) {
            showcase.push(checkPassword(this.state.textField));
        }
        return showcase;
    }

    onButtonClick(e) {
        e.preventDefault();
        console.log("button clicked");
        this.setState({ ...this.state, showcase: this.makeShowcase() });
    }

    render() {
        const { textField } = this.state;
        return (
            // create a container for the password checker page
            <Container className={"centered"}
            >
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
            </Container>

        );
    }
}

export default PasswordGUI;