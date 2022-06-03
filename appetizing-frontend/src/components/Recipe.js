import { Component } from 'react';
import { variables } from '../Variables';

export class Recipe extends Component {

    constructor(props) {
        super(props);

        this.state={
            loading: true,
            recipe: null,
        }
    }

    async componentDidMount(){
        const response = await fetch(variables.API_URL+'Recipe/GetRecipes');
        const data = await response.json();
        this.setState({recipe: data.results[0]})
        console.log(data.results[0])
    }

    render() {
        const {
            recipes
        } = this.state;

        return(
            recipes
        )       
    }
}