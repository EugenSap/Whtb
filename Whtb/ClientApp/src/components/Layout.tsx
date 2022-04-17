import * as React from 'react';
import { Container } from 'reactstrap';
import Navbar from "./Navbar/Navbar";

export default class Layout extends React.PureComponent<{}, { children?: React.ReactNode }> {
    public render() {
        return (
            <div>
                <Navbar />
                <Container>
                    {this.props.children}
                </Container>
            </div>
                
        );
    }
}