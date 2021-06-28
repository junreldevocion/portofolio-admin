import { useState, useEffect } from "react";
import withAuth from "../../components/withAuth";
import Layout from '../../components/layout'
import Table from '../../components/table'
import SideBar from "../../components/sideBar";
import { Modal, Button, Form } from "react-bootstrap";
import api from '../../util/api'

function Landing({user}) {
    const token = user.token;

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [formInput, setFormInput] = useState({name:'', description: ''});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateFormInput = (e) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        api().post('api/landing', formInput, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.status === 201) {
                getLanding();
                setShow(false);
            }
        })
    }

    const getLanding = () => {
        api().get('api/landing')
        .then(response => {
            setHasData(true);
            setData(response.data)
        })
    }

    useEffect(() => {
        getLanding()
    }, []);

    return (
        <Layout title="Landing" token={user.token} >
            <div className="row">
            <SideBar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Landing</h1>
            </div>

            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>
            <div className="table-responsive">
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan="3" className={`text-center ${hasData ? 'd-none' : ''}`}>No data...</td></tr>
                        {data.map((post) => (
                            <tr key={post.id}>
                                <td>{post.name}</td>
                                <td>{post.description}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm">Edit</button>
                                     <button className="btn btn-secondary btn-sm ms-2" 
                                     onClick={() => {
                                        api().delete(`api/landing/${post.id}`, { headers: {"Authorization" : `Bearer ${token}`} })
                                        .then(response => {
                                            if (response.status === 200) {
                                                getLanding();
                                            }
                                        })
                                     }}
                                     >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            </main>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Landing</Modal.Title>
                <Button variant="close" onClick={handleClose}></Button>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="name" type="text" placeholder="" onChange={updateFormInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" rows={3} onChange={updateFormInput} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Layout>
    );
}

export default withAuth(Landing);