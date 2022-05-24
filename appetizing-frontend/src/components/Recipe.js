import React, {Component} from 'react';
import { variables } from '../Variables';

export class Recipe extends Component {

    constructor(props) {
        super(props);

        this.state={
            recipes:[]
        }
    }

    refreshList() {
        fetch(variables.API_URL+'Recipe/GetRecipes')
        .then(response=>response.json())
        .then(data=>{
            this.setState({recipes:data})
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    render() {
        const {
            recipes
        } = this.state;

        return(
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(rec =>
                            <tr key={rec.id}>
                                <td>{rec.RecipeName}</td>
                                <td>{rec.RecipeDescription}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}