import React from 'react';
import ReactDOM from 'react-dom';
import Vehicles from './Vehicles';

import AddVehicleForm from './AddVehicleForm';

import 'whatwg-fetch'

class Garage extends React.Component {

    constructor() {
        super();

        this.state = {
            vehicles: [],
            makes: [],
            models: [],
            drivers: []
        }
    }

    componentDidMount() {

        fetch('/vehicle')
            .then(r => r.json())
            .then(json => this.setState({vehicles: json}))
            .catch(error => console.error('Error retrieving vehicles: ' + error));

        fetch('/make')
            .then(r => r.json())
            .then(json => this.setState({makes: json}))
            .catch(error => console.error('Error retrieving makes: ' + error));

        fetch('/model')
            .then(r => r.json())
            .then(json => this.setState({models: json}))
            .catch(error => console.error('Error retrieving models: ' + error));

        fetch('/driver')
            .then(r => r.json())
            .then(json => this.setState({drivers: json}))
            .catch(error => console.error('Error retrieving drivers: ' + error));

    }

    submitNewVehicle = (vehicle) => {
        fetch('/vehicle', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(vehicle)
        }).then(r => r.json())
            .then(json => {
                let vehicles = this.state.vehicles;
                vehicles.push({
                    id: json.id
                    , name: json.name
                    , make: json.make
                    , model: json.model
                    , driver: json.driver
                })
            })
            .catch(ex => console.error('Unable to save vehicle', ex));
    }

    render() {
        const {vehicles, makes, models, drivers} = this.state;
        // console.log('Veh: ' + vehicles)
        // console.log('Mak: ' + makes)
        // console.log('Mod: ' + models)
        // console.log('Dri: ' + drivers)

        return <div>
            <AddVehicleForm onSubmit={this.submitNewVehicle} makes={makes} models={models} drivers={drivers} />
            <Vehicles vehicles={vehicles} />
        </div>;
    }
}

ReactDOM.render(<Garage />, document.getElementById('garage'));