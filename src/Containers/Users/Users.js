import React, { Component } from 'react';
import Input from '../../components/Input/Input';
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            oneUser: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                available: ""
            },
            availableOptions: ["Yes", "No", "Unknow"],
            mode: 'edit',
            showClearBt:'false'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    //Called immediately after a component is mounted.
    componentDidMount() {
        console.log("Call componentDidMount")
        this.getAllUsers()
    }

    //Clear the form
    clearForm() {
        this.setState({
            oneUser: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                available: ""
            }
        });
        this.getAllUsers()
    }

    //Get All Users in allUsers[]
    getAllUsers() {
        console.log("Call getAllUsers")
        fetch('/users')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        mode: 'edit',
                        allUsers: result
                    });
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Get One User in in oneUser{}
    getOneUser = userId => {
        console.log("Call getOneUser, User n°:" + userId)
        fetch('/users/' + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        mode: 'update',
                        oneUser: result
                    });
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //ADD a new user when Submit button is clicked
    handleSubmit(event) {
        console.log("Call handleSubmit")
        event.preventDefault();
        let userData = this.state.oneUser;

        fetch("/users", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                    console.log('Success:', result)
                    this.clearForm()
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //DELETE a user by ID on Express when button Delete is clicked
    handleDelete = userId => {
        console.log("Call handleDelete for user n°" + userId)
        fetch("/users/" + userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                    console.log('Success:', result)
                    this.clearForm()
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Update a user by ID on Express when button update is clicked
    handleUpdate = userId => {
        console.log("Call handleUpdate for user n°" + userId)
        fetch("/users/" + userId, {
            method: 'PUT',
            body: JSON.stringify({
                id: userId,
                firstName: this.state.oneUser.firstName,
                lastName: this.state.oneUser.lastName,
                email: this.state.oneUser.email,
                phoneNumber: this.state.oneUser.phoneNumber,
                available: this.state.oneUser.available
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log('Responce :', res)
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                    console.log('Success:', result)
                    this.clearForm()
                }, (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Call the getOneUser() when edit button is clicked
    handleEdit = userId => {
        console.log("Call handleEdit")
        this.getOneUser(userId)
        this.setState ({
            showClearBt:'true'}
        )
    }

    //Populate the oneUser Object when form is filled
    handleInputChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState(
            prevState => ({
                oneUser: {
                    ...prevState.oneUser,
                    [name]: value
                },
                showClearBt:'true'}),
            () => console.log(this.state.oneUser)
        );
    }

    //Call the clearForm() when button Clear is clicked
    handleClearForm(event) {
        event.preventDefault();
        this.setState ({
            showClearBt:'false'}
        )
        this.clearForm()
    }

    //Main Render
    render() {
        console.log('users props : ',this.props)
        console.log('users state : ',this.state)
        const { error, isLoaded, mode } = this.state;
        let render;
        //If mode is Edit then show add user form at the top of the list
        if (mode === 'edit') {
            render = this.editUserRender()
        }else {
            render = <div className="row"><div className="col p-3"></div></div>
        }
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div className="container-fluid">
                    <div className="row bg-secondary text-white">
                        <div className="col-2">First Name</div>
                        <div className="col-2">Last Name</div>
                        <div className="col-2">Email</div>
                        <div className="col-2">Phone Number</div>
                        <div className="col-2">Available</div>
                        <div className="col-2">Actions</div>
                    </div>
                    {render}
                    {this.listUsersRender()}
                </div>
            );
        }

    }

    //Render for the users list
    listUsersRender() {
        const { oneUser,allUsers } = this.state;
        return allUsers.map(user => {
            const { id, firstName, lastName, email, phoneNumber, available } = user
            //If we edit the user then show edit User Form
            if (oneUser.id === id) {
                return (
                    <div className="bg-update" key={id} >{this.editUserRender()}</div>
                )
            };
            return (
                <div key={id} className="row">
                    <div className="col-2">{firstName}</div>
                    <div className="col-2">{lastName}</div>
                    <div className="col-2">{email}</div>
                    <div className="col-2">{phoneNumber}</div>
                    <div className="col-2">{available}</div>
                    <div className="col-2">
                        <Button
                            action={e => this.handleEdit(user.id)}
                            type={"btn"}
                            title={<FontAwesomeIcon icon={faEdit} />}
                        />{" "}
                        {/*Edit */}
                        <Button
                            action={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDelete(user.id) } }
                            type={"btn"}
                            title={<FontAwesomeIcon icon={faTrashAlt} />}
                        />{" "}
                        {/*Delete */}
                    </div>
                </div>
            )
        })

    }

    editUserRender() {
        let submitButton;
        let clearButton;
        const { oneUser, mode, showClearBt } = this.state;
        const { id, firstName, lastName, email, phoneNumber, available } = oneUser
        
        //Show the submit or Update button depends on the mode
        if (mode === 'edit') {
            submitButton = <Button
                action={this.handleSubmit}
                type={"btn"}
                title={<FontAwesomeIcon icon={faSave} />}
            />
        } else {
            submitButton = <Button
                action={e => this.handleUpdate(id)}
                type={"btn"}
                title={<FontAwesomeIcon icon={faSave} />}
            />
        }
        
        //Show the Clear button when we start to fill the form
        if (showClearBt === 'true') {
            clearButton = <Button
            action={this.handleClearForm}
            type={"btn"}
            title={<FontAwesomeIcon icon={faTimes} />}
        />
        }
        return (
            <form className="form-inline">
                <div className="col-2">
                    <Input
                        inputType={"text"}
                        title={"First Name"}
                        name={"firstName"}
                        value={firstName}
                        placeholder={"Enter your firstName"}
                        className={"form-control-plaintext"}
                        handleChange={this.handleInputChange}
                    />
                </div>
                <div className="col-2">
                    <Input
                        inputType={"text"}
                        title={"Last Name"}
                        name={"lastName"}
                        value={lastName}
                        placeholder={"Enter your lastName"}
                        className={"form-control-plaintext"}
                        handleChange={this.handleInputChange}
                    />
                </div>
                <div className="col-2">
                    <Input
                        inputType={"text"}
                        title={"Email"}
                        name={"email"}
                        value={email}
                        placeholder={"Enter your email"}
                        className={"form-control-plaintext"}
                        handleChange={this.handleInputChange}
                    />
                </div>
                <div className="col-2">
                    <Input
                        inputType={"text"}
                        title={"Phone Number"}
                        name={"phoneNumber"}
                        value={phoneNumber}
                        placeholder={"Enter your Phone Number"}
                        className={"form-control-plaintext"}
                        handleChange={this.handleInputChange}
                    />
                </div>
                <div className="col-2">
                    <Select
                        title={"Available"}
                        name={"available"}
                        options={this.state.availableOptions}
                        value={available}
                        placeholder={"Are you available ?"}
                        className={"custom-select"}
                        handleChange={this.handleInputChange}
                    />
                </div>
                <div className="col-2">
                    {submitButton}
                    {" "}
                    {clearButton}
                </div>
            </form>
        );
    }
}
export default Users;